"use client";

import { drawerStore } from "@/lib/ui-store";
import { CartBadge } from "@/components/layout/CartBadge";

/**
 * Header bag button. Opens the cart drawer instead of navigating to
 * /cart so the customer can review and adjust their bag without leaving
 * the page they're on. The /cart route still exists as a full-page
 * fallback (linked from inside the drawer) for deep-links and no-JS.
 */
export function CartButton() {
  return (
    <button
      type="button"
      aria-label="Open bag"
      onClick={() => drawerStore.open()}
      className="relative inline-flex h-10 w-10 items-center justify-center text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
    >
      <BagIcon />
      <CartBadge />
    </button>
  );
}

function BagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M4 6h12l-1 11H5L4 6z" strokeLinejoin="round" />
      <path d="M7 6V4a3 3 0 016 0v2" strokeLinejoin="round" />
    </svg>
  );
}
