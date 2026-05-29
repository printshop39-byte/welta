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

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-ivory)]/95 backdrop-blur-md border-b border-[var(--color-line)]">
      <div className="bg-[var(--color-navy)] text-[var(--color-ivory)] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase">
        <Container className="flex h-8 sm:h-9 items-center justify-center text-center">
          <p>Free shipping across India · Handcrafted in Lucknow</p>
        </Container>
      </div>
      <Container className="flex items-center justify-between h-16 sm:h-20">
        <div className="flex items-center gap-3 lg:gap-10">
          <MobileMenu links={navLinks} />
          <Link
            href="/"
            className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            aria-label="Welta Chikankari — Home"
          >
            {/* Square logomark — sized to fit comfortably inside the
                existing 64px (mobile) / 80px (desktop) header without
                expanding total header height. Width = height because
                logo.svg is 640x641. */}
            <Image
              src="/logo.svg"
              alt="Welta Chikankari"
              width={40}
              height={40}
              priority
              className="w-9 h-9 sm:w-10 sm:h-10"
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
        <div className="flex items-center gap-4 sm:gap-5 text-[var(--color-navy-ink)]">
          <Link
            href="/search"
            aria-label="Search"
            className="hover:text-[var(--color-gold-deep)] transition-colors p-1.5"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hover:text-[var(--color-gold-deep)] transition-colors p-1.5"
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
