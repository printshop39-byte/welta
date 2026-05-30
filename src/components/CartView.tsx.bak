"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, cartStore, cartSubtotal, cartCount } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import type { CartItem } from "@/lib/cart";

// Welta atelier WhatsApp — country code first, no plus sign, no spaces.
// Hardcoded as the safe default so the CTA works out of the box.
// Override via NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local for staging/QA
// without editing source.
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918468900336";

function buildWhatsappUrl(items: CartItem[], subtotal: number): string {
  const lines = items.map((i) => {
    // SKU/Item Code rides in square brackets right after the name when
    // present so the atelier team can pull it from inventory fast.
    const codeTag = i.sku ? ` [${i.sku}]` : "";
    return `• ${i.productName}${codeTag} (${i.variantLabel}) × ${i.qty} — ${formatINR(
      i.unitPrice * i.qty,
    )}`;
  });
  const body = [
    "Hi Welta atelier — I'd like to place an order:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    "",
    "Please share next steps for confirmation and shipping. Thank you!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

export function CartView() {
  const cart = useCart();
  const items = cart.items;
  const subtotal = cartSubtotal(cart);
  const count = cartCount(cart);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Your bag
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          Your bag is currently empty.
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-base text-[var(--color-muted)] leading-relaxed">
          Pieces you love will live here. Browse the atelier to start your bag.
        </p>
        <div className="mt-10 flex justify-center">
          <Button as="link" href="/collections" variant="primary">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
      <div>
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-3">
          Your bag
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[var(--color-navy-ink)] leading-[1.1]">
          {count === 1 ? "1 piece in your bag" : `${count} pieces in your bag`}
        </h1>

        <ul className="mt-10 divide-y divide-[var(--color-line)]">
          {items.map((item) => (
            <LineItem key={item.key} item={item} />
          ))}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-28 bg-[var(--color-ivory-soft)] p-6 sm:p-8">
        <h2 className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold-deep)] mb-5">
          Order summary
        </h2>
        <dl className="space-y-3 text-sm text-[var(--color-charcoal)]">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium">{formatINR(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-[var(--color-muted)]">
            <dt>Shipping</dt>
            <dd>Calculated on confirmation</dd>
          </div>
        </dl>
        <div className="mt-6 pt-5 border-t border-[var(--color-line)] flex justify-between text-base">
          <span className="font-medium text-[var(--color-navy-ink)]">Total</span>
          <span className="font-serif text-xl text-[var(--color-navy-ink)]">
            {formatINR(subtotal)}
          </span>
        </div>

        <a
          href={buildWhatsappUrl(items, subtotal)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-[#25D366] text-white text-[12px] sm:text-sm font-medium tracking-[0.18em] uppercase hover:bg-[#1FB957] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory-soft)]"
        >
          <WhatsAppGlyph />
          Order on WhatsApp
        </a>

        <p className="mt-3 text-[11px] text-[var(--color-muted)] leading-relaxed">
          Tap to open WhatsApp with your order pre-filled. Our atelier team
          will confirm availability, share payment options, and arrange
          shipping within one business day.
        </p>

        <div className="mt-6">
          <Link
            href="/collections"
            className="text-xs uppercase tracking-[0.22em] text-[var(--color-navy)] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            ← Continue shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}

function LineItem({ item }: { item: CartItem }) {
  const lineTotal = item.unitPrice * item.qty;
  return (
    <li className="py-6 flex gap-4 sm:gap-6">
      <Link
        href={`/products/${item.productSlug}`}
        className="block relative w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 bg-[var(--color-cream)] overflow-hidden"
        aria-label={item.productName}
      >
        <Image
          src={item.image.url}
          alt={item.image.alt}
          fill
          sizes="(min-width: 640px) 112px, 96px"
          className="object-cover"
        />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={`/products/${item.productSlug}`} className="block">
              <h3 className="font-serif text-base sm:text-lg text-[var(--color-navy-ink)] leading-snug hover:text-[var(--color-gold-deep)] transition-colors">
                {item.productName}
              </h3>
            </Link>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Size · {item.variantLabel}
            </p>
            {item.sku && (
              <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/80">
                SKU · {item.sku}
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm sm:text-base font-medium text-[var(--color-navy-ink)]">
              {formatINR(lineTotal)}
            </p>
            {item.unitMrp > item.unitPrice && (
              <p className="text-xs text-[var(--color-muted)] line-through">
                {formatINR(item.unitMrp * item.qty)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="inline-flex items-center border border-[var(--color-line)]">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.productName}`}
              onClick={() => cartStore.updateQty(item.key, item.qty - 1)}
              className="w-9 h-9 inline-flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="w-9 text-center text-sm tabular-nums"
            >
              {item.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.productName}`}
              onClick={() => cartStore.updateQty(item.key, item.qty + 1)}
              className="w-9 h-9 inline-flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => cartStore.removeItem(item.key)}
            className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3 1.7.7 2.4.8 3.3.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3c1.5.8 3.2 1.2 5 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.2-.4-4.6-1.2l-.3-.2-3 .8.8-2.9-.2-.3C3.9 15.1 3.5 13.6 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.3-8.5 8.3z" />
    </svg>
  );
}
