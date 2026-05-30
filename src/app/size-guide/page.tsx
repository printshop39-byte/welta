import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Size Guide & Custom Fit · Welta Chikankari",
  description:
    "Find your Welta Chikankari size, learn how to measure, and request custom plus-size or bespoke Lucknowi chikankari orders from 4XL to 10XL+.",
  alternates: { canonical: "/size-guide" },
  openGraph: {
    title: "Size Guide & Custom Fit · Welta Chikankari",
    description:
      "Heritage luxury without size limits. Standard size chart, body measurement guide, and bespoke plus-size orders from 4XL to 10XL+.",
    type: "website",
  },
};

// Follow the project's existing WhatsApp pattern (see CartView /
// ContactForm). Env var wins; the live atelier number is the fallback.
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918468900336";

const CUSTOM_ORDER_PREFILL = `Namaste Welta Chikankari, I would like help with a Custom Size / Plus Size order.

Full Name:
Product Link / Screenshot:
Standard Size or Custom Size:
Bust:
Waist:
Hips:
Shoulder:
Garment Length:
Sleeve Length:
Arm / Bicep:
Height:
Fit Preference:`;

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  CUSTOM_ORDER_PREFILL,
)}`;

const sizeChart: Array<{
  size: string;
  bust: number;
  waist: number;
  hips: number;
}> = [
  { size: "XS", bust: 34, waist: 28, hips: 36 },
  { size: "S", bust: 36, waist: 30, hips: 38 },
  { size: "M", bust: 38, waist: 32, hips: 40 },
  { size: "L", bust: 40, waist: 34, hips: 42 },
  { size: "XL", bust: 42, waist: 36, hips: 44 },
  { size: "XXL", bust: 44, waist: 38, hips: 46 },
  { size: "3XL", bust: 46, waist: 40, hips: 48 },
  { size: "4XL", bust: 48, waist: 42, hips: 50 },
  { size: "5XL", bust: 50, waist: 44, hips: 52 },
  { size: "6XL", bust: 52, waist: 46, hips: 54 },
  { size: "7XL", bust: 54, waist: 48, hips: 56 },
  { size: "8XL", bust: 56, waist: 50, hips: 58 },
  { size: "9XL", bust: 58, waist: 52, hips: 60 },
  { size: "10XL", bust: 60, waist: 54, hips: 62 },
];

// Sizes >= 4XL are the "bespoke" tier — highlighted in the chart and
// referenced in the custom-order section.
const isExtendedSize = (s: string) =>
  /^\d+XL$/.test(s) && parseInt(s.replace("XL", ""), 10) >= 4;

export default function SizeGuidePage() {
  return (
    <article className="bg-[var(--color-ivory)] text-[var(--color-navy-ink)]">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-20">
        <Container className="max-w-3xl text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-deep)] mb-5">
            The Welta Atelier · Lucknow
          </p>
          <h1 className="text-[34px] leading-[1.05] sm:text-[44px] lg:text-[52px] text-[var(--color-navy-ink)] tracking-[-0.005em]">
            Size Guide &amp; Custom Fit
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-[15px] sm:text-[17px] text-[var(--color-muted)] leading-relaxed">
            At Welta Chikankari, heritage luxury has no size limits.
            Every body deserves elegance, comfort, and the quiet beauty
            of hand-embroidered Lucknowi craft.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-6">
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[48px] bg-[var(--color-navy-ink)] !text-[var(--color-ivory)] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-[var(--color-navy)] hover:!text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
              style={{ color: "#FBF7EF" }}
            >
              <span
                className="!text-[var(--color-ivory)]"
                style={{ color: "#FBF7EF" }}
              >
                Start a custom order on WhatsApp
              </span>
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-[var(--color-navy-ink)] hover:text-[var(--color-gold-deep)] transition-colors"
            >
              Explore collections
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ─────────────── SECTION 1 · HOW TO MEASURE ─────────────── */}
      <section className="bg-[var(--color-ivory-soft)] border-y border-[var(--color-line)]">
        <Container className="py-16 sm:py-20 max-w-4xl">
          <SectionEyebrow>Section 01</SectionEyebrow>
          <SectionHeading>How to measure</SectionHeading>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-base text-[var(--color-muted)] leading-relaxed">
            For the most accurate fit, use a soft measuring tape and
            measure over light clothing. If you are between sizes,
            choose the larger size or request custom sizing.
          </p>
          <ul className="mt-10 space-y-6">
            <Measure
              label="Bust / Chest"
              detail="Measure under the arms at the fullest part of the bust."
            />
            <Measure
              label="Waist"
              detail="Measure around the natural waistline without holding your breath."
            />
            <Measure
              label="Hips"
              detail="Measure around the fullest part of the hips."
            />
            <Measure
              label="Shoulder"
              detail="Measure bone to bone across the back."
            />
            <Measure
              label="Sleeve & Bicep"
              detail="Measure desired sleeve length and upper arm circumference."
            />
            <Measure
              label="Garment Length"
              detail="Measure from shoulder point to desired hem length."
            />
          </ul>
        </Container>
      </section>

      {/* ─────────────── SECTION 2 · STANDARD SIZE CHART ─────────────── */}
      <section>
        <Container className="py-16 sm:py-20 max-w-4xl">
          <SectionEyebrow>Section 02 · General guide</SectionEyebrow>
          <SectionHeading>Standard size chart</SectionHeading>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-base text-[var(--color-muted)] leading-relaxed">
            Measurements are body measurements in inches. Final garment
            ease may vary by silhouette, fabric, embroidery placement,
            and pattern.
          </p>
          {/* Table wrapper — allows horizontal scroll on small screens
              without forcing page-level overflow. */}
          <div className="mt-10 -mx-5 sm:mx-0 overflow-x-auto no-scrollbar">
            <table className="welta-measurement-table min-w-full text-[14px] sm:text-[15px]">
              <thead>
                <tr className="text-left text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold-deep)] border-b border-[var(--color-line)]">
                  <th scope="col" className="px-5 sm:px-6 py-4 font-medium">
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-5 sm:px-6 py-4 font-medium text-right"
                  >
                    Bust
                  </th>
                  <th
                    scope="col"
                    className="px-5 sm:px-6 py-4 font-medium text-right"
                  >
                    Waist
                  </th>
                  <th
                    scope="col"
                    className="px-5 sm:px-6 py-4 font-medium text-right"
                  >
                    Hips
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {sizeChart.map((row) => {
                  const extended = isExtendedSize(row.size);
                  return (
                    <tr
                      key={row.size}
                      className={
                        extended
                          ? "bg-[var(--color-ivory-soft)]/70"
                          : undefined
                      }
                    >
                      <th
                        scope="row"
                        className="px-5 sm:px-6 py-4 font-medium text-[var(--color-navy-ink)] tracking-[0.08em] text-left"
                      >
                        {row.size}
                        {extended && (
                          <span className="ml-2 align-middle inline-block text-[9px] tracking-[0.32em] uppercase text-[var(--color-gold-deep)]">
                            Bespoke
                          </span>
                        )}
                      </th>
                      <td className="px-5 sm:px-6 py-4 text-right text-[var(--color-charcoal)] tabular-nums">
                        {row.bust}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right text-[var(--color-charcoal)] tabular-nums">
                        {row.waist}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right text-[var(--color-charcoal)] tabular-nums">
                        {row.hips}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12px] text-[var(--color-muted)] not-italic">
            Extended sizes (4XL — 10XL) are highlighted in cream and
            crafted as bespoke pieces. See the sections below for
            details.
          </p>
        </Container>
      </section>

      {/* ─────────────── SECTION 3 · CUSTOM & PLUS SIZE INTRO ─────────────── */}
      <section className="bg-[var(--color-navy-ink)] text-[var(--color-ivory)]">
        <Container className="py-16 sm:py-20 max-w-4xl">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)] mb-5">
            Section 03 · Crafted just for you
          </p>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.005em]">
            Custom &amp; plus-size orders
          </h2>
          <div className="mt-8 space-y-5 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed text-[var(--color-ivory-soft)]/90">
            <p>
              At Welta Chikankari, we believe that heritage luxury and
              exquisite craftsmanship should have no size limits. True
              elegance belongs to every body.
            </p>
            <p>
              If our standard size chart does not match your unique
              measurements, or if you require an extended size from 4XL
              to 10XL+, our master artisans can customize a bespoke
              piece tailored exclusively for you.
            </p>
          </div>
        </Container>
      </section>

      {/* ─────────────── SECTION 4 · SILHOUETTE PHILOSOPHY ─────────────── */}
      <section>
        <Container className="py-16 sm:py-20 max-w-5xl">
          <SectionEyebrow>Section 04 · Our philosophy</SectionEyebrow>
          <SectionHeading>Silhouette, scaled with care</SectionHeading>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <PhilosophyCard
              title="No compromise on flare"
              body="Unlike standard mass production, when we scale an anarkali or kurti into a plus size, we do not simply stretch the pattern. Our karigars rebalance the silhouette so the embroidery motifs, fall, and ghera remain graceful."
            />
            <PhilosophyCard
              title="Anatomical proportioning"
              body="We carefully adjust armholes, sleeve widths, shoulder balance, bust ease, and hip allowance so the garment feels comfortable without pulling or tightness."
            />
            <PhilosophyCard
              title="Made-to-measure excellence"
              body="From kurti length and sleeve length to neckline depth and overall fit, we offer thoughtful personalization while preserving the elegance of the original design."
            />
          </div>
        </Container>
      </section>

      {/* ─────────────── SECTION 5 · ORDER POLICY ─────────────── */}
      <section className="bg-[var(--color-ivory-soft)] border-y border-[var(--color-line)]">
        <Container className="py-16 sm:py-20 max-w-4xl">
          <SectionEyebrow>Section 05 · Trust &amp; transparency</SectionEyebrow>
          <SectionHeading>Custom order policy</SectionHeading>
          <dl className="mt-10 space-y-8 sm:space-y-10">
            <PolicyItem
              term="Production time"
              detail="Authentic hand-embroidery takes time. Custom and plus-size garments are created with care and may require 4 to 6 weeks for embroidery, washing, finishing, and tailoring before dispatch."
            />
            <PolicyItem
              term="Accurate measurements"
              detail="Custom garments are made specifically to the measurements provided by the customer. Please double-check all measurements before submitting. Returns or exchanges may not be accepted on custom-made or plus-size bespoke items if incorrect measurements are provided."
            />
            <PolicyItem
              term="Pricing policy"
              detail="Plus sizes from 4XL and above, or heavily modified designs, may carry a nominal customization fee of approximately 10% to 15%, depending on additional fabric, thread-work, embroidery placement, and artisan time."
            />
            <PolicyItem
              term="Order modifications"
              detail="Measurement changes must be submitted within 48 hours of placing the order. After this window, fabric cutting and pattern work may begin."
            />
            <PolicyItem
              term="International buyers"
              detail="International customers are welcome to place custom and plus-size orders. Shipping timelines, customs duties, and local import taxes may vary by destination and are the customer's responsibility unless otherwise stated."
            />
          </dl>
        </Container>
      </section>

      {/* ─────────────── SECTION 6 · HOW TO PLACE A CUSTOM ORDER ─────────────── */}
      <section>
        <Container className="py-16 sm:py-20 max-w-4xl">
          <SectionEyebrow>Section 06</SectionEyebrow>
          <SectionHeading>How to place a custom order</SectionHeading>
          <ol className="mt-10 space-y-10 sm:space-y-12">
            <StepCard step="01" title="Select your product">
              Choose the product you love. If a &ldquo;Custom / Plus
              Size&rdquo; option is available, select it. If not, please
              contact us before placing the order.
            </StepCard>
            <StepCard step="02" title="Share your measurements">
              Send your exact measurements through WhatsApp or email with
              the product link or screenshot.
              <div className="mt-5 bg-[var(--color-ivory-soft)] border border-[var(--color-line)] p-5 sm:p-6">
                <p className="text-[10px] tracking-[0.32em] uppercase text-[var(--color-gold-deep)] mb-4">
                  Measurement form
                </p>
                <ul className="welta-measurement-table space-y-2 text-[14px] text-[var(--color-charcoal)]">
                  <FormLine label="Full Name" />
                  <FormLine label="Product Link / Screenshot" />
                  <FormLine label="Standard Size or Custom Size" />
                  <FormLine label="Bust / Chest" />
                  <FormLine label="Waist" />
                  <FormLine label="Hips" />
                  <FormLine label="Shoulder Width" />
                  <FormLine label="Garment Length" />
                  <FormLine label="Sleeve Length" />
                  <FormLine label="Arm / Bicep Circumference" />
                  <FormLine label="Height" />
                  <FormLine label="Any fit preference" />
                </ul>
              </div>
            </StepCard>
            <StepCard step="03" title="Artisan review & consultation">
              Our team reviews your measurements. If anything needs
              clarification, we will contact you on WhatsApp or email
              before production begins.
            </StepCard>
            <StepCard step="04" title="Crafted for you">
              Once confirmed, your piece enters our artisan workflow:
              fabric allocation, embroidery, washing, finishing,
              tailoring, quality check, and dispatch.
            </StepCard>
          </ol>
        </Container>
      </section>

      {/* ─────────────── SECTION 7 · PREMIUM CTA ─────────────── */}
      <section>
        <Container className="pb-20">
          <div className="bg-[var(--color-navy-ink)] text-[var(--color-ivory)] px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 text-center max-w-4xl mx-auto">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)] mb-5">
              Heritage, in your size
            </p>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.005em]">
              Celebrate your fit with Welta
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-[15px] sm:text-base leading-relaxed text-[var(--color-ivory-soft)]/85">
              Don&rsquo;t let standard sizing limit your style. Let our
              artisans create a heritage piece that fits beautifully and
              feels personal.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-5">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-[#25D366] !text-white text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase hover:bg-[#1FB957] hover:!text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-ink)]"
                style={{ color: "#FFFFFF" }}
              >
                <WhatsAppGlyph />
                <span className="!text-white" style={{ color: "#FFFFFF" }}>
                  Start a custom order on WhatsApp
                </span>
              </a>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-[var(--color-gold-soft)] hover:text-[var(--color-ivory)] transition-colors"
              >
                Explore collections
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────── SECTION 8 · A NOTE FROM THE ATELIER ─────────────── */}
      <section className="bg-[var(--color-ivory-soft)] border-t border-[var(--color-line)]">
        <Container className="py-14 sm:py-16 max-w-3xl">
          <SectionEyebrow>For WhatsApp inquiries</SectionEyebrow>
          <SectionHeading>A note from the atelier</SectionHeading>
          <div className="mt-8 bg-[var(--color-ivory)] border border-[var(--color-line)] p-6 sm:p-8 text-[15px] leading-relaxed text-[var(--color-charcoal)]">
            <p className="text-lg text-[var(--color-navy-ink)] not-italic">
              Namaste from Welta Chikankari.
            </p>
            <p className="mt-4">
              Thank you for reaching out to us. We would love to help
              you find or create your perfect handcrafted outfit.
            </p>
            <p className="mt-4">
              If you are looking for a Custom Size / Plus Size order
              from 4XL to 10XL+, or want a bespoke outfit tailored just
              for you, please share with us:
            </p>
            <ol className="mt-4 list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Your full name</li>
              <li>Product link or screenshot</li>
              <li>Your standard size, or mention &ldquo;Custom Size&rdquo;</li>
              <li>
                Bust, Waist, Hips, Shoulder, Garment Length, Sleeve
                Length, Bicep, and Height
              </li>
            </ol>
            <p className="mt-5">
              Our personal styling assistant will guide you through the
              measurement confirmation.
            </p>
            {/* Handwritten sign-off — Architects Daughter via the
                . utility. Reads as the
                atelier's signature at the foot of a letter. */}
            <p className=" mt-6 text-[18px] sm:text-[20px] text-[var(--color-gold-deep)]">
              Pure heritage. Perfect fit. Team Welta.
            </p>
          </div>
        </Container>
      </section>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────
   Small in-page components — local to this route.
   ────────────────────────────────────────────────────────────── */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold-deep)] mb-4">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.005em] text-[var(--color-navy-ink)]">
      {children}
    </h2>
  );
}

function Measure({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 pb-6 border-b border-[var(--color-line)] last:border-b-0">
      <span className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-gold-deep)] font-medium">
        {label}
      </span>
      <span className="text-[15px] sm:text-base text-[var(--color-charcoal)] leading-relaxed">
        {detail}
      </span>
    </li>
  );
}

function PhilosophyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-[var(--color-ivory-soft)] border border-[var(--color-line)] p-6 sm:p-7 h-full">
      <h3 className="text-[20px] sm:text-[22px] text-[var(--color-navy-ink)] leading-snug">
        {title}
      </h3>
      <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[var(--color-charcoal)]">
        {body}
      </p>
    </div>
  );
}

function PolicyItem({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-8">
      <dt className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-gold-deep)] font-medium">
        {term}
      </dt>
      <dd className="text-[15px] sm:text-base text-[var(--color-charcoal)] leading-relaxed">
        {detail}
      </dd>
    </div>
  );
}

function StepCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[40px_1fr] sm:grid-cols-[80px_1fr] gap-4 sm:gap-8">
      <span className="text-2xl sm:text-3xl text-[var(--color-gold-deep)] tabular-nums">
        {step}
      </span>
      <div>
        <h3 className="text-[20px] sm:text-[24px] text-[var(--color-navy-ink)] leading-snug">
          {title}
        </h3>
        <div className="mt-3 text-[15px] sm:text-base text-[var(--color-charcoal)] leading-relaxed">
          {children}
        </div>
      </div>
    </li>
  );
}

function FormLine({ label }: { label: string }) {
  return (
    <li className="flex items-baseline gap-3">
      <span className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-muted)] min-w-[140px] sm:min-w-[180px]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="flex-1 border-b border-dashed border-[var(--color-line)]"
      />
    </li>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3 1.7.7 2.4.8 3.3.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3c1.5.8 3.2 1.2 5 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.2-.4-4.6-1.2l-.3-.2-3 .8.8-2.9-.2-.3C3.9 15.1 3.5 13.6 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.3-8.5 8.3z" />
    </svg>
  );
}
