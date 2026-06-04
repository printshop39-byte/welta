import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="bg-[var(--color-ivory-soft)] border-b border-[var(--color-line)]">
      <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/products/welta-hero-white-chikankari.jpg"
                alt="Welta Chikankari handcrafted white chikankari outfit"
                fill
                priority
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover object-center"
              />

              <div className="absolute left-4 top-4 bg-[var(--color-ivory)]/90 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-[var(--color-navy-ink)] shadow-sm sm:left-6 sm:top-6">
                Welta Edit
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.48em] text-[var(--color-gold-deep)] sm:text-[11px]">
              The Welta Edit · Lucknow
            </p>

            <h1 className="mt-5 max-w-2xl text-[42px] font-light leading-[1.02] tracking-[-0.04em] text-[var(--color-navy-ink)] sm:text-[64px] lg:text-[70px]">
              Hand-stitched chikankari, made for the way you live.
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-charcoal)]/78 sm:text-[16px]">
              Anarkalis, kurta sets and dupattas embroidered by master karigars in
              the old by-lanes of Lucknow — heirloom craft, quietly modern.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/collections"
                className="inline-flex min-h-12 items-center justify-center bg-[var(--color-navy-ink)] px-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-ivory)] transition hover:bg-[var(--color-navy)] sm:px-9"
              >
                Shop the atelier
              </Link>

              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center px-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-navy-ink)] transition hover:text-[var(--color-gold-deep)]"
              >
                Our craft →
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--color-line)] pt-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.34em] text-[var(--color-gold-deep)]">
                  Karigars
                </p>
                <p className="mt-2 text-[18px] text-[var(--color-navy-ink)]">120+</p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.34em] text-[var(--color-gold-deep)]">
                  Years
                </p>
                <p className="mt-2 text-[18px] text-[var(--color-navy-ink)]">40</p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.34em] text-[var(--color-gold-deep)]">
                  Pieces
                </p>
                <p className="mt-2 text-[18px] text-[var(--color-navy-ink)]">5,000</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
