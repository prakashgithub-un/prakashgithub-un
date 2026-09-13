"use client";

import { motion, useScroll } from "framer-motion";
import { useScrollSpy } from "@/lib/useScrollSpy";

const nodes = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "engineering-lab", label: "Engineering Lab" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

// A persistent thread running the length of the page — the visual
// substitute for literal section-to-section morphing: one continuous
// pipeline the whole site sits on, lighting up as you move through it.
export function InfrastructureSpine() {
  const { scrollYProgress } = useScroll();
  const activeId = useScrollSpy(nodes.map((n) => n.id));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen w-6 xl:block"
    >
      <div className="relative mx-auto h-full w-px bg-base-border">
        <motion.div
          className="absolute inset-x-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent-cyan to-accent-cyan"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />
        <div className="absolute inset-0 flex flex-col justify-evenly py-2">
          {nodes.map((node) => {
            const isActive = activeId === node.id;
            return (
              <div key={node.id} className="group pointer-events-auto relative flex items-center">
                <a
                  href={`#${node.id}`}
                  aria-label={node.label}
                  className={`-ml-[3px] h-[7px] w-[7px] rounded-full border transition-all duration-300 ${
                    isActive
                      ? "scale-125 border-accent-cyan bg-accent-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
                      : "border-base-600 bg-base-900"
                  }`}
                />
                <span className="pointer-events-none absolute left-4 whitespace-nowrap rounded-md border border-base-border bg-base-900/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted opacity-0 transition-opacity group-hover:opacity-100">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
