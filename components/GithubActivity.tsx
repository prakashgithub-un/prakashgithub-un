import { Github, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

// Set profile.githubUsername in data/profile.ts to enable a live link.
export function GithubActivity() {
  const username = profile.githubUsername;
  const href = profile.github || (username ? `https://github.com/${username}` : "");

  return (
    <section id="github" className="relative py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <SectionHeading
          title="Code / Automation / Infrastructure"
          description={
            username
              ? `The real activity — repos, commits, everything — lives on GitHub @${username}.`
              : "Connect a GitHub username in data/profile.ts to link this section."
          }
          align="center"
        />

        <Reveal delay={0.1}>
          {href ? (
            <MagneticButton
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-base-border bg-base-900/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
            >
              <Github size={16} />
              View GitHub Profile
              <ExternalLink size={14} />
            </MagneticButton>
          ) : (
            <p className="mt-8 font-mono text-[11px] text-muted">
              GITHUB_USERNAME not configured — set{" "}
              <code className="text-accent-cyan">githubUsername</code> in{" "}
              <code className="text-accent-cyan">data/profile.ts</code>.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
