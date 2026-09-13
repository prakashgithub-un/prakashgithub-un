import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.08}>
              <div className="flex gap-4 rounded-xl border border-base-border bg-base-900/30 p-5">
                <GraduationCap size={18} className="mt-0.5 shrink-0 text-muted" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {edu.degree} · {edu.field}
                  </p>
                  <p className="mt-1 text-sm text-muted">{edu.school}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{edu.period}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
