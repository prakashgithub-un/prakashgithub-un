"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cicdExperience } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";
import { usePrefersReducedMotion } from "@/lib/motion";

const stages = ["Code", "Test", "Build", "Scan", "Container", "Registry", "Deploy", "Observe"];
const LOOP_DURATION = 5.2;

export function CICD() {
  const [started, setStarted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="06 · CI/CD"
          title="Delivery Pipelines"
          description="From commit to running in a cluster, with a monitoring loop back to the deploy that caused it."
        />

        <Reveal delay={0.1}>
          <motion.div
            onViewportEnter={() => setStarted(true)}
            viewport={{ once: true, margin: "-100px" }}
            className="relative mt-10 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 pb-10 scrollbar-none"
          >
            <div className="relative flex min-w-[640px] items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-base-border" />
              {started && !reducedMotion && (
                <motion.div
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent-cyan shadow-[0_0_10px_3px_rgba(34,211,238,0.6)]"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: LOOP_DURATION, repeat: Infinity, ease: "linear" }}
                />
              )}

              {stages.map((stage, i) => {
                const delay = (i / (stages.length - 1)) * LOOP_DURATION;
                return (
                  <div key={stage} className="relative z-10 flex flex-col items-center gap-2">
                    <motion.div
                      className="h-3 w-3 rounded-full border-2 border-base-600 bg-base-900"
                      animate={
                        started && !reducedMotion
                          ? { borderColor: ["#2c313d", "#22d3ee", "#2c313d"] }
                          : {}
                      }
                      transition={{
                        duration: 0.6,
                        delay,
                        repeat: Infinity,
                        repeatDelay: LOOP_DURATION - 0.6,
                      }}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="production" />
              <div className="mt-4 flex flex-wrap gap-2">
                {cicdExperience.production.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="developing" />
              <div className="mt-4 flex flex-wrap gap-2">
                {cicdExperience.advanced.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
