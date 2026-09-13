"use client";

import { useState } from "react";
import { Linkedin, ExternalLink } from "lucide-react";
import { posts, type Post } from "@/data/posts";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { PostVisual } from "./PostVisual";
import { PostModal } from "./PostModal";

export function Posts() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [featuredPost, ...secondaryPosts] = posts;

  return (
    <section id="posts" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="19 · Insights & Posts"
          title="Insights & Posts"
          description="Thoughts, experiences and observations from the cloud and DevOps community."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {featuredPost && (
            <Reveal>
              <PostCard post={featuredPost} featured onOpen={() => setActivePost(featuredPost)} />
            </Reveal>
          )}
          <div className="flex flex-col gap-6">
            {secondaryPosts.map((post, i) => (
              <Reveal key={post.id} delay={0.1 + i * 0.08}>
                <PostCard post={post} onOpen={() => setActivePost(post)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <PostModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
}

function PostCard({
  post,
  featured,
  onOpen,
}: {
  post: Post;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-base-border bg-base-900/40 text-left transition-colors hover:border-accent-cyan/40"
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-300 group-hover:scale-[1.03]">
          <PostVisual variant={post.visual} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8" : ""}`}>
        <div className="flex items-center gap-2 text-muted transition-colors group-hover:text-accent-cyan">
          <Linkedin size={14} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            {post.platform}
            {post.date && ` · ${post.date}`}
          </span>
        </div>

        <h3
          className={`mt-4 font-bold uppercase tracking-tight text-ink ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
          {post.topics.slice(0, featured ? 4 : 2).map((t) => (
            <span key={t} className="font-mono text-[11px] text-accent">
              #{t.replace(/\s+/g, "")}
            </span>
          ))}
        </div>

        <p
          className={`mt-4 text-sm leading-relaxed text-muted ${
            featured ? "line-clamp-4" : "line-clamp-2"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-6 font-mono text-xs font-semibold uppercase tracking-wide text-ink">
          Read on LinkedIn
          <ExternalLink
            size={13}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </button>
  );
}
