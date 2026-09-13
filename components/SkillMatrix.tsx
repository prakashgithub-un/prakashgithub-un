import { cloudSkillMatrix } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";
import { FlowDiagram } from "./FlowDiagram";

const environmentFlows: Record<string, { label: string }[]> = {
  AWS: [{ label: "Route53" }, { label: "ALB" }, { label: "EC2 / EKS" }, { label: "Storage" }],
  Azure: [
    { label: "DNS" },
    { label: "Application Gateway" },
    { label: "AKS" },
    { label: "ACR" },
  ],
  GCP: [{ label: "Load Balancer" }, { label: "Compute" }, { label: "GKE" }, { label: "BigQuery" }],
};

export function SkillMatrix() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="03 · Skills"
          title="Three Environments, One Operator"
          description="Not a logo wall — an honest read on where each platform sits: shipped in production, or actively being built up."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cloudSkillMatrix.map((group, i) => (
            <Reveal key={group.platform} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-base-border bg-base-900/40 p-6 transition-colors hover:border-accent-cyan/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-lg font-semibold uppercase tracking-wide text-white">
                    {group.platform}
                  </h3>
                  <SkillLevelTag level={group.level} />
                </div>

                <div className="mt-8 flex justify-center">
                  <FlowDiagram steps={environmentFlows[group.platform] ?? []} />
                </div>

                <div className="mt-8 flex flex-wrap gap-2 border-t border-base-border pt-5">
                  {group.items.map((item) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
