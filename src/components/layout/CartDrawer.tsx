"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  useCart,
  cartStore,
  cartSubtotal,
  cartCount,
  type CartItem,
} from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { useDrawerOpen } from "@/lib/ui-hooks";
import { drawerStore } from "@/lib/ui-store";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918468900336";

function buildWhatsappUrl(items: CartItem[], subtotal: number): string {
  const lines = items.map((i) => {
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

/**
 * Slide-in cart drawer mounted once at the app root. Opens from the
 * header bag button (via drawerStore) and from product-card / PDP adds.
 *
 * - Right-side panel on all viewports; full-height and 92% width on
 *   mobile so it's comfortably usable, capped at max-w-md on desktop.
 * - Closes on X, overlay click, and Escape.
 * - Body scroll locked while open.
 * - z-[90]: above the sticky header (z-[70]) and mobile menu (z-[80]).
 *
 * Reuses the existing cartStore + useCart — no second cart system.
 */
export function CartDrawer() {
  const open = useDrawerOpen();
  const cart = useCart();
  const items = cart.items;
  const subtotal = cartSubtotal(cart);
  const count = cartCount(cart);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") drawerStore.close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90]"
      role="dialog"
      aria-modal="true"
      aria-label="Your bag"
    >
      <button
        type="button"
        aria-label="Close bag"
        className="absolute inset-0 bg-[var(--color-navy-ink)]/40"
        onClick={() => drawerStore.close()}
      />
      <div className="absolute right-0 top-0 h-full w-[92%] max-w-md bg-[var(--color-ivory)] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 h-16 border-b border-[var(--color-line)]">
          <span className="text-[10px] tracking-[0.34em] uppercase text-[var(--color-gold-deep)]">
            {count === 1 ? "Your bag · 1 piece" : `Your bag · ${count} pieces`}
          </span>
          <button
            type="button"
            aria-label="Close bag"
            onClick={() => drawerStore.close()}
            className="h-10 w-10 inline-flex items-center justify-center text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p className="text-lg text-[var(--color-navy-ink)]">
              Your bag is empty.
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
              Pieces you love will appear here.
            </p>
            <Link
              href="/collections"
              onClick={() => drawerStore.close()}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 min-h-[44px] bg-[var(--color-navy)] text-[var(--color-ivory)] text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--color-navy-ink)] transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 sm:px-6 divide-y divide-[var(--color-line)]">
              {items.map((item) => (
                <DrawerLine key={item.key} item={item} />
              ))}
            </ul>

            <div className="border-t border-[var(--color-line)] px-5 sm:px-6 py-5 bg-[var(--color-ivory-soft)]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted)] uppercase tracking-[0.18em] text-xs">
                  Subtotal
                </span>
                <span className="text-lg font-medium text-[var(--color-navy-ink)] tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--color-muted)]">
                Shipping calculated on confirmation.
              </p>

              <a
                href={buildWhatsappUrl(items, subtotal)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-[var(--color-navy)] text-[var(--color-ivory)] text-[12px] tracking-[0.2em] uppercase hover:bg-[var(--color-navy-ink)] transition-colors"
              >
                Checkout
              </a>
              <Link
                href="/cart"
                onClick={() => drawerStore.close()}
                className="mt-3 inline-flex w-full items-center justify-center px-6 py-3 min-h-[44px] border border-[var(--color-navy)] text-[var(--color-navy)] text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors"
              >
                View full bag
              </Link>
              <button
                type="button"
                onClick={() => drawerStore.close()}
                className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] hover:text-[var(--color-gold-deep)] transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DrawerLine({ item }: { item: CartItem }) {
  const lineTotal = item.unitPrice * item.qty;
  return (
    <li className="py-4 flex gap-3">
      <div className="relative w-16 h-20 flex-shrink-0 bg-[var(--color-cream)] overflow-hidden">
        <Image
          src={item.image.url}
          alt={item.image.alt}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm text-[var(--color-navy-ink)] leading-snug line-clamp-2">
              {item.productName}
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Size · {item.variantLabel}
            </p>
          </div>
          <p className="text-sm font-medium text-[var(--color-navy-ink)] tabular-nums shrink-0">
            {formatINR(lineTotal)}
          </p>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="inline-flex items-center border border-[var(--color-line)]">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.productName}`}
              onClick={() => cartStore.updateQty(item.key, item.qty - 1)}
              className="w-8 h-8 inline-flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="w-8 text-center text-sm tabular-nums"
            >
              {item.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.productName}`}
              onClick={() => cartStore.updateQty(item.key, item.qty + 1)}
              className="w-8 h-8 inline-flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => cartStore.removeItem(item.key)}
            className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
