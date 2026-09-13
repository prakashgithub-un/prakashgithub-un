import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="01 · About"
          title="Engineer Behind The Infrastructure"
          align="center"
        />
        <div className="mt-10 space-y-6">
          {profile.about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-center text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
