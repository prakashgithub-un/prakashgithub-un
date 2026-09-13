"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { securityConcepts } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";
import { usePrefersReducedMotion } from "@/lib/motion";

const layers = ["IAM", "Secrets", "Network Policy", "Container Scan", "IaC Scan", "Runtime Security"];
const RING_STEP = 26;
const RING_BASE = 34;

export function Security() {
  const [started, setStarted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="07 · DevSecOps"
          title="Security By Design"
          description="Security treated as layers around the application, not a single gate before deploy."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="developing" label="Developing Expertise" />
          </div>

          <motion.div
            onViewportEnter={() => setStarted(true)}
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto mt-16 flex items-center justify-center"
            style={{ width: 300, height: 300 }}
          >
            {layers.map((_, i) => {
              const reverseIndex = layers.length - 1 - i;
              const inset = -(RING_BASE + reverseIndex * RING_STEP);
              const isOutermost = reverseIndex === layers.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={started ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + reverseIndex * 0.32 }}
                  className={`absolute rounded-[32px] border ${
                    isOutermost ? "border-accent-cyan/25" : "border-base-border"
                  }`}
                  style={{ inset }}
                >
                  {isOutermost && started && !reducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-[32px] border border-accent-cyan/40"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: 0.3 + reverseIndex * 0.32 + 0.6,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={started ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-md border border-ink/15 bg-base-800/80 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-ink"
            >
              Application
            </motion.div>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {layers.map((layer, i) => {
              const reverseIndex = layers.length - 1 - i;
              return (
                <motion.div
                  key={layer}
                  initial={{ opacity: 0 }}
                  animate={started ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + reverseIndex * 0.32 }}
                  className="flex items-center gap-2 font-mono text-xs text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/70" />
                  {layer}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {securityConcepts.map((c) => (
              <span
                key={c}
                className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
