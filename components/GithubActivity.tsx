import { Star, GitFork, Code2 } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// Set profile.githubUsername in data/profile.ts to enable live GitHub data.
// Until then this renders a clean placeholder dashboard — no fabricated stats.
export function GithubActivity() {
  const username = profile.githubUsername;

  return (
    <section id="github" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="18 · GitHub"
          title="Code / Automation / Infrastructure"
          description={
            username
              ? `Live activity for @${username}.`
              : "Connect a GitHub username in data/profile.ts to pull in live activity."
          }
        />

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-base-border bg-base-900/40 p-8">
            {username ? (
              <div className="space-y-6">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=3b82f6&icon_color=22d3ee&text_color=8b8f9a`}
                  alt={`${username} GitHub stats`}
                  className="w-full max-w-lg"
                  loading="lazy"
                />
              </div>
            ) : (
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
                      <span
                        key={i}
                        className="h-2.5 w-2.5 rounded-sm bg-base-700/60"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[11px] text-muted">
                    GITHUB_USERNAME not configured — set{" "}
                    <code className="text-accent-cyan">githubUsername</code> in{" "}
                    <code className="text-accent-cyan">data/profile.ts</code>.
                  </p>
                </div>
              </div>
            )}
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
      <p className="mt-3 font-mono text-2xl font-bold text-white">—</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
