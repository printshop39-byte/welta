import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Editorial hero — luxury-fashion structure.
 *
 * Mobile (default): image stacked above copy, slightly taller crop, a
 * compact eyebrow + headline + supporting line + single primary CTA. A
 * ghost text link gives a secondary path without crowding.
 * Desktop (lg+): split 5/7 — copy left, image right. A quote card
 * floats over the lower-left edge of the image (visible from md+) and
 * a thin gold rule replaces the boxed stat block.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ivory-soft)]">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-8 sm:pt-12 lg:pt-20 pb-14 sm:pb-20 lg:pb-24 items-center">
        {/* ─── Image first on mobile, right on desktop ─── */}
        <div className="lg:col-span-7 lg:order-2 relative">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream)]">
            <Image
              src="/products/welta-hero-white-chikankari.jpg"
              alt="Handcrafted Lucknowi chikankari piece in ivory white, hand-embroidered by master karigars of the Welta atelier in Lucknow"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Quote card — visible from md+ so it doesn't crowd mobile.
              Soft shadow rather than a hard border, sized to feel like
              a margin note rather than an interrupting overlay. */}
          <figure className="hidden md:block absolute -bottom-6 left-4 lg:-left-8 lg:-bottom-8 bg-[var(--color-navy-ink)] text-[var(--color-ivory)] px-6 py-5 lg:px-7 lg:py-6 max-w-[280px] shadow-[0_24px_60px_-30px_rgba(13,23,41,0.45)]">
            <blockquote className="font-serif text-lg lg:text-xl leading-snug italic">
              &ldquo;Each thread, a quiet act of devotion.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-[10px] tracking-[0.32em] uppercase text-[var(--color-gold-soft)] not-italic">
              — Master karigar, Chowk Lucknow
            </figcaption>
          </figure>
        </div>

        {/* ─── Copy block ─── */}
        <div className="lg:col-span-5 lg:order-1">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-deep)] mb-5 sm:mb-6">
            The Welta Edit · Lucknow
          </p>
          <h1 className="font-serif text-[36px] leading-[1.04] sm:text-5xl lg:text-[60px] xl:text-[68px] text-[var(--color-navy-ink)] tracking-[-0.01em] max-w-[16ch]">
            Hand-stitched chikankari, made for the way you live.
          </h1>
          <p className="mt-6 max-w-[44ch] text-[15px] sm:text-[17px] text-[var(--color-muted)] leading-relaxed">
            Anarkalis, kurta sets and dupattas embroidered by master
            karigars in the old by-lanes of Lucknow — heirloom craft,
            quietly modern.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Button as="link" href="/collections" variant="primary">
              Shop the atelier
            </Button>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
            >
              Our craft
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Hairline stat strip replaces the 3-col block — reads as
              editorial credits rather than infographic stats. */}
          <dl className="mt-10 sm:mt-14 grid grid-cols-3 gap-x-6 text-center sm:text-left border-t border-[var(--color-gold-soft)]/40 pt-6 max-w-md">
            <Stat label="Karigars" value="120+" />
            <Stat label="Years of craft" value="40" />
            <Stat label="Pieces a year" value="5,000" />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)]">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-xl sm:text-2xl text-[var(--color-navy-ink)]">
        {value}
      </dd>
    </div>
  );
}
