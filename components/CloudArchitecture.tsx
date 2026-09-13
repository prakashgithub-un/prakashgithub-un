import { cloudArchitectureNodes, cloudArchitectureEdges } from "@/data/architecture";
import { architectureConcepts } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function CloudArchitecture() {
  return (
    <section id="architecture" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="08 · Cloud Architecture"
          title="Cloud Architecture"
          description="A highly-available reference architecture — hover any layer to trace the request path and its failure domains."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <ArchitectureDiagram
              nodes={cloudArchitectureNodes}
              edges={cloudArchitectureEdges}
              height={560}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {architectureConcepts.map((c) => (
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
