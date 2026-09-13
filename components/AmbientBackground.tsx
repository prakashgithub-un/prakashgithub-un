"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// A single fixed backdrop shared by the whole page — depth via layered,
// slowly-drifting light instead of a flat black fill behind every section.
export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const gridShift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base-950">
      <div className="absolute left-1/2 top-[-10%] h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[45vw] w-[45vw] animate-float rounded-full bg-accent-cyan/[0.06] blur-[140px]" />
      <div className="absolute left-[-10%] top-[35%] h-[35vw] w-[35vw] rounded-full bg-accent-violet/[0.05] blur-[130px]" />

      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="absolute inset-x-0 top-0 h-[160%] bg-grid opacity-[0.035]"
      />

      <div className="noise-layer absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
