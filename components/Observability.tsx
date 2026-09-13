import { observabilityConcepts, observabilityTech } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import { SkillLevelTag } from "./SkillLevelTag";

export function Observability() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="13 · Observability"
          title="Observability"
          description="If it isn't observable, it isn't operable — metrics, logs and traces feeding one place."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="production" />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <FlowDiagram
              steps={[
                { label: "APPLICATION" },
                [{ label: "Metrics" }, { label: "Logs" }, { label: "Traces" }],
                [{ label: "Prometheus" }, { label: "Loki" }, { label: "Jaeger" }],
                { label: "Grafana" },
              ]}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {observabilityTech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-ink"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {observabilityConcepts.map((c) => (
              <span
                key={c}
                className="rounded-md border border-base-border bg-base-800/30 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
