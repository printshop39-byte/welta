import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const WHATSAPP = `https://wa.me/918468900336?text=${encodeURIComponent(
  "Hi Welta, I need help with my account or order.",
)}`;

export const metadata: Metadata = {
  title: "My Welta",
  description:
    "Your Welta account — view your wishlist and bag, track an order, and reach the atelier. Order as a guest and get confirmation on WhatsApp and email.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

const TILES = [
  { href: "/wishlist", title: "Wishlist", text: "The pieces you have saved for later." },
  { href: "/cart", title: "Your bag", text: "Review what you are ready to order." },
  { href: "/track-order", title: "Track order", text: "Follow a dispatched parcel to your door." },
  { href: "/contact", title: "Contact the atelier", text: "Questions on sizing, custom fit or care." },
];

export default function AccountPage() {
  return (
    <article className="py-20">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          My Welta
        </p>
        <h1 className="text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          Your account
        </h1>

        <div className="mt-10 space-y-6 text-base sm:text-lg text-[var(--color-charcoal)] leading-relaxed">
          <p>
            You can shop with Welta as a guest — no account needed. Place your
            order in a minute and we will send confirmation and tracking to your
            WhatsApp and email. Member accounts with saved orders are on the
            way.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group border border-[var(--color-line)] p-6 transition-colors hover:border-[var(--color-navy)]"
            >
              <h2 className="text-lg text-[var(--color-navy-ink)] group-hover:text-[var(--color-gold-deep)] transition-colors">
                {tile.title}
              </h2>
              <p className="mt-1 text-[var(--color-charcoal)] leading-relaxed">
                {tile.text}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button as="link" href="/collections" variant="primary">
            Start shopping
          </Button>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase border border-[var(--color-navy)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)]"
          >
            Help on WhatsApp
          </a>
        </div>
      </Container>
    </article>
  );
}
