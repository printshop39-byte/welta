// Barrel — single import surface for wishlist consumers.
export * from "./wishlist-types";
export { wishlistStore, wishlistCount, ensureClientHydrated } from "./wishlist-store";
export { useWishlist, useIsWishlisted } from "./wishlist-hooks";
