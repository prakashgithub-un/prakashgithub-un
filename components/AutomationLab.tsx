import { automationExamples } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CodeBlock } from "./CodeBlock";

const pipeline = ["AWS APIs", "Azure APIs", "Kubernetes", "Terraform", "Cost Data"];

export function AutomationLab() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="10 · Automation Lab"
          title="Automation Lab"
          description="Small, focused scripts — the kind that turn a manual runbook step into something that runs itself."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-md border border-base-border bg-base-800/70 px-3 py-1.5 font-mono text-xs text-white">
              Python
            </span>
            {pipeline.map((step) => (
              <span key={step} className="text-muted">
                →{" "}
                <span className="rounded-md border border-base-border bg-base-800/40 px-3 py-1.5 font-mono text-xs text-muted">
                  {step}
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {automationExamples.map((example, i) => (
            <Reveal key={example.title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-5">
                <h3 className="font-mono text-sm font-semibold text-white">{example.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{example.description}</p>
                <div className="mt-4">
                  <CodeBlock code={example.code} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
