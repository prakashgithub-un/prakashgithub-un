import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function Projects() {
  return (
    <section id="projects" className="relative py-16">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="15 · Projects"
          title="Featured Projects"
          description="A selection of highlighted projects from ongoing infrastructure work — not an exhaustive list."
          align="center"
        />
      </div>

      <div className="mt-8">
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center border-b border-base-border px-6 py-20 text-center last:border-b-0"
          >
            <Reveal>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {project.index}
                </span>
                {project.highlight && (
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-0.5 font-mono text-xs font-semibold text-accent-cyan">
                    {project.highlight}
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-2 font-mono text-sm text-muted">{project.title}</p>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-14 w-full">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-cyan/70">
                ↓ Architecture
              </p>
              <div className="overflow-x-auto rounded-2xl border border-base-border bg-base-950/60 p-8 scrollbar-none">
                <ArchitectureDiagram nodes={project.diagram.nodes} edges={project.diagram.edges} height={420} />
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
