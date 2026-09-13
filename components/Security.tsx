import { securityConcepts } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import { SkillLevelTag } from "./SkillLevelTag";

export function Security() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="07 · DevSecOps"
          title="Security By Design"
          description="Security treated as a pipeline stage, not an afterthought — this is an area I'm deliberately building depth in."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="developing" label="Developing Expertise" />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <FlowDiagram
              steps={[
                { label: "Code" },
                { label: "SAST" },
                { label: "Dependency Scan" },
                { label: "IaC Scan" },
                { label: "Container Scan" },
                { label: "Secrets" },
                { label: "Deploy" },
                { label: "Runtime Security" },
              ]}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {securityConcepts.map((c) => (
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
