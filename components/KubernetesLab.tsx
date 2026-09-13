"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { kubernetesTree, kubernetesExperience } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";
import { usePrefersReducedMotion } from "@/lib/motion";

const nodes = [
  { id: "node-a", pods: 4 },
  { id: "node-b", pods: 3 },
];

export function KubernetesLab() {
  const [started, setStarted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            04 · Kubernetes
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold uppercase leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
            Containers are easy.
            <br />
            <span className="text-muted">Operating them is the engineering.</span>
          </h2>
        </div>

        <motion.div
          onViewportEnter={() => setStarted(true)}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 flex flex-col items-center"
        >
          <ClusterPill label="INGRESS" started={started} delay={0} />
          <TrafficConnector started={started} reducedMotion={reducedMotion} delay={0.15} />
          <div className="flex gap-3">
            <ClusterPill label="api-service" started={started} delay={0.15} small />
            <ClusterPill label="web-service" started={started} delay={0.22} small />
          </div>
          <TrafficConnector started={started} reducedMotion={reducedMotion} delay={0.35} />

          <div className="w-full rounded-2xl border border-dashed border-base-border p-5">
            <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Cluster
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {nodes.map((node, ni) => (
                <div key={node.id} className="rounded-xl border border-base-border bg-base-900/40 p-4">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-wide text-muted">
                    Node {ni === 0 ? "A" : "B"}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: node.pods }).map((_, pi) => (
                      <motion.div
                        key={pi}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={
                          started
                            ? {
                                opacity: 1,
                                scale: 1,
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.35,
                          delay: 0.5 + ni * 0.25 + pi * 0.08,
                        }}
                        className="relative aspect-square rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.08]"
                      >
                        {started && !reducedMotion && (
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent-cyan/20"
                            animate={{ opacity: [0.2, 0.55, 0.2] }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              delay: 1 + ni * 0.25 + pi * 0.08 + pi * 0.3,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TrafficConnector started={started} reducedMotion={reducedMotion} delay={1.3} />
          <ClusterPill label="OBSERVABILITY" started={started} delay={1.3} muted />
        </motion.div>

        <div className="mt-16 rounded-2xl border border-base-border bg-base-900/40 p-8">
          <div className="text-center font-mono text-sm font-semibold uppercase tracking-wide text-ink">
            KUBERNETES
          </div>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3">
            {kubernetesTree.map((topic) => (
              <div
                key={topic}
                className="rounded-md border border-base-border bg-base-800/50 px-3 py-2 text-center font-mono text-xs text-muted"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={0.15}>
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="production" />
              <div className="mt-4 flex flex-wrap gap-2">
                {kubernetesExperience.production.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="developing" />
              <div className="mt-4 flex flex-wrap gap-2">
                {kubernetesExperience.advanced.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClusterPill({
  label,
  started,
  delay,
  small,
  muted,
}: {
  label: string;
  started: boolean;
  delay: number;
  small?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`rounded-md border px-4 font-mono uppercase tracking-wide ${
        small ? "py-1.5 text-[11px]" : "py-2 text-xs"
      } ${
        muted
          ? "border-base-border bg-base-800/40 text-muted"
          : "border-accent-cyan/30 bg-accent-cyan/[0.06] text-ink"
      }`}
    >
      {label}
    </motion.div>
  );
}

function TrafficConnector({
  started,
  reducedMotion,
  delay,
}: {
  started: boolean;
  reducedMotion: boolean;
  delay: number;
}) {
  return (
    <div className="relative my-1.5 h-6 w-px bg-base-border">
      {started && !reducedMotion && (
        <motion.span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, delay, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
