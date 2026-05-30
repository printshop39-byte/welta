import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Editorial hero — cinematic on mobile, split on desktop.
 *
 * Mobile (< lg):
 *   The image escapes the Container and runs full viewport width with
 *   a cinematic 72vh height (560px floor / 760px ceiling so very tall
 *   phones don't push the fold). A soft gradient at the foot adds
 *   depth without colouring the copy block that follows. Heading and
 *   CTAs sit BELOW the image, on warm ivory, so legibility is never
 *   tied to overlay contrast.
 *
 * Desktop (lg+):
 *   Classic 5/7 split — copy left, image right — inside the Container
 *   for generous whitespace. The mobile-only full-bleed block is
 *   hidden; the desktop-only split block takes over.
 *
 * Header, SEO metadata, alt text, CTA targets, and the priority Image
 * load are preserved from the previous version.
 */
export function Hero() {
  return (
    <section className="bg-[var(--color-ivory-soft)]">
      {/* ─────────────────────────────────────────────────────────────
          MOBILE — full-bleed cinematic image, then copy below
          Hidden from lg upward.
          ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden">
        <div className="relative w-full h-[72vh] min-h-[560px] max-h-[760px] overflow-hidden bg-[var(--color-cream)]">
          <Image
            src="/products/welta-hero-white-chikankari.jpg"
            alt="Handcrafted Lucknowi chikankari piece in ivory white, hand-embroidered by master karigars of the Welta atelier in Lucknow"
            fill
            priority
            // Responsive sizes hint that matches the actual layout —
            // mobile renders the image full-bleed (100vw), the lg/xl
            // split layouts size the image to the 7-of-12 column
            // (~58-60vw). This silences the Next.js "Image with fill +
            // sizes='100vw' is not rendered at full viewport width"
            // warning at desktop breakpoints.
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          {/* Subtle bottom-up gradient — adds depth but doesn't darken
              the upper portion of the image. Copy is below the image,
              so this overlay is decorative only. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-navy-ink)]/25 via-[var(--color-navy-ink)]/5 to-transparent pointer-events-none"
          />
        </div>

        <Container className="pt-10 pb-14">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[var(--color-gold-deep)] mb-5">
            The Welta Edit · Lucknow
          </p>
          <h1 className="text-[36px] leading-[1.04] sm:text-[44px] text-[var(--color-navy-ink)] tracking-[-0.01em] max-w-[16ch]">
            Hand-stitched chikankari, made for the way you live.
          </h1>
          <p className="mt-5 max-w-[44ch] text-[15px] sm:text-[16px] text-[var(--color-muted)] leading-relaxed">
            Anarkalis, kurta sets and dupattas embroidered by master
            karigars in the old by-lanes of Lucknow — heirloom craft,
            quietly modern.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Button
              as="link"
              href="/collections"
              variant="primary"
              // Belt-and-braces fix: Tailwind !important + inline style.
              // The screenshot showed the dark text persisting even
              // after the !important class — meaning either the CSS
              // bundle was cached or the variant declaration outranked
              // the override. Inline style is the strongest layer the
              // CSS cascade allows short of !important on inline style,
              // and is immune to bundle caching.
              className="bg-[var(--color-navy-ink)] !text-[var(--color-ivory)] hover:bg-[var(--color-navy)] hover:!text-[var(--color-ivory)]"
              style={{ color: "#FBF7EF" }}
            >
              <span
                className="!text-[var(--color-ivory)]"
                style={{ color: "#FBF7EF" }}
              >
                Shop the atelier
              </span>
            </Button>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
            >
              Our craft
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-x-6 text-left border-t border-[var(--color-gold-soft)]/40 pt-6 max-w-md">
            <Stat label="Karigars" value="120+" />
            <Stat label="Years of craft" value="40" />
            <Stat label="Pieces a year" value="5,000" />
          </dl>
        </Container>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP — editorial 5/7 split inside Container
          Hidden below lg.
          ───────────────────────────────────────────────────────────── */}
      <Container className="hidden lg:grid grid-cols-12 gap-16 pt-20 pb-24 items-center">
        <div className="col-span-5">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-deep)] mb-6">
            The Welta Edit · Lucknow
          </p>
          <h1 className="text-[60px] xl:text-[68px] leading-[1.04] text-[var(--color-navy-ink)] tracking-[-0.01em] max-w-[16ch]">
            Hand-stitched chikankari, made for the way you live.
          </h1>
          <p className="mt-6 max-w-[44ch] text-[17px] text-[var(--color-muted)] leading-relaxed">
            Anarkalis, kurta sets and dupattas embroidered by master
            karigars in the old by-lanes of Lucknow — heirloom craft,
            quietly modern.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <Button
              as="link"
              href="/collections"
              variant="primary"
              // Belt-and-braces fix: Tailwind !important + inline style.
              // The screenshot showed the dark text persisting even
              // after the !important class — meaning either the CSS
              // bundle was cached or the variant declaration outranked
              // the override. Inline style is the strongest layer the
              // CSS cascade allows short of !important on inline style,
              // and is immune to bundle caching.
              className="bg-[var(--color-navy-ink)] !text-[var(--color-ivory)] hover:bg-[var(--color-navy)] hover:!text-[var(--color-ivory)]"
              style={{ color: "#FBF7EF" }}
            >
              <span
                className="!text-[var(--color-ivory)]"
                style={{ color: "#FBF7EF" }}
              >
                Shop the atelier
              </span>
            </Button>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.22em] uppercase text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
            >
              Our craft
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-x-6 border-t border-[var(--color-gold-soft)]/40 pt-6 max-w-md">
            <Stat label="Karigars" value="120+" />
            <Stat label="Years of craft" value="40" />
            <Stat label="Pieces a year" value="5,000" />
          </dl>
        </div>

        <div className="col-span-7 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream)]">
            <Image
              src="/products/welta-hero-white-chikankari.jpg"
              alt=""
              fill
              sizes="58vw"
              className="object-cover"
              aria-hidden="true"
            />
          </div>
          <figure className="absolute -bottom-8 -left-8 bg-[var(--color-navy-ink)] text-[var(--color-ivory)] px-7 py-6 max-w-[280px] shadow-[0_24px_60px_-30px_rgba(13,23,41,0.45)]">
            {/* Kalam — handwritten karigar's note. Desktop-only
                (this whole figure is hidden on mobile). */}
            <blockquote className=" text-[20px] leading-snug">
              &ldquo;Each thread, a quiet act of devotion.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-[10px] tracking-[0.32em] uppercase text-[var(--color-gold-soft)] not-not-italic">
              — Master karigar, Chowk Lucknow
            </figcaption>
          </figure>
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
      <dd className="mt-1 text-xl sm:text-2xl text-[var(--color-navy-ink)]">
        {value}
      </dd>
    </div>
  );
}
