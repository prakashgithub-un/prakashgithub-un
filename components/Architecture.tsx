import { architectureFlow } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function Architecture() {
  const nodes = architectureFlow.map((n) => ({ id: n.id, label: n.label, x: n.x, y: n.y }));
  const edges = architectureFlow.flatMap((n) =>
    n.connections.map((to) => ({ from: n.id, to }))
  );

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="09 · Systems Thinking"
          title="How I Think About Infrastructure"
          description="From user request to observability — hover any layer to trace the path."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-base-border bg-base-900/40 p-8 scrollbar-none">
            <ArchitectureDiagram nodes={nodes} edges={edges} height={520} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
