"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { InfrastructureStatus } from "./InfrastructureStatus";
import { NetworkParticles } from "./NetworkParticles";

function highlightWord(word: string) {
  const isHighlighted = (profile.headlineHighlights as readonly string[]).some(
    (h) => word.toUpperCase().includes(h.toUpperCase())
  );
  return isHighlighted;
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-grid bg-radial-fade pt-24"
    >
      <NetworkParticles />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-base-950/40 to-base-950" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
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

          <h1 className="text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {profile.headline.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              View My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.github || "#"}
              target={profile.github ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-900/60 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-base-800"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href={profile.resume || "#"}
              target={profile.resume ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-white"
            >
              <FileDown size={16} />
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="animate-float">
            <InfrastructureStatus />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
