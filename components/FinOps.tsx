import { finopsConcepts } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import { SkillLevelTag } from "./SkillLevelTag";

export function FinOps() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="14 · Cloud FinOps"
          title="Cloud FinOps"
          description="Cost as a first-class signal — visible, attributable and actionable across every provider."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="developing" />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <FlowDiagram
              steps={[
                [{ label: "AWS" }, { label: "Azure" }, { label: "GCP" }, { label: "SaaS" }],
                { label: "Cost Data" },
                { label: "BigQuery" },
                { label: "FinOps Engine" },
                [{ label: "Trends" }, { label: "Forecast" }, { label: "Optimization" }],
              ]}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {finopsConcepts.map((c) => (
              <span
                key={c}
                className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
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
