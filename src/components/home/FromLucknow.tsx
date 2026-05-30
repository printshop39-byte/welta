import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Editorial pull-quote band — a quiet pause between the craft section
 * and the footer. No image. Sits on warm cream and uses the gold-soft
 * hairline as the only ornament.
 *
 * Intent: feel like a margin note in a coffee-table book, not a
 * marketing block.
 */
export function FromLucknow() {
  return (
    <section className="bg-[var(--color-ivory-soft)] border-y border-[var(--color-line)]">
      <Container className="py-16 sm:py-20 lg:py-24 max-w-4xl text-center">
        {/* Handwritten accent — Architects Daughter via the
            . utility. One of the site's
            deliberate "karigar's voice" moments. */}
        <p className=" text-[16px] sm:text-[18px] text-[var(--color-gold-deep)] mb-6">
          From Lucknow
        </p>
        <p className="not-italic text-2xl sm:text-3xl lg:text-[36px] leading-[1.25] text-[var(--color-navy-ink)]">
          “Chikankari is patience, made visible. A single anarkali can
          hold sixty hours of hand-stitching — and four hundred years
          of memory.”
        </p>
        <p className="mt-6 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[var(--color-muted)]">
          The Welta Atelier · Alambagh, Lucknow
        </p>
        <div className="mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            Read the story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
