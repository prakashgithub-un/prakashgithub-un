"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { FlowStage } from "@/data/architecture";

export function FlowDiagram({ steps }: { steps: FlowStage[] }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          {Array.isArray(step) ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {step.map((s, si) => (
                <FlowNode key={s.label} label={s.label} sublabel={s.sublabel} delay={i * 0.06 + si * 0.03} />
              ))}
            </div>
          ) : (
            <FlowNode label={step.label} sublabel={step.sublabel} delay={i * 0.06} />
          )}
          {i < steps.length - 1 && (
            <div className="flex flex-col items-center">
              <span className="h-4 w-[2px] rounded-full bg-gradient-to-b from-accent-cyan/70 to-accent-cyan/30" />
              <ArrowDown size={16} className="-mt-1 text-accent-cyan animate-pulse-slow" strokeWidth={2.5} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowNode({
  label,
  sublabel,
  delay,
}: {
  label: string;
  sublabel?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-lg border border-base-600 bg-base-800/70 px-4 py-2 text-center font-mono text-xs text-ink transition-colors hover:border-accent-cyan/60 hover:shadow-[0_0_20px_-6px_rgba(34,211,238,0.5)]"
    >
      <div>{label}</div>
      {sublabel && <div className="mt-0.5 text-[10px] text-muted">{sublabel}</div>}
    </motion.div>
  );
}
