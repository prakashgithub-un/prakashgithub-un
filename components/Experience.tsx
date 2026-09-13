"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="02 · Experience"
          title="Where I've Built Things"
          description="A timeline of infrastructure roles, each expandable for the details."
        />

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-base-border sm:left-[19px]" />
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-cyan to-accent-cyan sm:left-[19px]"
          />

          <ul className="space-y-4">
            {experience.map((entry, i) => {
              const isOpen = openId === entry.id;
              return (
                <Reveal key={entry.id} delay={i * 0.06}>
                  <li className="relative pl-10 sm:pl-12">
                    <span
                      className={`absolute left-0 top-6 h-[10px] w-[10px] rounded-full border-2 sm:left-1 ${
                        i === 0
                          ? "border-accent-green bg-accent-green/40"
                          : "border-base-600 bg-base-900"
                      }`}
                    />
                    <button
                      onClick={() => setOpenId(isOpen ? null : entry.id)}
                      className="w-full rounded-lg border border-base-border bg-base-900/40 px-5 py-5 text-left transition-colors hover:border-accent/40 hover:bg-base-900/70"
                      aria-expanded={isOpen}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-white">
                              {entry.company}
                            </h3>
                            {i === 0 && (
                              <span className="rounded-full bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent-green">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted">{entry.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          {entry.highlight && (
                            <div className="hidden items-baseline gap-1.5 sm:flex">
                              <CinematicNumber value={entry.highlight.value} />
                              <span className="text-xs font-normal uppercase text-muted">
                                {entry.highlight.label}
                              </span>
                            </div>
                          )}
                          <span className="font-mono text-xs text-muted">{entry.period}</span>
                          <ChevronDown
                            size={16}
                            className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 flex flex-wrap gap-2 border-t border-base-border pt-4">
                              {entry.focus.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {entry.highlight && (
                              <div className="mt-3 flex items-baseline gap-1.5 sm:hidden">
                                <CinematicNumber value={entry.highlight.value} />
                                <span className="text-xs font-normal uppercase text-muted">
                                  {entry.highlight.label}
                                </span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CinematicNumber({ value }: { value: string }) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const isNumeric = !Number.isNaN(numeric) && numeric > 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const duration = 1000;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * numeric));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, numeric]);

  return (
    <span ref={ref} className="font-mono text-2xl font-bold text-accent-cyan sm:text-3xl">
      {isNumeric ? display : value}
      {isNumeric ? suffix : ""}
    </span>
  );
}
