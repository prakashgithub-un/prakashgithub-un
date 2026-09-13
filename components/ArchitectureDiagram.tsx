"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DiagramEdge, DiagramNode } from "@/data/projects";
import { smoothPath } from "@/lib/smoothPath";

interface ArchitectureDiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  height?: number;
  /** Node ids to render as failed / unreachable — for failure-scenario views. */
  inactiveNodeIds?: string[];
  /** Node ids to render as actively scaling / under load. */
  pulsingNodeIds?: string[];
  /** Edge pairs (either direction) to force-highlight as an active failover path. */
  rerouteEdges?: [string, string][];
}

export function ArchitectureDiagram({
  nodes,
  edges,
  height = 380,
  inactiveNodeIds,
  pulsingNodeIds,
  rerouteEdges,
}: ArchitectureDiagramProps) {
  const [active, setActive] = useState<string | null>(null);

  const scenarioMode = Boolean(inactiveNodeIds?.length || rerouteEdges?.length || pulsingNodeIds?.length);
  const inactive = new Set(inactiveNodeIds ?? []);
  const pulsing = new Set(pulsingNodeIds ?? []);

  const connected = new Set<string>();
  if (active) {
    connected.add(active);
    for (const e of edges) {
      if (e.from === active) connected.add(e.to);
      if (e.to === active) connected.add(e.from);
    }
  }

  function isRerouted(a: string, b: string) {
    return (rerouteEdges ?? []).some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full min-w-[420px] overflow-visible" style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;

          const rerouted = isRerouted(edge.from, edge.to);
          const brokenLink = (inactive.has(edge.from) || inactive.has(edge.to)) && !rerouted;
          const hoverActive = !scenarioMode && active && connected.has(edge.from) && connected.has(edge.to);
          const isHighlighted = rerouted || hoverActive;
          const path = smoothPath(from.x, from.y, to.x, to.y);

          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke={
                  isHighlighted
                    ? "#0891b2"
                    : brokenLink
                      ? "rgba(220,38,38,0.4)"
                      : "rgba(15,23,42,0.25)"
                }
                strokeWidth={isHighlighted ? 0.32 : 0.18}
                strokeLinecap="round"
                strokeDasharray={brokenLink ? "1.5 2" : undefined}
              />
              {isHighlighted && (
                <circle r={0.7} fill="#0891b2">
                  <animateMotion dur="1.4s" repeatCount="indefinite" path={path} />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => {
        const isInactive = inactive.has(node.id);
        const isPulsing = pulsing.has(node.id) && !isInactive;
        const isHoverActive = !scenarioMode && active === node.id;
        const isDimmed = !scenarioMode && active !== null && !connected.has(node.id);

        return (
          <motion.button
            key={node.id}
            type="button"
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(node.id)}
            onBlur={() => setActive(null)}
            animate={
              isPulsing
                ? { scale: [1, 1.06, 1] }
                : isInactive
                  ? { scale: 0.96 }
                  : { scale: 1 }
            }
            transition={isPulsing ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-pre rounded-lg border px-3 py-2 text-center font-mono text-[11px] leading-tight transition-colors"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              borderColor: isInactive
                ? "rgba(220,38,38,0.4)"
                : isPulsing
                  ? "rgba(5,150,105,0.5)"
                  : isHoverActive
                    ? "#0891b2"
                    : "rgba(15,23,42,0.16)",
              backgroundColor: isInactive
                ? "rgba(220,38,38,0.06)"
                : isPulsing
                  ? "rgba(5,150,105,0.08)"
                  : isHoverActive
                    ? "rgba(8,145,178,0.1)"
                    : "rgba(255,255,255,0.9)",
              color: isInactive
                ? "rgba(185,28,28,0.8)"
                : isHoverActive
                  ? "#12141a"
                  : isDimmed
                    ? "rgba(91,100,114,0.55)"
                    : "#12141a",
              textDecoration: isInactive ? "line-through" : "none",
              boxShadow: isHoverActive
                ? "0 0 30px -8px #0891b2"
                : isPulsing
                  ? "0 0 24px -8px rgba(5,150,105,0.5)"
                  : "none",
            }}
          >
            {node.label}
          </motion.button>
        );
      })}
    </div>
  );
}
