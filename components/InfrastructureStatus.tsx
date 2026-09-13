"use client";

import { motion } from "framer-motion";

// Visual concept only — structured so real monitoring data (e.g. from a
// status API or Prometheus/Grafana) can be wired in without changing markup.
export interface SystemStatusRow {
  name: string;
  uptime: number; // 0-100
}

const systems: SystemStatusRow[] = [
  { name: "AWS", uptime: 99.9 },
  { name: "Azure", uptime: 99.8 },
  { name: "Kubernetes", uptime: 99.9 },
  { name: "CI/CD", uptime: 100 },
];

const footerStats = ["Deployments", "Automation", "Production", "Infrastructure"];

export function InfrastructureStatus() {
  return (
    <div className="glass relative w-full max-w-md overflow-hidden rounded-xl border border-base-border p-6 shadow-[0_0_60px_-15px_rgba(59,130,246,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-full w-1/3 animate-scan bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
      </div>

      <div className="flex items-center justify-between border-b border-base-border pb-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          System Status
        </span>
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-base-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-base-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-base-700" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
        </span>
        <span className="font-mono text-sm font-medium text-accent-green">
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {systems.map((system, i) => (
          <div key={system.name}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
              <span className="text-muted">{system.name}</span>
              <span className="text-white">{system.uptime}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                initial={{ width: 0 }}
                whileInView={{ width: `${system.uptime}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15 * i, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-base-border pt-5">
        {footerStats.map((stat) => (
          <div
            key={stat}
            className="rounded-md border border-base-border bg-base-900/60 px-3 py-2 text-center font-mono text-[11px] uppercase tracking-wide text-muted"
          >
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}
