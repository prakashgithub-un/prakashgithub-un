import { ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Certifications() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="18 · Certifications" title="Certifications" align="center" />

        <div className="mt-14 space-y-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <div className="group flex flex-col gap-6 rounded-2xl border border-base-border bg-base-900/40 p-7 transition-colors hover:border-accent-cyan/30 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-base-border bg-base-800/60 font-mono text-[10px] font-bold uppercase tracking-wide text-ink transition-colors group-hover:border-accent-cyan/40">
                    {cert.issuer
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 4)}
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-semibold text-ink sm:text-lg">
                      {cert.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-base-border bg-base-800/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
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

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-base-border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan sm:self-center"
                  >
                    Verify Credential
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="inline-flex shrink-0 items-center self-start rounded-md border border-base-border px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-muted/60 sm:self-center">
                    Verification Pending
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
