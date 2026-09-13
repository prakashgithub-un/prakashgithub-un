"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { techCategories } from "@/data/technologies";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="03 · Stack"
          title="Technology Ecosystem"
          description="Every tool I reach for, grouped by where it sits in the infrastructure lifecycle. Hover a node to see how it connects to the work I've shipped."
        />

        <div className="mt-14 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              activeCategory === null
                ? "border-accent bg-accent/10 text-accent"
                : "border-base-border text-muted hover:text-white"
            }`}
          >
            All
          </button>
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                activeCategory === cat.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-base-border text-muted hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techCategories
            .filter((cat) => activeCategory === null || cat.id === activeCategory)
            .map((cat, ci) => (
              <Reveal key={cat.id} delay={ci * 0.06}>
                <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
                  <div className="mb-5 flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => {
                      const key = `${cat.id}-${tech.name}`;
                      const isHovered = hovered === key;
                      return (
                        <motion.div
                          key={key}
                          onHoverStart={() => setHovered(key)}
                          onHoverEnd={() => setHovered(null)}
                          whileHover={{ y: -3 }}
                          className="group relative"
                        >
                          <div
                            className="cursor-default rounded-lg border border-base-border bg-base-800/60 px-3 py-2 text-sm text-white transition-colors"
                            style={
                              isHovered
                                ? { borderColor: cat.color, boxShadow: `0 0 24px -8px ${cat.color}` }
                                : undefined
                            }
                          >
                            {tech.name}
                          </div>
                          {tech.related && isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute left-1/2 top-full z-10 mt-2 w-max max-w-[180px] -translate-x-1/2 rounded-md border border-base-border bg-base-900 px-2.5 py-1.5 text-center font-mono text-[10px] text-muted shadow-xl"
                            >
                              Used in {tech.related}
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
