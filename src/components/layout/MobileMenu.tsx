"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  // Close on route change is implicit because Link triggers a navigation
  // and the new page re-renders this component fresh. Lock body scroll
  // while the drawer is open so the background doesn't bounce.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center h-10 w-10 text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[var(--color-navy-ink)]/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[var(--color-ivory)] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-line)]">
              <span className="text-[10px] tracking-[0.38em] uppercase text-[var(--color-gold-deep)]">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="h-10 w-10 inline-flex items-center justify-center text-[var(--color-navy-ink)]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-2xl text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[var(--color-line)] space-y-3 text-sm text-[var(--color-muted)]">
                <Link href="/search" onClick={() => setOpen(false)} className="block">
                  Search the atelier
                </Link>
                <Link href="/cart" onClick={() => setOpen(false)} className="block">
                  Your bag
                </Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="block">
                  Contact us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
