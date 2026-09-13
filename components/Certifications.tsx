import { ExternalLink, BadgeCheck } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Certifications() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="03 · Certifications" title="Certifications" align="center" />

        <div className="mt-14 space-y-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <div className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-accent-cyan/25 bg-base-900/50 p-7 shadow-[0_0_40px_-20px_rgba(8,145,178,0.4)] transition-all hover:border-accent-cyan/50 hover:shadow-[0_0_50px_-16px_rgba(8,145,178,0.5)] sm:flex-row sm:items-center sm:justify-between">
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent-cyan to-accent" />

                <div className="flex items-start gap-5 pl-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent-cyan/30 bg-accent-cyan/[0.08] font-mono text-[10px] font-bold uppercase tracking-wide text-ink transition-colors group-hover:border-accent-cyan/50">
                    {cert.issuer
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={15} className="text-accent-cyan" />
                      <h3 className="font-mono text-base font-semibold text-ink sm:text-lg">
                        {cert.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.06] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent-cyan">
                        {cert.category}
                      </span>
                      {cert.year && (
                        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                          {cert.year}
                        </span>
                      )}
                      {cert.credentialId && (
                        <span className="font-mono text-[10px] text-muted">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-accent-cyan/40 bg-accent-cyan/[0.06] px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan sm:self-center"
                  >
                    Verify Credential
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
