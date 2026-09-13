"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { iacConcepts, iacStrengths } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";
import { smoothPath } from "@/lib/smoothPath";
import { usePrefersReducedMotion } from "@/lib/motion";

interface ArchNode {
  id: string;
  terminalLabel: string;
  nodeLabel: string;
  x: number;
  y: number;
}

// Materialization order matches the order Terraform reports them in the
// terminal below — not necessarily top-to-bottom architectural order.
const NODES: ArchNode[] = [
  { id: "vpc", terminalLabel: "VPC", nodeLabel: "VPC", x: 30, y: 40 },
  { id: "subnet", terminalLabel: "Subnet", nodeLabel: "Subnet", x: 30, y: 29 },
  { id: "sg", terminalLabel: "Security Group", nodeLabel: "Security Group", x: 46, y: 51 },
  { id: "alb", terminalLabel: "ALB", nodeLabel: "ALB", x: 30, y: 18 },
  { id: "ec2", terminalLabel: "EC2", nodeLabel: "EC2", x: 16, y: 51 },
  { id: "stepfunctions", terminalLabel: "Step Functions", nodeLabel: "Step Functions", x: 30, y: 63 },
  { id: "batch", terminalLabel: "AWS Batch", nodeLabel: "AWS Batch", x: 14, y: 77 },
  { id: "lambda", terminalLabel: "Lambda", nodeLabel: "Lambda", x: 46, y: 77 },
  { id: "s3", terminalLabel: "S3", nodeLabel: "S3", x: 62, y: 91 },
  { id: "cloudfront", terminalLabel: "CloudFront", nodeLabel: "CloudFront", x: 30, y: 5 },
  { id: "cloudwatch", terminalLabel: "CloudWatch", nodeLabel: "CloudWatch", x: 86, y: 40 },
];

const nodeMap = new Map(NODES.map((n) => [n.id, n]));
const nodeIndex = new Map(NODES.map((n, i) => [n.id, i]));

// REQUEST/NETWORK path (blue) — how a request reaches the application.
// WORKFLOW path (green) — what the application hands off to, asynchronously.
const EDGES: { from: string; to: string; kind: "request" | "workflow" }[] = [
  { from: "cloudfront", to: "alb", kind: "request" },
  { from: "alb", to: "subnet", kind: "request" },
  { from: "subnet", to: "vpc", kind: "request" },
  { from: "vpc", to: "ec2", kind: "request" },
  { from: "vpc", to: "sg", kind: "request" },
  { from: "ec2", to: "stepfunctions", kind: "workflow" },
  { from: "stepfunctions", to: "batch", kind: "workflow" },
  { from: "stepfunctions", to: "lambda", kind: "workflow" },
  { from: "batch", to: "s3", kind: "workflow" },
  { from: "lambda", to: "s3", kind: "workflow" },
];

// Not part of the request/workflow path — CloudWatch observes, and S3 can
// also serve as a CloudFront origin. Rendered dashed and muted.
const OBSERVED_EDGES: [string, string][] = [
  ["cloudfront", "s3"],
  ["cloudwatch", "alb"],
  ["cloudwatch", "stepfunctions"],
  ["cloudwatch", "s3"],
];

const SIGNAL_PATH = EDGES;

const GROUP_LABELS = [
  { text: "EDGE", x: 6, y: 5 },
  { text: "NETWORK", x: 6, y: 22 },
  { text: "COMPUTE", x: 6, y: 51 },
  { text: "ORCHESTRATION", x: 6, y: 63 },
  { text: "STORAGE", x: 80, y: 97 },
  { text: "OBSERVABILITY", x: 86, y: 29 },
];

const RESOURCE_START = 0.6;
const RESOURCE_STEP = 0.16;
const applyDelay = RESOURCE_START + NODES.length * RESOURCE_STEP + 0.3;
const signalStartDelay = applyDelay + 0.7;
const observabilityDelay = signalStartDelay + SIGNAL_PATH.length * 0.3 + 0.4;
const readyDelay = observabilityDelay + 0.9;

function delayFor(id: string) {
  return RESOURCE_START + (nodeIndex.get(id) ?? 0) * RESOURCE_STEP;
}
function edgeDelay(a: string, b: string) {
  return Math.max(delayFor(a), delayFor(b)) + 0.12;
}

