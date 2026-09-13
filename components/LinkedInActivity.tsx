import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// Update POST_URN / POST_URL when swapping in a different public LinkedIn post.
const POST_URN = "urn:li:share:7500156139049934849";
const POST_URL =
  "https://www.linkedin.com/posts/prakashin_lenovo-ai-technology-share-7500156139049934849-WFkd/";

export function LinkedInActivity() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow="19 · From LinkedIn"
          title="Recent Activity"
          description="Staying connected with the broader engineering and tech community."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-base-border bg-base-900/40 p-2">
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/${POST_URN}`}
              height={580}
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              title="LinkedIn post"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={POST_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-accent-cyan transition-colors hover:text-ink"
            >
              View on LinkedIn →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
