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
  { href: "/about-craft", label: "The Craft" },
  { href: "/contact", label: "Contact" },
  { href: "/size-guide", label: "Size Guide & Custom Fit" },
  { href: "/track-order", label: "Track Order" },
  { href: "/faq", label: "FAQ" },
  { href: "/about#care", label: "Care Guide" },
  { href: "/about#shipping", label: "Shipping & Returns" },
];

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 bg-[var(--color-navy-ink)] text-[var(--color-ivory-soft)]">
      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
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
              Handcrafted Lucknowi chikankari, made by master karigars in the
              old by-lanes of Lucknow. Heirloom craft, designed for everyday
              luxury.
            </p>

            <p className="mt-6 text-[10px] tracking-[0.42em] uppercase text-[var(--color-gold-soft)]">
              Atelier · Alambagh, Lucknow
            </p>
          </div>

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

              <li>
                <div className="welta-social-links mt-5 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/weltaindia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--color-ivory)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCwLoEhawBArOYmkKW4a6Wig"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--color-ivory)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.9v1.8c0 1.9.2 3.7.2 3.7s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.4.2 6.4.2s3.8 0 6.7-.3c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.7v-1.8c0-1.8-.2-3.6-.2-3.6ZM10.1 14.8V8.5l5.8 3.2-5.8 3.1Z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.pinterest.com/weltaindia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--color-ivory)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  >
                    <span className="text-sm font-semibold leading-none">P</span>
                  </a>

                  <a
                    href="https://www.facebook.com/weltaindia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--color-ivory)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M14.2 8.2V6.7c0-.7.5-.9.9-.9h2.3V2.2L14.2 2c-3.5 0-4.3 2.1-4.3 4.3v1.9H7v3.9h2.9V22h4.3v-9.9h2.9l.5-3.9h-3.4Z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-ivory)]/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[11px] text-[var(--color-ivory-soft)]/60">
          <p>© {new Date().getFullYear()} Welta Chikankari. All rights reserved.</p>
          <p className="tracking-[0.42em] uppercase">Made in Lucknow</p>
        </div>
      </Container>
    </footer>
  );
}
