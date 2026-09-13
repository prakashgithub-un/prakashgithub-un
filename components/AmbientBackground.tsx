"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// A single fixed backdrop shared by the whole page — depth via a restrained,
// mostly-monochrome light plus a structured grid, instead of a flat fill or
// a scatter of bright decorative color.
export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const gridShift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base-950">
      <div className="absolute left-1/2 top-[-15%] h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[160px]" />
      <div className="absolute bottom-[-20%] right-[-15%] h-[40vw] w-[40vw] animate-float rounded-full bg-accent-cyan/[0.045] blur-[150px]" />

      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="absolute inset-x-0 top-0 h-[160%] bg-grid opacity-[0.05]"
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 40%, transparent 40%, rgba(8,9,11,0.6) 100%)",
        }}
      />

      <div className="noise-layer absolute inset-0 opacity-[0.025] mix-blend-overlay" />
    </div>
  );
}
