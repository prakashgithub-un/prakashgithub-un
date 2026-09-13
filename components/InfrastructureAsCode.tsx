import { iacConcepts } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import { SkillLevelTag } from "./SkillLevelTag";

export function InfrastructureAsCode() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="05 · Infrastructure as Code"
          title="Terraform"
          description="Modules, not one-off scripts — environments separated deliberately, state managed remotely."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <SkillLevelTag level="production" />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <FlowDiagram
              steps={[
                { label: "TERRAFORM" },
                { label: "MODULES" },
                [
                  { label: "AWS", sublabel: "Network · EC2/ALB" },
                  { label: "Azure", sublabel: "AKS/VNET · ACR" },
                  { label: "GCP", sublabel: "Services · Billing" },
                ],
              ]}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {iacConcepts.map((c) => (
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
