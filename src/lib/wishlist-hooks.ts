"use client";

import { useEffect, useSyncExternalStore } from "react";
import { wishlistStore, ensureClientHydrated } from "./wishlist-store";
import type { Wishlist } from "./wishlist-types";

/**
 * Read-and-subscribe to the wishlist. Returns EMPTY_WISHLIST during SSR
 * and the first client render, then the persisted wishlist after the
 * post-mount effect reads localStorage — the canonical no-mismatch
 * pattern (same as useCart).
 */
export function useWishlist(): Wishlist {
  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );
  useEffect(() => {
    ensureClientHydrated();
  }, []);
  return wishlist;
}

/**
 * Whether a given product id is wishlisted. Returns false on the server
 * and first client render (empty snapshot), then the real value after
 * hydration — so the button label settles without a hydration mismatch.
 */
export function useIsWishlisted(id: string): boolean {
  const wishlist = useWishlist();
  return wishlist.items.some((i) => i.id === id);
}
