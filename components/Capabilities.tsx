"use client";

import { useState, MouseEvent } from "react";
import { Cloud, Boxes, Layers, GitBranch, Activity } from "lucide-react";
import { capabilities } from "@/data/technologies";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons = [Cloud, Layers, Boxes, GitBranch, Activity];

export function Capabilities() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="04 · Capabilities"
          title="What I Build"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={cap.id} delay={i * 0.06}>
                <CapabilityCard icon={Icon} title={cap.title} description={cap.description} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Cloud;
  title: string;
  description: string;
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative h-full overflow-hidden rounded-xl border border-base-border bg-base-900/40 p-6 transition-colors hover:border-accent/40"
      style={{
        backgroundImage: `radial-gradient(240px circle at ${pos.x}% ${pos.y}%, rgba(59,130,246,0.12), transparent 70%)`,
      }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-base-border bg-base-800/80 text-accent-cyan transition-colors group-hover:border-accent/50">
        <Icon size={20} />
      </div>
      <h3 className="mt-5 font-mono text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
