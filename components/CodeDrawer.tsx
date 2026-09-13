"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import type { AutomationNode } from "@/data/skills";

export function CodeDrawer({
  node,
  onClose,
}: {
  node: AutomationNode | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!node) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [node, onClose]);

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${node.system} ${node.step} implementation`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-[61] mx-auto max-w-2xl -translate-y-1/2 overflow-hidden rounded-2xl border border-base-border bg-base-900 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            <div className="flex items-start justify-between border-b border-base-border px-6 py-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
                  {node.system} · {node.step}
                </p>
                <p className="mt-1.5 max-w-md text-sm text-muted">{node.description}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-base-border text-muted transition-colors hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <CodeBlock code={node.code} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
