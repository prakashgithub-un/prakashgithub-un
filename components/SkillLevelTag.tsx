import type { SkillLevel } from "@/data/skills";

const styles: Record<SkillLevel, { label: string; className: string }> = {
  production: {
    label: "Production Experience",
    className: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  },
  developing: {
    label: "Currently Developing",
    className: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  },
  interest: {
    label: "Engineering Interest",
    className: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
  },
};

export function SkillLevelTag({ level, label }: { level: SkillLevel; label?: string }) {
  const style = styles[level];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${style.className}`}
    >
      {label ?? style.label}
    </span>
  );
}
