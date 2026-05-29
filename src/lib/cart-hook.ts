"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cartStore, ensureClientHydrated } from "./cart-store";
import type { Cart } from "./cart-types";

/**
 * Read-and-subscribe to the cart from a client component.
 *
 * Returns the EMPTY_CART reference during SSR/SSG and during the very
 * first client render (before the post-mount effect runs). After mount,
 * localStorage is read and the real cart is delivered via the
 * subscription, triggering a single re-render. This pattern is the
 * canonical fix for the classic localStorage hydration mismatch.
 */
export function useCart(): Cart {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  useEffect(() => {
    ensureClientHydrated();
  }, []);
  return cart;
}
