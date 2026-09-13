"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, ShieldAlert } from "lucide-react";
import {
  apimCapabilitiesSummary,
  apimCapabilitiesFull,
  backendSystems,
  engineeringEmphasis,
  gatewayTechnologies,
} from "@/data/hybridGateway";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/motion";
import { smoothPath } from "@/lib/smoothPath";

const CLIENT = { x: 50, y: 6 };
const APIM = { x: 50, y: 32 };
const BACKEND_Y = 76;
const BACKEND_X = [18, 50, 82];

const TRANSITION_DELAY = 1.3;
const APIM_DELAY = TRANSITION_DELAY + 0.3;
const BACKEND_STATE_DELAY = APIM_DELAY + 0.5;

export function HybridApiGateway() {
  const [started, setStarted] = useState(false);
  const [apimHovered, setApimHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const backendPositions = BACKEND_X.map((x) => ({ x, y: BACKEND_Y }));

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="14 · Signature Project"
          title="Securing Legacy APIs Across Hybrid Infrastructure"
          description="Azure API Management as a centralized security and governance layer for Azure, on-premises and AWS-hosted applications."
          align="center"
        />

        <Reveal delay={0.1}>
          <motion.div
            onViewportEnter={() => setStarted(true)}
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto mt-16 w-full"
            style={{ height: 620 }}
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {backendPositions.map((b, i) => (
                <motion.path
                  key={`direct-${i}`}
                  d={smoothPath(CLIENT.x, CLIENT.y, b.x, b.y)}
                  fill="none"
                  stroke="rgba(220,38,38,0.4)"
                  strokeWidth={0.3}
                  strokeLinecap="round"
                  strokeDasharray="1.5 2"
                  initial={{ opacity: 1 }}
                  animate={started ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.6, delay: TRANSITION_DELAY }}
                />
              ))}

              <motion.path
                d={smoothPath(CLIENT.x, CLIENT.y, APIM.x, APIM.y)}
                fill="none"
                stroke="rgba(8,145,178,0.55)"
                strokeWidth={0.32}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={started ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: APIM_DELAY }}
              />
              {backendPositions.map((b, i) => (
                <motion.path
                  key={`secure-${i}`}
                  d={smoothPath(APIM.x, APIM.y + 9, b.x, b.y)}
                  fill="none"
                  stroke="rgba(8,145,178,0.55)"
                  strokeWidth={0.32}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={started ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: APIM_DELAY + 0.2 + i * 0.1 }}
                />
              ))}

              {started && !reducedMotion && (
                <>
                  <FlowParticle from={CLIENT} to={APIM} delay={APIM_DELAY + 0.6} color="#0891b2" />
                  {backendPositions.map((b, i) => (
                    <FlowParticle
                      key={`p-${i}`}
                      from={{ x: APIM.x, y: APIM.y + 9 }}
                      to={b}
                      delay={APIM_DELAY + 1 + i * 0.2}
                      color="#0891b2"
                    />
                  ))}
                </>
              )}
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border border-base-border bg-base-800/70 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-ink"
              style={{ left: `${CLIENT.x}%`, top: `${CLIENT.y}%` }}
            >
              Client
            </motion.div>

            <motion.div
              onMouseEnter={() => setApimHovered(true)}
              onMouseLeave={() => setApimHovered(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={started ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: APIM_DELAY, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-56 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-accent-cyan/40 bg-base-900/95 p-4 shadow-[0_0_40px_-12px_rgba(34,211,238,0.5)]"
              style={{ left: `${APIM.x}%`, top: `${APIM.y}%` }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-accent-cyan" />
                <span className="font-mono text-xs font-bold uppercase tracking-wide text-ink">
                  Azure APIM
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted">Security &amp; governance gateway</p>

              <div className="mt-3 space-y-1.5 border-t border-base-border pt-3">
                {apimCapabilitiesSummary.map((cap, i) => (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, x: -4 }}
                    animate={started ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: APIM_DELAY + 0.3 + i * 0.1 }}
                    className="flex items-center gap-1.5 font-mono text-[11px] text-muted"
                  >
                    <Check size={11} className="shrink-0 text-accent-cyan" />
                    {cap}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={started ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: APIM_DELAY + 0.9 }}
                className="mt-3 border-t border-base-border pt-2 text-center font-mono text-[10px] text-accent-cyan/70"
              >
                Hover for full policy list
              </motion.p>

              <AnimatePresence>
                {apimHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full z-20 mt-2 w-60 -translate-x-1/2 rounded-lg border border-accent-cyan/30 bg-base-950 p-4 shadow-2xl"
                  >
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">
                      API Governance
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {apimCapabilitiesFull.map((cap) => (
                        <div key={cap} className="flex items-center gap-1.5 font-mono text-[11px] text-ink">
                          <Check size={11} className="shrink-0 text-accent-cyan" />
                          {cap}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {backendSystems.map((backend, i) => {
              const pos = backendPositions[i];
              return (
                <motion.div
                  key={backend.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg border px-3 py-3 text-center"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    borderColor: started ? "rgba(52,211,153,0.35)" : "rgba(248,113,113,0.3)",
                    backgroundColor: started ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.05)",
                    transition: `border-color 0.6s ease ${BACKEND_STATE_DELAY}s, background-color 0.6s ease ${BACKEND_STATE_DELAY}s`,
                  }}
                >
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ink">
                    {backend.system}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">{backend.hosting}</p>
                  <p className="mt-1.5 font-mono text-[10px] text-muted">Legacy App</p>
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={started ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.4, delay: BACKEND_STATE_DELAY }}
                    className="absolute inset-0 flex items-center justify-center gap-1 rounded-lg bg-red-50/90 font-mono text-[10px] uppercase tracking-wide text-red-700"
                  >
                    <ShieldAlert size={12} />
                    Exposed
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={started ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: BACKEND_STATE_DELAY + 0.2 }}
                    className="mt-1.5 flex items-center justify-center gap-1 font-mono text-[10px] uppercase tracking-wide text-accent-green"
                  >
                    <ShieldCheck size={12} />
                    Protected
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="relative mx-auto mt-2 h-6 max-w-lg text-center">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.p
                  key="before"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[11px] uppercase tracking-wide text-red-600"
                >
                  Client → Legacy Application
                </motion.p>
              ) : (
                <motion.p
                  key="after"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: BACKEND_STATE_DELAY + 0.3 }}
                  className="font-mono text-[11px] uppercase tracking-wide text-accent-cyan"
                >
                  Client → Azure APIM → Security / Governance / Policies → Backends
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Engineering Emphasis
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {engineeringEmphasis.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-base-border bg-base-800/50 px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex flex-wrap justify-center gap-2">
              {gatewayTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
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
    <circle r={0.85} fill={color}>
      <animateMotion
        dur="1.6s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={smoothPath(from.x, from.y, to.x, to.y)}
      />
    </circle>
  );
}
