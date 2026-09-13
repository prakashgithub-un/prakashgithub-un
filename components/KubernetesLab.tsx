import { kubernetesTree, kubernetesExperience } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";

export function KubernetesLab() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="04 · Kubernetes"
          title="Kubernetes"
          description="What I run in production today, and the layer of the platform I'm actively going deeper on."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-base-border bg-base-900/40 p-8">
            <div className="text-center font-mono text-sm font-semibold uppercase tracking-wide text-white">
              KUBERNETES
            </div>
            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3">
              {kubernetesTree.map((topic) => (
                <div
                  key={topic}
                  className="rounded-md border border-base-border bg-base-800/50 px-3 py-2 text-center font-mono text-xs text-muted"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={0.15}>
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="production" />
              <div className="mt-4 flex flex-wrap gap-2">
                {kubernetesExperience.production.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
              <SkillLevelTag level="developing" />
              <div className="mt-4 flex flex-wrap gap-2">
                {kubernetesExperience.advanced.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
