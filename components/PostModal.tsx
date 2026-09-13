"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Linkedin, ArrowUpRight } from "lucide-react";
import type { Post } from "@/data/posts";

export function PostModal({ post, onClose }: { post: Post | null; onClose: () => void }) {
  useEffect(() => {
    if (!post) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-[61] mx-auto max-w-lg -translate-y-1/2 overflow-hidden rounded-2xl border border-base-border bg-base-900 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            <div className="flex items-start justify-between border-b border-base-border px-6 py-5">
              <div className="flex items-center gap-2 text-accent-cyan">
                <Linkedin size={16} />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  {post.platform}
                  {post.date ? ` · ${post.date}` : ""}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-base-border text-muted transition-colors hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="text-xl font-bold uppercase tracking-tight text-ink">{post.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-base-border bg-base-800/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Read full post on LinkedIn
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
