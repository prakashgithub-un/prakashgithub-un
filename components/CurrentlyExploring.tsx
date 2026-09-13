import { currentlyExploring } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function CurrentlyExploring() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="10 · Now" title="Currently Exploring" align="center" />
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {currentlyExploring.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-base-border bg-base-900/50 px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:border-accent-violet/50 hover:text-white"
              >
                {topic}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
