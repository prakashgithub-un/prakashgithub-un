"use client";

import { motion } from "framer-motion";
import type { Post } from "@/data/posts";

const aiNodes = [
  { x: 24, y: 22 },
  { x: 64, y: 38 },
  { x: 104, y: 16 },
  { x: 148, y: 40 },
  { x: 178, y: 20 },
];

export function PostVisual({ variant }: { variant: Post["visual"] }) {
  if (variant === "observability") {
    return (
      <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-accent-green/[0.08] via-base-900/30 to-base-900/50">
        <div className="absolute inset-0 opacity-0 bg-gradient-to-tr from-accent-green/10 to-transparent transition-opacity duration-500 group-hover:opacity-100" />
        <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <motion.path
            d="M0 42 L36 42 L50 16 L64 50 L78 24 L92 42 L200 42"
            fill="none"
            stroke="#059669"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-accent/[0.08] via-base-900/30 to-base-900/50">
      <div className="absolute inset-0 opacity-0 bg-gradient-to-tr from-accent/10 to-transparent transition-opacity duration-500 group-hover:opacity-100" />
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {aiNodes.slice(0, -1).map((n, i) => (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={aiNodes[i + 1].x}
            y2={aiNodes[i + 1].y}
            stroke="rgba(37,99,235,0.35)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
          />
        ))}
        {aiNodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={3} fill="#2563eb" opacity={0.85} />
        ))}
      </svg>
    </div>
  );
}
