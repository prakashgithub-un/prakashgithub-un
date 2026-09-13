"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { InfrastructureStatus } from "./InfrastructureStatus";
import { InfrastructureNetwork } from "./InfrastructureNetwork";
import { MagneticButton } from "./MagneticButton";
import { usePrefersReducedMotion } from "@/lib/motion";

function highlightWord(word: string) {
  return (profile.headlineHighlights as readonly string[]).some((h) =>
    word.toUpperCase().includes(h.toUpperCase())
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -60]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1, 0.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <motion.div className="absolute inset-0" style={{ opacity: networkOpacity }}>
        <InfrastructureNetwork />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-base-950/60 to-base-950"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-950" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-border bg-base-900/60 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              {profile.headlineLabel}
            </span>
          </motion.div>

          <h1 className="text-[13vw] font-bold uppercase leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {profile.headline.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className={
                      highlightWord(word)
                        ? "bg-gradient-to-r from-accent via-accent-cyan to-accent bg-clip-text text-transparent"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              View My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton
              href={profile.github || "#"}
              target={profile.github ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-900/60 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-base-800"
            >
              <Github size={16} />
              GitHub
            </MagneticButton>
            <MagneticButton
              href={profile.resume || "#"}
              target={profile.resume ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <FileDown size={16} />
              Download Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: dashboardY, opacity: dashboardOpacity }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <InfrastructureStatus />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
