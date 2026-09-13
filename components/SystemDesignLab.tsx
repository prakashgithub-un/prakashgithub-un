"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { systemDesignScenarios } from "@/data/architecture";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";

export function SystemDesignLab() {
  const [activeId, setActiveId] = useState(systemDesignScenarios[0].id);
  const scenario = systemDesignScenarios.find((s) => s.id === activeId)!;

  return (
    <section id="engineering-lab" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="09 · Engineering Lab"
          title="System Design Lab"
          description="Pick a scenario to see how I'd reason through it — requirements, architecture, scaling, security and the trade-offs that come with each."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {systemDesignScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  activeId === s.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-base-border text-muted hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              <div className="rounded-2xl border border-base-border bg-base-900/40 p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Requirements
                </p>
                <ul className="mt-3 space-y-1.5">
                  {scenario.requirements.map((r) => (
                    <li key={r} className="text-sm text-muted">
                      · {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-4 border-t border-base-border pt-6">
                  <DetailRow label="Scaling Strategy" text={scenario.scaling} />
                  <DetailRow label="Security" text={scenario.security} />
                  <DetailRow label="Observability" text={scenario.observability} />
                  <DetailRow label="Cost Considerations" text={scenario.cost} />
                  <DetailRow label="Trade-offs" text={scenario.tradeoffs} />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-base-border bg-base-950/60 p-8 scrollbar-none">
                <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  Architecture
                </p>
                <FlowDiagram steps={scenario.flow} />
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function DetailRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
