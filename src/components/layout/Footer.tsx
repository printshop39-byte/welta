import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const shopLinks = [
  { href: "/collections/anarkali", label: "Anarkali" },
  { href: "/collections/kurta-sets", label: "Kurta Sets" },
  { href: "/collections/sarees", label: "Sarees" },
  { href: "/collections/dupattas", label: "Dupattas" },
  { href: "/collections/men", label: "Men" },
];

const supportLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "/about#care", label: "Care Guide" },
  { href: "/about#shipping", label: "Shipping & Returns" },
];

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 bg-[var(--color-navy-ink)] text-[var(--color-ivory-soft)]">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Welta Chikankari — Home"
              className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-ink)]"
            >
              <Image
                src="/logo.svg"
                alt="Welta Chikankari"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--color-ivory-soft)]/80">
              Handcrafted Lucknowi chikankari, made by master karigars in the
              old by-lanes of Lucknow. Heirloom craft, designed for everyday
              luxury.
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-5">
              Shop
            </h3>
            <ul className="space-y-3 text-sm">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--color-gold-soft)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-5">
              Atelier
            </h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--color-gold-soft)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-[var(--color-ivory)]/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-[var(--color-ivory-soft)]/60">
          <p>
            © {new Date().getFullYear()} Welta Chikankari. All rights reserved.
          </p>
          <p className="tracking-[0.32em] uppercase">Made in Lucknow</p>
        </div>
      </Container>
    </footer>
  );
}
