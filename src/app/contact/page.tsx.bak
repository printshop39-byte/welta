import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Welta Chikankari atelier — for styling help, custom orders, wholesale enquiries, or anything else.",
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Atelier Welta
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          We&rsquo;d love to hear from you.
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
          For styling help, custom orders, wholesale enquiries, or anything
          else — write to us and our atelier team will respond within one
          business day.
        </p>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Client island — controlled form state, WhatsApp handoff
              on submit. Server-rendered shell stays empty, so first
              client paint is identical to SSR. */}
          <ContactForm />
          <aside className="space-y-8 text-sm text-[var(--color-charcoal)]">
            <Block label="Atelier">
              <p>By appointment only</p>
              <p>Alambagh, Lucknow, Uttar Pradesh, India</p>
            </Block>
            <Block label="WhatsApp">
              <p>
                <a
                  href="https://wa.me/918468900336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-gold-deep)] transition-colors"
                >
                  +91 84689 00336
                </a>
              </p>
            </Block>
            <Block label="Email">
              <p>
                <a
                  href="mailto:weltaindia@gmail.com"
                  className="hover:text-[var(--color-gold-deep)] transition-colors"
                >
                  weltaindia@gmail.com
                </a>
              </p>
            </Block>
            <Block label="Hours">
              <p>Mon–Sat · 10:00 — 17:00 IST</p>
            </Block>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--color-line)] pt-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold-deep)] mb-2">
        {label}
      </p>
      <div className="space-y-1 text-[var(--color-charcoal)]">{children}</div>
    </div>
  );
}
