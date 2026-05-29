import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Welta Chikankari is a Lucknow-based atelier reviving 400 years of hand-embroidered chikankari craft. Read our story, meet our karigars.",
};

export default function AboutPage() {
  return (
    <article className="py-20">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Our story
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          400 years of chikankari, made for the way you live now.
        </h1>
        <div className="mt-10 space-y-6 text-base sm:text-lg text-[var(--color-charcoal)] leading-relaxed">
          <p>
            Welta Chikankari was founded with one quiet conviction — that the
            slow, deliberate craft of Lucknowi chikankari deserves a place in
            modern wardrobes. Every piece we make begins on a small wooden
            frame in the by-lanes of Chowk, where master karigars stitch by
            daylight and memory.
          </p>
          <p>
            We work directly with over 120 artisans — many of them third- and
            fourth-generation chikankari embroiderers — paying fair wages,
            offering fair hours, and giving each piece the time it needs.
            Nothing here is rushed. A single anarkali can take 60 to 90 hours
            of hand-stitching.
          </p>
          <p>
            From featherlight mul dupattas to bridal anarkalis, every Welta
            piece carries the same promise: heirloom craft, designed for
            everyday luxury.
          </p>
        </div>
        <div id="care" className="mt-16">
          <h2 className="font-serif text-2xl text-[var(--color-navy-ink)] mb-4">
            Care
          </h2>
          <p className="text-[var(--color-charcoal)] leading-relaxed">
            Dry-clean only. Iron on reverse on a low setting. Store flat in a
            muslin cloth, away from direct sunlight. Treated with care, a
            Welta piece will live with you for decades.
          </p>
        </div>
        <div id="shipping" className="mt-12">
          <h2 className="font-serif text-2xl text-[var(--color-navy-ink)] mb-4">
            Shipping & Returns
          </h2>
          <p className="text-[var(--color-charcoal)] leading-relaxed">
            Complimentary shipping across India. International shipping
            available at checkout. Easy 7-day returns on unworn pieces with
            original tags.
          </p>
        </div>
      </Container>
    </article>
  );
}
