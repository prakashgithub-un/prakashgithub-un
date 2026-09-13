import { platformEngineeringFocus } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import { SkillLevelTag } from "./SkillLevelTag";

export function PlatformEngineering() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="12 · Platform Engineering"
          title="Platform Engineering"
          description="Treating infrastructure as a product for developers to self-serve — not a ticket queue."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="interest" />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <FlowDiagram
              steps={[
                { label: "DEVELOPERS" },
                { label: "INTERNAL PLATFORM" },
                [{ label: "Templates" }, { label: "CI/CD" }, { label: "Environments" }],
                { label: "Kubernetes" },
                [{ label: "Logging" }, { label: "Metrics" }, { label: "Security" }],
              ]}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {platformEngineeringFocus.map((c) => (
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
