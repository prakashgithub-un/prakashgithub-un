"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="02 · Experience"
          title="Where I've Built Things"
          description="A timeline of infrastructure roles, each expandable for the details."
        />

        <div className="relative mt-16">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-base-border sm:left-[19px]" />

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
                            <span className="hidden font-mono text-lg font-bold text-accent-cyan sm:block">
                              {entry.highlight.value}{" "}
                              <span className="text-xs font-normal uppercase text-muted">
                                {entry.highlight.label}
                              </span>
                            </span>
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
                              <div className="mt-3 font-mono text-2xl font-bold text-accent-cyan sm:hidden">
                                {entry.highlight.value}{" "}
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
