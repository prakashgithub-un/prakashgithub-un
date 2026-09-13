"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NetNode {
  id: string;
  label?: string;
  x: number;
  y: number;
}

const namedNodes: NetNode[] = [
  { id: "aws", label: "AWS", x: 18, y: 22 },
  { id: "azure", label: "Azure", x: 34, y: 62 },
  { id: "k8s", label: "Kubernetes", x: 58, y: 30 },
  { id: "terraform", label: "Terraform", x: 72, y: 68 },
  { id: "cicd", label: "CI/CD", x: 85, y: 24 },
  { id: "observability", label: "Observability", x: 46, y: 82 },
];

const fillerNodes: NetNode[] = [
  { id: "f1", x: 8, y: 45 },
  { id: "f2", x: 30, y: 10 },
  { id: "f3", x: 50, y: 50 },
  { id: "f4", x: 66, y: 12 },
  { id: "f5", x: 90, y: 55 },
  { id: "f6", x: 12, y: 78 },
  { id: "f7", x: 44, y: 34 },
  { id: "f8", x: 78, y: 44 },
  { id: "f9", x: 60, y: 86 },
  { id: "f10", x: 94, y: 84 },
];

const allNodes = [...namedNodes, ...fillerNodes];
const nodeMap = new Map(allNodes.map((n) => [n.id, n]));

const edges: [string, string][] = [
  ["aws", "f2"],
  ["aws", "f1"],
  ["aws", "f7"],
  ["azure", "f1"],
  ["azure", "f6"],
  ["azure", "f3"],
  ["azure", "observability"],
  ["k8s", "f7"],
  ["k8s", "f4"],
  ["k8s", "f3"],
  ["k8s", "f8"],
  ["terraform", "f8"],
  ["terraform", "f9"],
  ["terraform", "f5"],
  ["cicd", "f4"],
  ["cicd", "f5"],
  ["observability", "f9"],
  ["observability", "f6"],
  ["f3", "f7"],
  ["f3", "f8"],
  ["f5", "f10"],
];

const pulseEdges: [string, string][] = [
  ["aws", "f7"],
  ["k8s", "f8"],
  ["terraform", "f9"],
  ["azure", "f3"],
];

export function InfrastructureNetwork() {
  const [hovered, setHovered] = useState<string | null>(null);

  const connected = new Set<string>();
  if (hovered) {
    connected.add(hovered);
    for (const [a, b] of edges) {
      if (a === hovered) connected.add(b);
      if (b === hovered) connected.add(a);
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {edges.map(([a, b], i) => {
        const from = nodeMap.get(a)!;
        const to = nodeMap.get(b)!;
        const isActive = hovered && connected.has(a) && connected.has(b);
        const isDimmed = hovered !== null && !isActive;
        return (
          <motion.line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={isActive ? "#22d3ee" : "rgba(148,163,184,0.18)"}
            strokeWidth={isActive ? 0.25 : 0.15}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: isDimmed ? 0.3 : 1 }}
            transition={{
              pathLength: { duration: 1.4, delay: 0.3 + i * 0.04, ease: "easeOut" },
              opacity: { duration: 0.3 },
              default: { duration: 0.3 },
            }}
          />
        );
      })}

      {pulseEdges.map(([a, b], i) => {
        const from = nodeMap.get(a)!;
        const to = nodeMap.get(b)!;
        return (
          <circle key={i} r={0.5} fill="#22d3ee" opacity={0.8}>
            <animateMotion
              dur={`${4 + i}s`}
              begin={`${i * 1.1}s`}
              repeatCount="indefinite"
              path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
            />
          </circle>
        );
      })}

      {fillerNodes.map((node, i) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={0.55}
          fill="rgba(148,163,184,0.35)"
          className="drift-node"
          style={
            {
              "--fx": `${(i % 2 === 0 ? 1 : -1) * (2 + (i % 3))}px`,
              "--fy": `${(i % 3 === 0 ? -1 : 1) * (2 + (i % 4))}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${7 + (i % 4)}s`,
              transformOrigin: `${node.x}px ${node.y}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {namedNodes.map((node, i) => {
        const isHovered = hovered === node.id;
        const isDimmed = hovered !== null && !connected.has(node.id);
        return (
          <g
            key={node.id}
            className="drift-node"
            style={
              {
                "--fx": `${(i % 2 === 0 ? 1 : -1) * 3}px`,
                "--fy": `${(i % 2 === 0 ? -1 : 1) * 3}px`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${9 + i}s`,
                transformOrigin: `${node.x}px ${node.y}px`,
                filter: isHovered ? "drop-shadow(0 0 3px #22d3ee)" : "none",
                opacity: isDimmed ? 0.4 : 1,
                transition: "opacity 0.3s",
              } as React.CSSProperties
            }
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={5}
              fill="transparent"
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ pointerEvents: "all", cursor: "default" }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={isHovered ? 1.3 : 0.9}
              fill={isHovered ? "#22d3ee" : "#3b82f6"}
              style={{ transition: "r 0.3s" }}
            />
            <text
              x={node.x}
              y={node.y - 2.5}
              textAnchor="middle"
              fontSize={2.6}
              className="font-mono"
              fill="white"
              opacity={isHovered ? 1 : 0}
              style={{ transition: "opacity 0.3s", pointerEvents: "none" }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
