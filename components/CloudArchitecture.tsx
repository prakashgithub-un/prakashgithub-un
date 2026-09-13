"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  cloudArchitectureNodes,
  cloudArchitectureEdges,
  failureScenarios,
} from "@/data/architecture";
import { architectureConcepts } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function CloudArchitecture() {
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const scenario = failureScenarios.find((s) => s.id === scenarioId) ?? null;

  return (
    <section id="architecture" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="08 · Cloud Architecture"
          title="Designing For Failure"
          description="A highly-available reference architecture. Hover any layer to trace the request path — or inject a failure below and watch it adapt."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <ArchitectureDiagram
              nodes={cloudArchitectureNodes}
              edges={cloudArchitectureEdges}
              height={560}
              inactiveNodeIds={scenario?.inactiveNodeIds}
              pulsingNodeIds={scenario?.pulsingNodeIds}
              rerouteEdges={scenario?.rerouteEdges}
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setScenarioId(null)}
              className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                scenarioId === null
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-base-border text-muted hover:text-white"
              }`}
            >
              Normal
            </button>
            {failureScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  scenarioId === s.id
                    ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                    : "border-base-border text-muted hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-6 min-h-[3rem] max-w-2xl text-center">
            <AnimatePresence mode="wait">
              {scenario ? (
                <motion.p
                  key={scenario.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm leading-relaxed text-muted"
                >
                  {scenario.description}
                </motion.p>
              ) : (
                <motion.div
                  key="concepts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  {architectureConcepts.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
