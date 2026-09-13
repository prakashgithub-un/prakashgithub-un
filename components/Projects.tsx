import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="05 · Projects"
          title="Featured Projects"
          description="Real infrastructure work, shown as the architectures behind it."
        />

        <div className="mt-16 space-y-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <article className="overflow-hidden rounded-2xl border border-base-border bg-base-900/40">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                        {project.index}
                      </span>
                      {project.highlight && (
                        <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-0.5 font-mono text-xs font-semibold text-accent-cyan">
                          {project.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-mono text-lg font-semibold uppercase tracking-wide text-white">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{project.title}</p>
                    <p className="mt-5 text-base leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-base-border bg-base-800/60 px-2.5 py-1 font-mono text-xs text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-x-auto border-t border-base-border bg-base-950/60 p-6 scrollbar-none lg:border-l lg:border-t-0">
                    <ArchitectureDiagram
                      nodes={project.diagram.nodes}
                      edges={project.diagram.edges}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
