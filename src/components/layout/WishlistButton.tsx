"use client";

import Link from "next/link";
import { useWishlist, wishlistCount } from "@/lib/wishlist";

/**
 * Header wishlist link with a live count badge. Navigates to /wishlist.
 *
 * Hydration-safe: the wishlist snapshot is empty on the server and the
 * first client render, so the badge (which is `null` at count 0) renders
 * identically on both — the real count fades in after hydration, exactly
 * like the cart badge.
 */
export function WishlistButton() {
  const wishlist = useWishlist();
  const count = wishlistCount(wishlist);
  return (
    <Link
      href="/wishlist"
      aria-label={
        count > 0 ? `Wishlist, ${count} saved` : "Wishlist"
      }
      className="relative inline-flex h-10 w-10 items-center justify-center text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path
          d="M10 17s-6-3.7-6-8.2A3.3 3.3 0 0 1 10 6a3.3 3.3 0 0 1 6 2.8C16 13.3 10 17 10 17z"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] inline-flex items-center justify-center px-1 rounded-full bg-[var(--color-gold-deep)] text-[var(--color-ivory)] text-[10px] font-medium tabular-nums leading-none"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
