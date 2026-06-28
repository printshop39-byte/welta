import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const WHATSAPP = `https://wa.me/918468900336?text=${encodeURIComponent(
  "Hi Welta, I'd like to track my order. My order number is:",
)}`;

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Track your Welta Chikankari order. Find your tracking link, delivery timelines, and how to reach us on WhatsApp for a quick update.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <article className="py-20">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Track order
        </p>
        <h1 className="text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          Where is my order?
        </h1>

        <div className="mt-10 space-y-6 text-base sm:text-lg text-[var(--color-charcoal)] leading-relaxed">
          <p>
            Once your order is dispatched, we send a tracking link to your
            email and WhatsApp. Use that link to follow your parcel to your
            door.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          <div className="border border-[var(--color-line)] p-6">
            <p className="text-[10px] uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-2">
              Step 1
            </p>
            <h2 className="text-lg text-[var(--color-navy-ink)] mb-1">
              Check your dispatch message
            </h2>
            <p className="text-[var(--color-charcoal)] leading-relaxed">
              Look for the WhatsApp or email from Welta with your courier and
              tracking number. Orders are usually dispatched within 2–4 working
              days.
            </p>
          </div>

          <div className="border border-[var(--color-line)] p-6">
            <p className="text-[10px] uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-2">
              Step 2
            </p>
            <h2 className="text-lg text-[var(--color-navy-ink)] mb-1">
              Follow the tracking link
            </h2>
            <p className="text-[var(--color-charcoal)] leading-relaxed">
              Delivery within India typically takes 4–8 working days depending
              on your location.
            </p>
          </div>

          <div className="border border-[var(--color-line)] p-6">
            <p className="text-[10px] uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-2">
              Step 3
            </p>
            <h2 className="text-lg text-[var(--color-navy-ink)] mb-1">
              Still need help?
            </h2>
            <p className="text-[var(--color-charcoal)] leading-relaxed">
              Message us on WhatsApp with your order number and we will share a
              live update right away.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase bg-[var(--color-navy)] text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-navy-ink)]"
          >
            Track on WhatsApp
          </a>
          <Button as="link" href="/collections" variant="secondary">
            Continue shopping
          </Button>
        </div>
      </Container>
    </article>
  );
}
