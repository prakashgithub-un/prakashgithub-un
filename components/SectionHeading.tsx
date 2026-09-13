import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-accent/60" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed text-muted ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
