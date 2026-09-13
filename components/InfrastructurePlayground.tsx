"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { playgroundTabs } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type TabId = (typeof playgroundTabs)[number]["id"];

export function InfrastructurePlayground() {
  const [activeTab, setActiveTab] = useState<TabId>(playgroundTabs[0].id);
  const tab = playgroundTabs.find((t) => t.id === activeTab)!;

  return (
    <section id="infrastructure" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="06 · Playground"
          title="Infrastructure Playground"
          description="Pick a layer of the stack and watch the request path light up."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {playgroundTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  activeTab === t.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-base-border text-muted hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-base-border bg-base-900/40 p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                {tab.nodes.map((node, i) => (
                  <div key={node} className="flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-lg border border-base-border bg-base-800/70 px-6 py-3 font-mono text-sm text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-shadow hover:border-accent-cyan/60 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]"
                    >
                      {node}
                    </motion.div>
                    {i < tab.nodes.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.08 + 0.05 }}
                        className="text-accent-cyan/70"
                      >
                        <ArrowDown size={16} className="animate-pulse-slow" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
