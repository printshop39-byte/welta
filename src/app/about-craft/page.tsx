import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const WHATSAPP = `https://wa.me/918468900336?text=${encodeURIComponent(
  "Hi Welta, I'd love to know more about your chikankari craft.",
)}`;

export const metadata: Metadata = {
  title: "The Craft",
  description:
    "Inside Welta's Lucknowi chikankari — the wooden frame, the stitches, the fabrics, and the master karigars who hand-embroider every piece in Lucknow.",
  alternates: { canonical: "/about-craft" },
};

export default function AboutCraftPage() {
  return (
    <article className="py-20">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          The craft
        </p>
        <h1 className="text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          Chikankari — patience, made visible.
        </h1>

        <div className="mt-10 space-y-6 text-base sm:text-lg text-[var(--color-charcoal)] leading-relaxed">
          <p>
            Every Welta piece begins on a humble wooden frame in the old
            by-lanes of Lucknow. There is no machine work here — ever. Each
            motif is traced by hand, then hand-embroidered stitch by stitch by
            karigars who learned this craft from their parents, and theirs
            before them.
          </p>
          <p>
            A single anarkali can hold sixty hours of hand-stitching — and four
            hundred years of memory. We let each piece take the time it needs.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl text-[var(--color-navy-ink)] mb-4">
            The process
          </h2>
          <p className="text-[var(--color-charcoal)] leading-relaxed">
            Block-printed motifs guide the karigar&apos;s needle. The fabric is
            stitched, then carefully washed to lift away the printed guidelines
            — leaving only thread. What remains is shadow-soft embroidery that
            looks, by design, as if it grew on the cloth.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl text-[var(--color-navy-ink)] mb-4">
            The stitches
          </h2>
          <p className="text-[var(--color-charcoal)] leading-relaxed">
            Bakhiya shadow work, fine murri and phanda knots, and open jaali
            net-work — over thirty named stitches make up the chikankari
            vocabulary. Our karigars choose them by hand, motif by motif, so no
            two pieces are ever identical.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl text-[var(--color-navy-ink)] mb-4">
            The fabrics
          </h2>
          <p className="text-[var(--color-charcoal)] leading-relaxed">
            Featherlight mul-mul and pure cotton for everyday wear; chanderi,
            georgette and silk for festive pieces. Each cloth is chosen to
            breathe in Indian weather and to carry fine threadwork without
            pulling.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl text-[var(--color-navy-ink)] mb-4">
            The karigars
          </h2>
          <p className="text-[var(--color-charcoal)] leading-relaxed">
            We work directly with over 120 artisans across Lucknow — many
            third- and fourth-generation embroiderers — with fair wages and
            reasonable hours. Slow fashion, made honestly.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button as="link" href="/collections" variant="primary">
            Shop the collection
          </Button>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase border border-[var(--color-navy)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)]"
          >
            Ask on WhatsApp
          </a>
        </div>
      </Container>
    </article>
  );
}
