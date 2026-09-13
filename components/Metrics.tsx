"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { metrics } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function Counter({ value }: { value: string }) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const isNumeric = !Number.isNaN(numeric) && numeric > 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const duration = 1200;
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
    <span ref={ref} className="font-mono text-4xl font-bold text-ink sm:text-5xl">
      {isNumeric ? display : value}
      {isNumeric ? suffix : ""}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="relative border-y border-base-border bg-base-900/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="17 · Engineering Metrics" title="Engineering Metrics" align="center" />

        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.06} className="text-center">
              <Counter value={metric.value} />
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-muted">
                {metric.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
