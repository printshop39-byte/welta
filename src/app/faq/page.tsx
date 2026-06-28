import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const WHATSAPP = `https://wa.me/918468900336?text=${encodeURIComponent(
  "Hi Welta, I have a question.",
)}`;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Welta Chikankari — shipping, Cash on Delivery, returns and exchange, sizing and custom fit, fabric care, and payments.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "Is the chikankari really hand-embroidered?",
    a: "Yes. Every piece is hand-stitched by karigars in Lucknow — no machine work, ever. Slight variations in motif and finish are the natural signature of handwork, not defects.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders are dispatched within 2–4 working days and usually delivered within 4–8 working days across India. Shipping within India is complimentary; international shipping is available at checkout.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes, COD is available across most pin codes in India. Prepaid options (UPI, cards, netbanking) are also available at checkout.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "Easy 7-day returns and exchanges on unworn pieces with original tags intact. Write to us or message us on WhatsApp with your order number to begin.",
  },
  {
    q: "How do I choose the right size?",
    a: "Our Size Guide has detailed measurements for every silhouette. If you are between sizes or would like a custom fit, message us on WhatsApp before ordering and we will help.",
  },
  {
    q: "How do I care for my chikankari?",
    a: "Dry-clean only, or gently hand-wash in cold water with a mild detergent. Iron on reverse on a low setting and store flat in a muslin cloth, away from direct sunlight.",
  },
  {
    q: "Can I order a custom or bridal piece?",
    a: "Yes. For custom colours, sizing or bridal commissions, reach us on WhatsApp and our atelier team will guide you through it.",
  },
];

export default function FaqPage() {
  return (
    <article className="py-20">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          FAQ
        </p>
        <h1 className="text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          Frequently asked questions
        </h1>

        <div className="mt-12 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg text-[var(--color-navy-ink)]">
                {item.q}
                <span className="text-[var(--color-gold-deep)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[var(--color-charcoal)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase bg-[var(--color-navy)] text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-navy-ink)]"
          >
            Still have a question? WhatsApp us
          </a>
          <Button as="link" href="/collections" variant="secondary">
            Shop the collection
          </Button>
        </div>
      </Container>
    </article>
  );
}