export function InfrastructureAsCode() {
  const [started, setStarted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
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
            className="mt-8 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-base-border bg-base-900/40 lg:grid-cols-[1fr_1.4fr]"
          >
            <div className="border-b border-base-border p-6 font-mono text-[12.5px] leading-relaxed sm:p-8 lg:border-b-0 lg:border-r">
              <TerminalLine started={started} delay={0.1} prompt>
                terraform plan
              </TerminalLine>

              {NODES.map((n, i) => (
                <TerminalLine
                  key={n.id}
                  started={started}
                  delay={RESOURCE_START + i * RESOURCE_STEP}
                  className="pl-4 text-accent-green"
                >
                  + {n.terminalLabel}
                </TerminalLine>
              ))}

              <div className="h-2" />

              <TerminalLine started={started} delay={applyDelay} prompt>
                terraform apply
              </TerminalLine>
              <TerminalLine started={started} delay={applyDelay + 0.3} className="text-muted">
                Apply complete.
              </TerminalLine>
              <TerminalLine started={started} delay={applyDelay + 0.5} className="text-muted">
                Infrastructure provisioned.
              </TerminalLine>
            </div>

            <div className="relative overflow-x-auto bg-base-950/60 p-6 scrollbar-none">
              <div className="relative mx-auto" style={{ height: 640, minWidth: 520 }}>
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden
                >
                  {EDGES.map((edge, i) => {
                    const from = nodeMap.get(edge.from)!;
                    const to = nodeMap.get(edge.to)!;
                    const stroke =
                      edge.kind === "workflow" ? "rgba(5,150,105,0.4)" : "rgba(37,99,235,0.4)";
                    return (
                      <motion.path
                        key={`edge-${i}`}
                        d={smoothPath(from.x, from.y, to.x, to.y)}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={0.18}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={started ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: edgeDelay(edge.from, edge.to) }}
                      />
                    );
                  })}

                  {OBSERVED_EDGES.map(([a, b], i) => {
                    const from = nodeMap.get(a)!;
                    const to = nodeMap.get(b)!;
                    return (
                      <motion.path
                        key={`dashed-${i}`}
                        d={smoothPath(from.x, from.y, to.x, to.y)}
                        fill="none"
                        stroke="rgba(91,100,114,0.4)"
                        strokeWidth={0.14}
                        strokeDasharray="1.2 1.6"
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={started ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: observabilityDelay - 0.3 }}
                      />
                    );
                  })}

                  {started &&
                    !reducedMotion &&
                    SIGNAL_PATH.map((edge, i) => {
                      const from = nodeMap.get(edge.from)!;
                      const to = nodeMap.get(edge.to)!;
                      const color = edge.kind === "workflow" ? "#059669" : "#2563eb";
                      return (
                        <circle key={`signal-${i}`} r={0.7} fill={color}>
                          <animateMotion
                            dur="0.9s"
                            begin={`${signalStartDelay + i * 0.3}s`}
                            path={smoothPath(from.x, from.y, to.x, to.y)}
                          />
                        </circle>
                      );
                    })}
                </svg>

                {GROUP_LABELS.map((g) => (
                  <motion.span
                    key={g.text}
                    initial={{ opacity: 0 }}
                    animate={started ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="absolute whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-muted/70"
                    style={{ left: `${g.x}%`, top: `${g.y}%` }}
                  >
                    {g.text}
                  </motion.span>
                ))}

                {NODES.map((n) => {
                  const isCloudwatch = n.id === "cloudwatch";
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={started ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: delayFor(n.id) }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 font-mono text-[10px] text-ink ${
                        isCloudwatch
                          ? "border-accent-amber/30 bg-accent-amber/[0.07]"
                          : "border-base-border bg-base-900/80"
                      }`}
                      style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    >
                      {isCloudwatch && started && !reducedMotion && (
                        <motion.span
                          className="absolute inset-0 rounded-lg border border-accent-amber/50"
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: observabilityDelay,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      {n.nodeLabel}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={started ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: readyDelay }}
                className="mt-4 flex items-center justify-center gap-2 rounded-full border border-accent-green/40 bg-accent-green/10 px-4 py-1.5"
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
              <div
                key={point}
                className="flex items-start gap-2.5 rounded-lg border border-base-border bg-base-900/40 p-4"
              >
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
