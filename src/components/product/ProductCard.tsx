import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatINR } from "@/lib/format";
import { ProductCardActions } from "@/components/product/ProductCardActions";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

/**
 * Premium fashion-grid card.
 *
 * Design choices:
 *  - 4:5 portrait image — the standard for luxury fashion grids.
 *  - One subtle brand-context badge (top-left) when present. The
 *    percent-off pill has been retired from the card — it reads cheap
 *    on a placeholder-heavy catalog. Discount still appears on the PDP.
 *  - Rating stars removed from the card; they belong on the PDP where
 *    the customer is in a buying mindset. Cards stay calm.
 *  - Single line for price + MRP. No "Choose Options" CTA button — the
 *    whole card is the affordance. A small "View piece" link reveals on
 *    hover (desktop) and is always visible on mobile via screen-reader
 *    text plus a subtle arrow.
 *  - Card is one anchor: the title, image, and "view piece" link all
 *    point at the same PDP. No nested links.
 */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  const image = product.images[0];
  const primaryBadge = product.badges[0];
  const badgeLabel = primaryBadge ? BADGE_LABEL[primaryBadge] : null;
  const hasDiscount = product.mrp > product.price;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        aria-label={product.name}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
          {image && (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              {...(priority ? { priority: true } : {})}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
            />
          )}
          {badgeLabel && (
            <span className="absolute top-3 left-3 bg-[var(--color-ivory)]/95 backdrop-blur-sm text-[var(--color-navy-ink)] text-[9px] sm:text-[10px] tracking-[0.3em] uppercase px-2.5 py-1">
              {badgeLabel}
            </span>
          )}
        </div>

        <div className="pt-4 sm:pt-5 flex flex-col gap-2">
          <h3 className="text-[15px] sm:text-base lg:text-lg text-[var(--color-navy-ink)] leading-snug line-clamp-2 group-hover:text-[var(--color-gold-deep)] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] sm:text-sm font-medium text-[var(--color-navy-ink)] tabular-nums">
              {formatINR(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] sm:text-xs text-[var(--color-muted)] line-through tabular-nums">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick-buy: sizes, colour, compact Add to bag. Lives outside the
          card <Link> so there are no nested interactive elements. */}
      <ProductCardActions product={product} />

      {/* "View piece" — secondary route to the full PDP. Always present
          for screen readers, gentle hover cue for sighted users. Sits at
          the bottom so cards in a row stay aligned. */}
      <Link
        href={`/products/${product.slug}`}
        className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[var(--color-muted)] hover:text-[var(--color-navy-ink)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        aria-label={`View ${product.name}`}
      >
        View piece
        <span aria-hidden="true" className="translate-x-0 hover:translate-x-1 transition-transform">→</span>
      </Link>
    </article>
  );
}

const BADGE_LABEL: Record<string, string> = {
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited",
  festive: "Festive",
  handcrafted: "Handcrafted",
};
