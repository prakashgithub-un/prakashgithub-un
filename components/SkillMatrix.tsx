import { cloudSkillMatrix } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SkillLevelTag } from "./SkillLevelTag";

export function SkillMatrix() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="03 · Skills"
          title="Skill Maturity Matrix"
          description="Not a logo wall — a straight answer on where each platform sits: shipped in production, or actively being built up."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cloudSkillMatrix.map((group, i) => (
            <Reveal key={group.platform} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-white">
                    {group.platform}
                  </h3>
                </div>
                <div className="mt-3">
                  <SkillLevelTag level={group.level} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
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
