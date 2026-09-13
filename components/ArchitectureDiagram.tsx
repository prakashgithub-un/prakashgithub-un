"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DiagramEdge, DiagramNode } from "@/data/projects";

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
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;

          const rerouted = isRerouted(edge.from, edge.to);
          const brokenLink = (inactive.has(edge.from) || inactive.has(edge.to)) && !rerouted;
          const hoverActive = !scenarioMode && active && connected.has(edge.from) && connected.has(edge.to);
          const isHighlighted = rerouted || hoverActive;

          return (
            <g key={i}>
              <line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={
                  isHighlighted
                    ? "#22d3ee"
                    : brokenLink
                      ? "rgba(248,113,113,0.25)"
                      : "rgba(255,255,255,0.12)"
                }
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={brokenLink ? "3 4" : undefined}
              />
              {isHighlighted && (
                <circle r={3} fill="#22d3ee">
                  <animateMotion
                    dur="1.4s"
                    repeatCount="indefinite"
                    path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  />
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
                ? "rgba(248,113,113,0.4)"
                : isPulsing
                  ? "rgba(52,211,153,0.5)"
                  : isHoverActive
                    ? "#22d3ee"
                    : "rgba(255,255,255,0.12)",
              backgroundColor: isInactive
                ? "rgba(248,113,113,0.08)"
                : isPulsing
                  ? "rgba(52,211,153,0.08)"
                  : isHoverActive
                    ? "rgba(34,211,238,0.12)"
                    : "rgba(21,23,29,0.9)",
              color: isInactive
                ? "rgba(248,113,113,0.7)"
                : isHoverActive
                  ? "#fff"
                  : isDimmed
                    ? "rgba(139,143,154,0.5)"
                    : "#e5e7eb",
              textDecoration: isInactive ? "line-through" : "none",
              boxShadow: isHoverActive
                ? "0 0 30px -8px #22d3ee"
                : isPulsing
                  ? "0 0 24px -8px rgba(52,211,153,0.6)"
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
