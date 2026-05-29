"use client";

import { useCart, cartCount } from "@/lib/cart";

/**
 * Small numeric pill rendered over the header bag icon.
 *
 * Server snapshot returns an empty cart, so SSR HTML renders nothing
 * (the badge is `null`). On the client, after the post-mount effect
 * hydrates from localStorage, the real count fades in. Because the
 * server render and the first client render produce IDENTICAL DOM
 * (nothing), there is no hydration mismatch — we add the badge in a
 * second commit after hydration.
 */
export function CartBadge() {
  const cart = useCart();
  const count = cartCount(cart);
  if (count <= 0) return null;
  return (
    <span
      aria-label={`${count} item${count === 1 ? "" : "s"} in bag`}
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] inline-flex items-center justify-center px-1 rounded-full bg-[var(--color-gold-deep)] text-[var(--color-ivory)] text-[10px] font-medium tabular-nums leading-none"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
