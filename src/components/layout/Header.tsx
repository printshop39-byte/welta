import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartBadge } from "@/components/layout/CartBadge";

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
 *   Mobile  : [hamburger] [centered logo] [search] [bag]
 *   Desktop : [logo] [nav] ........... [search] [bag]
 *
 * The mobile centered-logo trick uses absolute positioning so the
 * hamburger and the icon-cluster can sit at the edges without pushing
 * the logo off-axis.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-ivory)]/95 backdrop-blur-md border-b border-[var(--color-line)]">
      {/* Announcement bar */}
      <div className="bg-[var(--color-navy-ink)] text-[var(--color-ivory)] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase">
        <Container className="flex h-8 sm:h-9 items-center justify-center text-center">
          <p>Free shipping across India · Handcrafted in Lucknow</p>
        </Container>
      </div>

      <Container className="relative flex items-center h-14 sm:h-20">
        {/* Left cluster — hamburger (mobile) + logo (desktop) + nav (desktop) */}
        <div className="flex items-center gap-2 lg:gap-10">
          <MobileMenu links={navLinks} />
          <Link
            href="/"
            className="hidden lg:inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            aria-label="Welta Chikankari — Home"
          >
            <Image
              src="/logo.svg"
              alt="Welta Chikankari"
              width={40}
              height={40}
              priority
              className="w-10 h-10"
            />
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

        {/* Centered logo — mobile only.
            Absolutely positioned so the hamburger + icon cluster don't
            push it off centre. Hidden on lg+ because the logo lives
            in the left cluster on desktop. */}
        <Link
          href="/"
          aria-label="Welta Chikankari — Home"
          className="lg:hidden absolute left-1/2 -translate-x-1/2 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        >
          <Image
            src="/logo.svg"
            alt="Welta Chikankari"
            width={36}
            height={36}
            priority
            className="w-9 h-9"
          />
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
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex h-10 w-10 items-center justify-center hover:text-[var(--color-gold-deep)] transition-colors"
          >
            <BagIcon />
            <CartBadge />
          </Link>
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
