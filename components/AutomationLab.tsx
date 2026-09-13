"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { automationNodes, type AutomationNode } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CodeDrawer } from "./CodeDrawer";
import { usePrefersReducedMotion } from "@/lib/motion";

const ENGINE = { x: 50, y: 5 };
const JUNCTION = { x: 50, y: 20 };
const SYSTEM_Y = 34;
const STEP_Y = 58;
const CONVERGE = { x: 50, y: 80 };
const WORKFLOW = { x: 50, y: 95 };
const COLUMN_X = [18, 50, 82];

export function AutomationLab() {
  const [started, setStarted] = useState(false);
  const [openNode, setOpenNode] = useState<AutomationNode | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const systemPositions = COLUMN_X.map((x) => ({ x, y: SYSTEM_Y }));
  const stepPositions = COLUMN_X.map((x) => ({ x, y: STEP_Y }));

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="10 · Automation Engine"
          title="Automation Engine"
          description="Automation isn't the code — it's what the code lets me stop doing by hand. Select a system to see what runs underneath."
          align="center"
        />

        <Reveal delay={0.1}>
          <motion.div
            onViewportEnter={() => setStarted(true)}
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto mt-16 w-full"
            style={{ height: 560 }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <motion.line
                x1={ENGINE.x}
                y1={ENGINE.y}
                x2={JUNCTION.x}
                y2={JUNCTION.y}
                stroke="rgba(148,163,184,0.3)"
                strokeWidth={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={started ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {systemPositions.map((sys, i) => (
                <motion.line
                  key={`junction-${i}`}
                  x1={JUNCTION.x}
                  y1={JUNCTION.y}
                  x2={sys.x}
                  y2={sys.y}
                  stroke="rgba(148,163,184,0.3)"
                  strokeWidth={0.3}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={started ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                />
              ))}

              {systemPositions.map((sys, i) => (
                <motion.line
                  key={`step-${i}`}
                  x1={sys.x}
                  y1={sys.y}
                  x2={stepPositions[i].x}
                  y2={stepPositions[i].y}
                  stroke="rgba(34,211,238,0.35)"
                  strokeWidth={0.3}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={started ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.0 + i * 0.12 }}
                />
              ))}

              {stepPositions.map((step, i) => (
                <motion.line
                  key={`converge-${i}`}
                  x1={step.x}
                  y1={step.y}
                  x2={CONVERGE.x}
                  y2={CONVERGE.y}
                  stroke="rgba(148,163,184,0.3)"
                  strokeWidth={0.3}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={started ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.7 + i * 0.08 }}
                />
              ))}

              <motion.line
                x1={CONVERGE.x}
                y1={CONVERGE.y}
                x2={WORKFLOW.x}
                y2={WORKFLOW.y}
                stroke="rgba(52,211,153,0.4)"
                strokeWidth={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={started ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 2.1 }}
              />

              {started && !reducedMotion && (
                <>
                  <FlowParticle from={ENGINE} to={JUNCTION} delay={0.9} color="#38bdf8" />
                  {systemPositions.map((sys, i) => (
                    <FlowParticle
                      key={`p-junction-${i}`}
                      from={JUNCTION}
                      to={sys}
                      delay={1.1 + i * 0.2}
                      color="#38bdf8"
                    />
                  ))}
                  {systemPositions.map((sys, i) => (
                    <FlowParticle
                      key={`p-step-${i}`}
                      from={sys}
                      to={stepPositions[i]}
                      delay={1.6 + i * 0.2}
                      color="#22d3ee"
                    />
                  ))}
                  {stepPositions.map((step, i) => (
                    <FlowParticle
                      key={`p-converge-${i}`}
                      from={step}
                      to={CONVERGE}
                      delay={2.2 + i * 0.15}
                      color="#34d399"
                    />
                  ))}
                  <FlowParticle from={CONVERGE} to={WORKFLOW} delay={2.9} color="#34d399" />
                </>
              )}
            </svg>

            <EngineNode label="AUTOMATION ENGINE" x={ENGINE.x} y={ENGINE.y} started={started} delay={0} accent />

            {automationNodes.map((node, i) => (
              <EngineNode
                key={`sys-${node.id}`}
                label={node.system.toUpperCase()}
                x={systemPositions[i].x}
                y={systemPositions[i].y}
                started={started}
                delay={0.6 + i * 0.12}
              />
            ))}

            {automationNodes.map((node, i) => (
              <div key={`step-${node.id}`}>
                <EngineNode
                  label={node.step}
                  x={stepPositions[i].x}
                  y={stepPositions[i].y}
                  started={started}
                  delay={1.15 + i * 0.12}
                  expand
                  cyan
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={started ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.5 + i * 0.12 }}
                  className="absolute w-36 -translate-x-1/2 text-center text-[11px] leading-snug text-muted"
                  style={{ left: `${stepPositions[i].x}%`, top: `${STEP_Y + 9}%` }}
                >
                  {node.description}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={started ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.7 + i * 0.12 }}
                  onClick={() => setOpenNode(node)}
                  className="absolute flex -translate-x-1/2 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-accent-cyan/80 transition-colors hover:text-accent-cyan"
                  style={{ left: `${stepPositions[i].x}%`, top: `${STEP_Y + 20}%` }}
                >
                  <Code2 size={11} />
                  View implementation
                </motion.button>
              </div>
            ))}

            <EngineNode
              label="AUTOMATED WORKFLOW"
              x={WORKFLOW.x}
              y={WORKFLOW.y}
              started={started}
              delay={2.4}
              green
            />
          </motion.div>
        </Reveal>
      </div>

      <CodeDrawer node={openNode} onClose={() => setOpenNode(null)} />
    </section>
  );
}

function FlowParticle({
  from,
  to,
  delay,
  color,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
  color: string;
}) {
  return (
    <circle r={0.6} fill={color}>
      <animateMotion
        dur="1.6s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
      />
    </circle>
  );
}

function EngineNode({
  label,
  x,
  y,
  started,
  delay,
  accent,
  cyan,
  green,
  expand,
}: {
  label: string;
  x: number;
  y: number;
  started: boolean;
  delay: number;
  accent?: boolean;
  cyan?: boolean;
  green?: boolean;
  expand?: boolean;
}) {
  const borderColor = accent
    ? "border-accent/40"
    : green
      ? "border-accent-green/40"
      : cyan
        ? "border-accent-cyan/30"
        : "border-base-border";
  const bgColor = accent
    ? "bg-accent/[0.08]"
    : green
      ? "bg-accent-green/[0.08]"
      : cyan
        ? "bg-accent-cyan/[0.06]"
        : "bg-base-800/70";
  const textColor = accent || green || cyan ? "text-white" : "text-muted";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={started ? { opacity: 1, scale: expand ? [0.85, 1.08, 1] : 1 } : {}}
      transition={{ duration: 0.45, delay }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-4 py-2 font-mono text-xs font-medium uppercase tracking-wide ${borderColor} ${bgColor} ${textColor}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {label}
    </motion.div>
  );
}
