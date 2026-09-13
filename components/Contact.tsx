import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl md:text-5xl">
            Let&apos;s Build Something Reliable.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            Whether it&apos;s cloud infrastructure, Kubernetes, CI/CD or automation — I&apos;m
            always interested in solving interesting engineering problems.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ContactLink href={profile.github} icon={Github} label="GitHub" />
            <ContactLink href={profile.linkedin} icon={Linkedin} label="LinkedIn" />
            <ContactLink
              href={profile.email ? `mailto:${profile.email}` : ""}
              icon={Mail}
              label="Email"
            />
            <ContactLink href={profile.resume} icon={FileDown} label="Download Resume" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Github;
  label: string;
}) {
  const disabled = !href;

  if (disabled) {
    return (
      <span
        aria-disabled
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-base-border px-5 py-3 text-sm font-medium text-muted/50"
      >
        <Icon size={16} />
        {label}
      </span>
    );
  }

  return (
    <MagneticButton
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-900/60 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-base-800"
    >
      <Icon size={16} />
      {label}
    </MagneticButton>
  );
}
