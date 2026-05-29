import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ivory-soft)]">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 py-14 sm:py-20 lg:py-24 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-5">
            Atelier Welta · Est. Lucknow
          </p>
          <h1 className="font-serif text-[40px] leading-[1.05] sm:text-5xl lg:text-[56px] xl:text-[64px] text-[var(--color-navy-ink)] max-w-[18ch]">
            Handcrafted Lucknowi Chikankari, made for everyday luxury.
          </h1>
          <p className="mt-6 max-w-lg text-base sm:text-[17px] text-[var(--color-muted)] leading-relaxed">
            Each piece is hand-embroidered by master karigars in the old
            by-lanes of Lucknow — heirloom craft, designed for the way you
            live now.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button as="link" href="/collections" variant="primary">
              Shop the Atelier
            </Button>
            <Button as="link" href="/about" variant="secondary">
              Our Craft
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Stat label="Karigars" value="120+" />
            <Stat label="Years of craft" value="40" />
            <Stat label="Pieces a year" value="5,000" />
          </div>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] w-full mx-auto lg:mx-0 lg:ml-auto lg:max-w-none">
            <div
              className="absolute -inset-3 sm:-inset-4 border border-[var(--color-gold-soft)]/40 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative h-full w-full overflow-hidden bg-[var(--color-cream)]">
              <Image
                src="/products/welta-hero-white-chikankari.jpg"
                alt="Handcrafted Lucknowi chikankari piece in ivory white, hand-embroidered by master karigars of the Welta atelier in Lucknow"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="hidden md:block absolute -bottom-5 -left-5 lg:-bottom-6 lg:-left-6 bg-[var(--color-navy)] text-[var(--color-ivory)] px-5 py-4 lg:px-6 lg:py-5 max-w-[260px] shadow-lg">
              <p className="font-serif text-base lg:text-lg leading-snug">
                &ldquo;Each thread is a quiet act of devotion.&rdquo;
              </p>
              <p className="mt-2 text-[10px] tracking-[0.32em] uppercase text-[var(--color-gold-soft)]">
                — Master Karigar, Chowk Lucknow
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif text-2xl text-[var(--color-navy-ink)]">{value}</p>
      <p className="mt-1 text-[10px] tracking-[0.28em] uppercase text-[var(--color-muted)]">
        {label}
      </p>
    </div>
  );
}
