import { Star, GitFork, Code2, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// Set profile.githubUsername in data/profile.ts to enable live GitHub data.
// Until then (and by default, to avoid depending on an unreliable third-party
// stats image) this renders a clean placeholder dashboard — no fabricated stats.
export function GithubActivity() {
  const username = profile.githubUsername;

  return (
    <section id="github" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Code / Automation / Infrastructure"
          description={
            username
              ? `Full activity for @${username} lives on GitHub — a snapshot here, the rest at the link below.`
              : "Connect a GitHub username in data/profile.ts to pull in live activity."
          }
        />

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-base-border bg-base-900/40 p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <PlaceholderStat icon={Star} label="Stars" />
              <PlaceholderStat icon={GitFork} label="Forks" />
              <PlaceholderStat icon={Code2} label="Repositories" />

              <div className="col-span-full rounded-xl border border-dashed border-base-border bg-base-950/60 p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  Contribution graph
                </p>
                <div
                  className="mt-4 grid gap-1 overflow-x-auto"
                  style={{ gridTemplateColumns: "repeat(26, minmax(0, 1fr))" }}
                >
                  {Array.from({ length: 7 * 26 }).map((_, i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-sm bg-base-700/60" aria-hidden />
                  ))}
                </div>

                {username ? (
                  <a
                    href={profile.github || `https://github.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-accent-cyan transition-colors hover:text-ink"
                  >
                    View @{username} on GitHub
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <p className="mt-4 font-mono text-[11px] text-muted">
                    GITHUB_USERNAME not configured — set{" "}
                    <code className="text-accent-cyan">githubUsername</code> in{" "}
                    <code className="text-accent-cyan">data/profile.ts</code>.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlaceholderStat({ icon: Icon, label }: { icon: typeof Star; label: string }) {
  return (
    <div className="rounded-xl border border-base-border bg-base-950/60 p-6 text-center">
      <Icon size={20} className="mx-auto text-muted" />
      <p className="mt-3 font-mono text-2xl font-bold text-ink">—</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
