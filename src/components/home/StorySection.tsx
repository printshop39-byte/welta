import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function StorySection() {
  return (
    <section className="bg-[var(--color-navy-ink)] text-[var(--color-ivory)] py-24">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] max-w-[520px] bg-[var(--color-cream)] overflow-hidden">
            <Image
              src="/products/welta-hero-white-chikankari.jpg"
              alt="Welta Chikankari karigars hand-embroidering ivory mul in the Lucknow atelier"
              fill
              // Explicit lazy. This image is several scrolls below the
              // fold on the homepage; without an explicit `loading`,
              // Chrome's LCP picker sometimes still considered it a
              // candidate (especially when the Hero finished loading
              // fast enough that the StorySection re-entered the
              // measurement window). No `priority` is passed, so this
              // is the only signal Next needs.
              loading="lazy"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-soft)] mb-5">
            Our atelier
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
            A craft passed down through generations, made for today.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--color-ivory-soft)]/85 leading-relaxed max-w-xl">
            At Welta, every piece begins on a humble wooden frame. We work
            with over 120 karigars across Lucknow — many of them third and
            fourth generation chikankari artisans — to bring you garments
            that honour 400 years of craft, designed for the way you live now.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg">
            <Highlight title="Hand-stitched" detail="No machine work, ever" />
            <Highlight title="Slow fashion" detail="40–90 hours per piece" />
            <Highlight title="Ethically made" detail="Fair wages, fair hours" />
          </div>
          <div className="mt-10">
            <Button as="link" href="/about" variant="secondary" className="border-[var(--color-gold-soft)] text-[var(--color-gold-soft)] hover:bg-[var(--color-gold-soft)] hover:text-[var(--color-navy-ink)]">
              Read our story
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Highlight({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="border-t border-[var(--color-gold-soft)]/30 pt-4">
      <p className="font-serif text-xl text-[var(--color-ivory)]">{title}</p>
      <p className="mt-1 text-xs tracking-[0.18em] uppercase text-[var(--color-ivory-soft)]/65">
        {detail}
      </p>
    </div>
  );
}
