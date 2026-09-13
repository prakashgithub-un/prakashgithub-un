"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DiagramEdge, DiagramNode } from "@/data/projects";

export function ArchitectureDiagram({
  nodes,
  edges,
  height = 380,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  height?: number;
}) {
  const [active, setActive] = useState<string | null>(null);

  const connected = new Set<string>();
  if (active) {
    connected.add(active);
    for (const e of edges) {
      if (e.from === active) connected.add(e.to);
      if (e.to === active) connected.add(e.from);
    }
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div
      className="relative w-full min-w-[420px] overflow-visible"
      style={{ height }}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          const isActive = active && (connected.has(edge.from) && connected.has(edge.to));
          return (
            <g key={i}>
              <line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={isActive ? "#22d3ee" : "rgba(255,255,255,0.12)"}
                strokeWidth={isActive ? 2 : 1}
              />
              {isActive && (
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
        const isActive = active === node.id;
        const isDimmed = active !== null && !connected.has(node.id);
        return (
          <motion.button
            key={node.id}
            type="button"
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(node.id)}
            onBlur={() => setActive(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-pre rounded-lg border px-3 py-2 text-center font-mono text-[11px] leading-tight transition-all"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              borderColor: isActive ? "#22d3ee" : "rgba(255,255,255,0.12)",
              backgroundColor: isActive ? "rgba(34,211,238,0.12)" : "rgba(21,23,29,0.9)",
              color: isActive ? "#fff" : isDimmed ? "rgba(139,143,154,0.5)" : "#e5e7eb",
              boxShadow: isActive ? "0 0 30px -8px #22d3ee" : "none",
            }}
          >
            {node.label}
          </motion.button>
        );
      })}
    </div>
  );
}
