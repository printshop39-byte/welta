import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  /** Tightens vertical rhythm — use `tight` for stacked premium sections */
  spacing?: "tight" | "default" | "loose";
};

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  tight: "py-14 sm:py-16",
  default: "py-16 sm:py-20",
  loose: "py-20 sm:py-24",
};

export function Section({
  children,
  eyebrow,
  title,
  description,
  className = "",
  align = "center",
  spacing = "default",
}: SectionProps) {
  const headerAlign = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <section className={`${spacingMap[spacing]} ${className}`}>
      {(eyebrow || title || description) && (
        <div className={`max-w-2xl mb-10 sm:mb-12 ${headerAlign}`}>
          {eyebrow && (
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold-deep)] font-medium">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[var(--color-navy-ink)] leading-[1.1]">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-[15px] sm:text-base text-[var(--color-muted)] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
