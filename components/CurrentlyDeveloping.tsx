import { currentlyDeveloping } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function CurrentlyDeveloping() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="20 · Currently Developing"
          title="Currently Developing"
          description="The areas I'm deliberately building depth in right now, edited here as they progress."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {currentlyDeveloping.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-base-border bg-base-900/40 p-5">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-accent-amber">
                  {category.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-base-border bg-base-800/50 px-3 py-1 font-mono text-[11px] text-muted"
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
