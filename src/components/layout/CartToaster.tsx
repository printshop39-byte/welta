"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useToast } from "@/lib/ui-hooks";
import { toastStore, drawerStore } from "@/lib/ui-store";

/**
 * "Added to bag" toast, mounted once at the app root.
 *
 * - Driven by toastStore; shows the product name when known.
 * - Auto-hides after 3s. The timer is keyed on the toast id (a counter
 *   that only advances inside event handlers), so adding another item
 *   restarts the countdown cleanly. No timers run during render.
 * - Bottom-centre on mobile, top-right on desktop — clear of the sticky
 *   header and the cart drawer.
 * - z-[110]: above everything (header z-[70], menu z-[80], drawer
 *   z-[100]) so confirmation is always visible.
 *
 * Hydration-safe: server + first client render show nothing (toast is
 * null), so SSR HTML matches.
 */
export function CartToaster() {
  const toast = useToast();

  // `toast` is a fresh object on every show (see toastStore.show), so
  // depending on it directly restarts the 3s countdown each add — and
  // keeps react-hooks/exhaustive-deps happy with no disable comment.
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => toastStore.dismiss(), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      className="fixed z-[110] left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:top-24 sm:bottom-auto sm:w-[360px]"
      role="status"
      aria-live="polite"
    >
      <div className="bg-[var(--color-navy-ink)] text-[var(--color-ivory)] shadow-2xl px-5 py-4 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold-soft)] text-[var(--color-gold-soft)]"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] tracking-[0.18em] uppercase text-[var(--color-gold-soft)]">
            {toast.title ?? "Added to bag"}
          </p>
          {toast.productName && (
            <p className="mt-1 text-sm leading-snug line-clamp-2">
              {toast.productName}
            </p>
          )}
          {/* Action row: a custom link action (e.g. View wishlist) when
              the toast carries one, otherwise the default "View bag"
              button that opens the cart drawer. A toast with no action
              (e.g. "Removed from wishlist") shows just the headline. */}
          {toast.actionHref ? (
            <div className="mt-3 flex items-center gap-4">
              <Link
                href={toast.actionHref}
                onClick={() => toastStore.dismiss()}
                className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-ivory)] underline underline-offset-4 hover:text-[var(--color-gold-soft)] transition-colors"
              >
                {toast.actionLabel ?? "View"}
              </Link>
            </div>
          ) : toast.title ? null : (
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  toastStore.dismiss();
                  drawerStore.open();
                }}
                className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-ivory)] underline underline-offset-4 hover:text-[var(--color-gold-soft)] transition-colors"
              >
                View bag
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => toastStore.dismiss()}
          className="shrink-0 -mr-1 -mt-1 h-8 w-8 inline-flex items-center justify-center text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
