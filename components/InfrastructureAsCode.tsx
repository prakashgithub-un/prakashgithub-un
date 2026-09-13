"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { iacConcepts, iacStrengths } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";

const resources = [
  { id: "vpc", label: "VPC" },
  { id: "subnet", label: "Subnet" },
  { id: "sg", label: "Security Group" },
  { id: "alb", label: "ALB" },
  { id: "ec2", label: "EC2" },
  { id: "cw", label: "CloudWatch" },
];

const RESOURCE_START = 0.9;
const RESOURCE_STEP = 0.2;
const applyDelay = RESOURCE_START + resources.length * RESOURCE_STEP + 0.2;
const readyDelay = applyDelay + 0.7;

export function InfrastructureAsCode() {
  const [started, setStarted] = useState(false);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="06 · Infrastructure as Code"
          title="Terraform"
          description="Modules, not one-off scripts — environments separated deliberately, state managed remotely."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="production" />
          </div>

          <motion.div
            onViewportEnter={() => setStarted(true)}
            viewport={{ once: true, margin: "-120px" }}
            className="mt-8 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-base-border bg-base-900/40 lg:grid-cols-2"
          >
            <div className="border-b border-base-border p-6 font-mono text-[13px] leading-relaxed sm:p-8 lg:border-b-0 lg:border-r">
              <TerminalLine started={started} delay={0.1} prompt>
                terraform plan
              </TerminalLine>

              {resources.map((r, i) => (
                <TerminalLine
                  key={r.id}
                  started={started}
                  delay={RESOURCE_START + i * RESOURCE_STEP}
                  className="pl-4 text-accent-green"
                >
                  + {r.label}
                </TerminalLine>
              ))}

              <div className="h-2" />

              <TerminalLine started={started} delay={applyDelay} prompt>
                terraform apply
              </TerminalLine>
              <TerminalLine started={started} delay={applyDelay + 0.3} className="text-muted">
                Apply complete! 6 resources added.
              </TerminalLine>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 bg-base-950/60 p-8">
              {resources.map((r, i) => (
                <div key={r.id} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    animate={started ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: RESOURCE_START + i * RESOURCE_STEP }}
                    className="rounded-lg border border-accent-green/30 bg-accent-green/[0.06] px-5 py-2 font-mono text-xs text-ink shadow-[0_0_20px_-8px_rgba(52,211,153,0.5)]"
                  >
                    {r.label}
                  </motion.div>
                  {i < resources.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={started ? { opacity: 1, height: 14 } : {}}
                      transition={{ duration: 0.3, delay: RESOURCE_START + (i + 1) * RESOURCE_STEP }}
                      className="w-px bg-base-border"
                    />
                  )}
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={started ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: readyDelay }}
                className="mt-5 flex items-center gap-2 rounded-full border border-accent-green/40 bg-accent-green/10 px-4 py-1.5"
              >
                <Check size={14} className="text-accent-green" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent-green">
                  Infrastructure Ready
                </span>
              </motion.div>
            </div>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {iacStrengths.map((point) => (
              <div key={point} className="flex items-start gap-2.5 rounded-lg border border-base-border bg-base-900/40 p-4">
                <Check size={15} className="mt-0.5 shrink-0 text-accent-green" />
                <p className="text-sm leading-relaxed text-muted">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {iacConcepts.map((c) => (
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

function TerminalLine({
  started,
  delay,
  prompt,
  className = "",
  children,
}: {
  started: boolean;
  delay: number;
  prompt?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={started ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      className={className}
    >
      {prompt && <span className="text-accent-cyan">$ </span>}
      {children}
    </motion.div>
  );
}
