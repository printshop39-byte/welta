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

/**
 * Editorial footer with wordmark branding.
 *
 * Layout
 *   Mobile : brand card top → Shop column → Atelier column → Reach us → bottom bar
 *   Desktop: 12-col grid with brand card (5) + Shop (3) + Atelier (2) + Reach us (2)
 *
 * Every link, email, the WhatsApp link, and the Made-in-Lucknow line
 * from the previous version are preserved. The logo image has been
 * retired in favour of the WELTA wordmark in Tenor Sans (via the
 * `.logo-wordmark` utility class).
 */
export function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 bg-[var(--color-navy-ink)] text-[var(--color-ivory-soft)]">
      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* ─── Brand card ─── */}
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Welta Chikankari — Home"
              className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-ink)]"
            >
              <span className="logo-wordmark text-[28px] sm:text-[32px] text-[var(--color-ivory)]">
                Welta
              </span>
            </Link>
            <p className="mt-2 text-[10px] tracking-[0.42em] uppercase text-[var(--color-gold-soft)]">
              Chikankari
            </p>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[var(--color-ivory-soft)]/80">
              Handcrafted Lucknowi chikankari, made by master karigars in
              the old by-lanes of Lucknow. Heirloom craft, designed for
              everyday luxury.
            </p>
            <p className="mt-6 text-[10px] tracking-[0.42em] uppercase text-[var(--color-gold-soft)]">
              Atelier · Alambagh, Lucknow
            </p>
          </div>

          {/* ─── Shop column ─── */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)] mb-5">
              Shop
            </h3>
            <ul className="space-y-3 text-[14px]">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-ivory-soft)]/85 hover:text-[var(--color-ivory)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Atelier column ─── */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)] mb-5">
              Atelier
            </h3>
            <ul className="space-y-3 text-[14px]">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-ivory-soft)]/85 hover:text-[var(--color-ivory)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Reach us column ─── */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)] mb-5">
              Reach us
            </h3>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href="https://wa.me/918468900336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-ivory-soft)]/85 hover:text-[var(--color-ivory)] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:weltaindia@gmail.com"
                  className="text-[var(--color-ivory-soft)]/85 hover:text-[var(--color-ivory)] transition-colors"
                >
                  weltaindia@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-14 pt-8 border-t border-[var(--color-ivory)]/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[11px] text-[var(--color-ivory-soft)]/60">
          <p>
            © {new Date().getFullYear()} Welta Chikankari. All rights reserved.
          </p>
          <p className="tracking-[0.42em] uppercase">Made in Lucknow</p>
        </div>
      </Container>
    </footer>
  );
}
