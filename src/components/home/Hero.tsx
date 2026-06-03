import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Cinematic full-bleed hero.
 *
 * One immersive image that covers the whole section (Next Image `fill`
 * + object-cover), a soft navy overlay for contrast, and minimal luxury
 * copy set in ivory over the image — center-left, lower third.
 *
 * Layout:
 *   - min-h-[76vh] on mobile, min-h-[86vh] on desktop.
 *   - The section sits in normal flow BELOW the sticky header, so the
 *     header never covers the copy; generous top/bottom padding keeps
 *     the text clear of both the fold and the section edges.
 *   - object-position center on desktop, center-top on mobile so the
 *     embroidery crops gracefully on tall portrait screens.
 *
 * Brand: ivory text on image, gold eyebrow, navy/ivory CTAs matching the
 * existing Welta button language. No slideshow, no client JS — a pure
 * server component, so there's no hydration risk and no Date.now /
 * Math.random anywhere.
 */
export function Hero() {
  return (
    <section className="relative min-h-[76vh] sm:min-h-[86vh] overflow-hidden bg-[var(--color-navy-ink)]">
      {/* Full-bleed image */}
      <Image
        src="/products/welta-hero-white-chikankari.jpg"
        alt="Handcrafted Lucknowi chikankari piece in ivory white, hand-embroidered by master karigars of the Welta atelier in Lucknow"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_top] sm:object-center"
      />

      {/* Overlay — a flat soft layer for baseline contrast, plus a
          left-to-right navy gradient so the copy side stays readable
          while the right of the image breathes. Premium and cinematic,
          not too dark. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-ink)]/75 via-[var(--color-navy-ink)]/25 to-transparent"
      />
      {/* A gentle foot-of-frame darkening to seat the copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--color-navy-ink)]/70 to-transparent"
      />

      {/* Content — center-left, lower third on desktop; comfortably
          padded on mobile so nothing overflows or hides under the
          sticky header. */}
      <Container className="relative z-10 flex min-h-[76vh] sm:min-h-[86vh] items-end sm:items-center pt-24 pb-14 sm:py-24">
        <div className="max-w-[42rem]">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)] mb-5">
            The Welta Edit · Lucknow
          </p>
          <h1 className="text-[34px] leading-[1.06] sm:text-[52px] xl:text-[60px] text-[var(--color-ivory)] tracking-[-0.01em] max-w-[18ch] [text-shadow:0_2px_24px_rgba(13,23,41,0.45)]">
            Hand-stitched chikankari, made for the way you live.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-[46ch] text-[15px] sm:text-[17px] text-[var(--color-ivory)]/85 leading-relaxed">
            Anarkalis, kurta sets and dupattas embroidered by master
            karigars in the old by-lanes of Lucknow.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-7 py-3 min-h-[48px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase bg-[var(--color-ivory)] text-[var(--color-navy-ink)] hover:bg-[var(--color-gold-soft)] hover:text-[var(--color-navy-ink)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-ink)]"
            >
              Shop the atelier
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-[var(--color-ivory)] hover:text-[var(--color-gold-soft)] transition-colors"
            >
              Our craft
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
