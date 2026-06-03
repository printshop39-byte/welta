import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartButton } from "@/components/layout/CartButton";

const navLinks = [
  { href: "/collections/anarkali", label: "Anarkali" },
  { href: "/collections/kurta-sets", label: "Kurta Sets" },
  { href: "/collections/kurtis", label: "Kurtis" },
  { href: "/collections/sarees", label: "Sarees" },
  { href: "/collections/dupattas", label: "Dupattas" },
  { href: "/collections/men", label: "Men" },
  // Bottoms is intentionally not in the top nav: 7 items still fit
  // comfortably at 1024px+ but 8 starts crowding at the smaller end.
  // The Bottoms collection is fully discoverable via /collections.
  { href: "/collections", label: "All Collections" },
];

/**
 * Header layout
 *   Mobile  : [hamburger] [centered WELTA wordmark] [search] [bag]
 *   Desktop : [WELTA wordmark] [nav] ........... [search] [bag]
 *
 * Wordmark uses the locally-hosted Tenor Sans font via the
 * `.logo-wordmark` utility class declared in globals.css. The class
 * sets font-family, weight, generous tracking, and uppercase — so the
 * markup stays semantic ("WELTA" as natural-case text in the JSX) but
 * always renders as the brand wordmark.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-[70] bg-[var(--color-ivory)]/95 backdrop-blur-md border-b border-[var(--color-line)]">
      {/* Announcement bar */}
      <div className="bg-[var(--color-navy-ink)] text-[var(--color-ivory)] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase">
        <Container className="flex h-8 sm:h-9 items-center justify-center text-center">
          <p>Free shipping across India · Handcrafted in Lucknow</p>
        </Container>
      </div>

      <Container className="relative flex items-center h-14 sm:h-20">
        {/* Left cluster — hamburger (mobile) + wordmark (desktop) + nav (desktop) */}
        <div className="flex items-center gap-2 lg:gap-10">
          <MobileMenu links={navLinks} />
          <Link
            href="/"
            className="hidden lg:inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            aria-label="Welta Chikankari — Home"
          >
            <span className="logo-wordmark text-[20px] text-[var(--color-navy-ink)]">
              Welta
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] xl:text-[13px] tracking-[0.18em] uppercase text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Centered wordmark — mobile only.
            Absolutely positioned so the hamburger + icon cluster don't
            push it off centre. Smaller tracking on mobile so all three
            zones (hamburger / wordmark / icons) fit within ~390px. */}
        <Link
          href="/"
          aria-label="Welta Chikankari — Home"
          className="lg:hidden absolute left-1/2 -translate-x-1/2 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        >
          <span
            className="logo-wordmark text-[16px] text-[var(--color-navy-ink)]"
            style={{ letterSpacing: "0.28em" }}
          >
            Welta
          </span>
        </Link>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2 text-[var(--color-navy-ink)]">
          <Link
            href="/search"
            aria-label="Search"
            className="inline-flex h-10 w-10 items-center justify-center hover:text-[var(--color-gold-deep)] transition-colors"
          >
            <SearchIcon />
          </Link>
          <CartButton />
        </div>
      </Container>
    </header>
  );
}

function SearchIcon() {
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
      <circle cx="9" cy="9" r="6" />
      <path d="M14 14l4 4" strokeLinecap="round" />
    </svg>
  );
}
