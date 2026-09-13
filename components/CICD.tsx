import { cicdExperience } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import { SkillLevelTag } from "./SkillLevelTag";

export function CICD() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="06 · CI/CD"
          title="Delivery Pipelines"
          description="From commit to running in a cluster, with a monitoring loop back to the deploy that caused it."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <FlowDiagram
              steps={[
                { label: "Developer" },
                { label: "GitHub" },
                { label: "CI" },
                [{ label: "Test" }, { label: "Build" }, { label: "Scan" }],
                { label: "Docker Image" },
                { label: "Container Registry" },
                { label: "Deployment" },
                { label: "Kubernetes / Cloud" },
                { label: "Monitoring" },
              ]}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="production" />
              <div className="mt-4 flex flex-wrap gap-2">
                {cicdExperience.production.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="developing" />
              <div className="mt-4 flex flex-wrap gap-2">
                {cicdExperience.advanced.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
