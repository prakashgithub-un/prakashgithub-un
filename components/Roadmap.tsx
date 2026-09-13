import { roadmapStages } from "@/data/roadmap";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const statusStyles = {
  current: "border-accent-green bg-accent-green/10 text-accent-green",
  upcoming: "border-base-border bg-base-800/50 text-muted",
  target: "border-accent bg-accent/10 text-accent",
} as const;

export function Roadmap() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow="17 · Direction"
          title="Where I'm Heading"
          description="Growth in progress, not expertise already claimed."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center">
            <div className="rounded-md border border-base-border bg-base-800/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Current
            </div>
            <span className="my-1 h-6 w-px bg-base-border" />
            {roadmapStages.map((stage, i) => (
              <div key={stage.label} className="flex flex-col items-center">
                <div
                  className={`rounded-lg border px-5 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wide ${statusStyles[stage.status]}`}
                >
                  {stage.label}
                </div>
                {i < roadmapStages.length - 1 && <span className="my-1 h-6 w-px bg-base-border" />}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
