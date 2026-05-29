import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatINR, discountPercent } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

const badgeLabels: Record<string, string> = {
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited",
  festive: "Festive",
  handcrafted: "Handcrafted",
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const image = product.images[0];
  const discount = discountPercent(product.price, product.mrp);
  const primaryBadge = product.badges[0];

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        aria-label={product.name}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-cream)]">
          {image && (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              // Conditional spread: pass `priority` only when truthy.
              // Non-priority images fall through to Next's default
              // (loading="lazy"), which is what we want. Avoid ever
              // passing both `priority` and `loading` — that's the
              // combination Next 16 warns about.
              {...(priority ? { priority: true } : {})}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
          {primaryBadge && (
            <span className="absolute top-3 left-3 bg-[var(--color-ivory)] text-[var(--color-navy-ink)] text-[10px] tracking-[0.28em] uppercase px-3 py-1.5">
              {badgeLabels[primaryBadge] ?? primaryBadge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-[var(--color-navy)] text-[var(--color-gold-soft)] text-[10px] tracking-[0.28em] uppercase px-3 py-1.5">
              {discount}% Off
            </span>
          )}
        </div>
      </Link>
      <div className="pt-4 sm:pt-5 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <RatingStars value={product.rating} idSeed={product.id} />
          <span>({product.reviewCount})</span>
        </div>
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-serif text-base sm:text-lg lg:text-xl text-[var(--color-navy-ink)] leading-snug line-clamp-2 hover:text-[var(--color-gold-deep)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="flex items-baseline gap-2 sm:gap-3 mt-1">
          <span className="text-sm sm:text-base font-medium text-[var(--color-navy-ink)]">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs sm:text-sm text-[var(--color-muted)] line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>
        {/* mt-auto pins CTA to bottom so cards stay aligned in the grid.
            min-h-[44px] meets iOS tap-target guidance. */}
        <div className="mt-auto pt-4 sm:pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex w-full items-center justify-center border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors text-[11px] sm:text-xs tracking-[0.22em] uppercase min-h-[44px] px-4 py-3"
          >
            Choose Options
          </Link>
        </div>
      </div>
    </article>
  );
}

function RatingStars({ value, idSeed }: { value: number; idSeed: string }) {
  // Deterministic, unique gradient ID per card — keeps this a Server
  // Component (no useId hook) while still avoiding SVG id collisions
  // when multiple half-star cards appear on the same page.
  const gradId = `rating-${idSeed}-half`;
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "full" as const;
    if (i === full && half) return "half" as const;
    return "empty" as const;
  });
  return (
    <span className="inline-flex items-center gap-0.5 text-[var(--color-gold)]">
      {stars.map((kind, i) => (
        <Star key={i} kind={kind} gradId={gradId} />
      ))}
    </span>
  );
}

function Star({
  kind,
  gradId,
}: {
  kind: "full" | "half" | "empty";
  gradId: string;
}) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      {kind === "half" && (
        <defs>
          <linearGradient id={gradId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M6 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9.2 2.8 10.9l.6-3.6L0.8 4.8l3.6-.5L6 1z"
        fill={
          kind === "full"
            ? "currentColor"
            : kind === "half"
            ? `url(#${gradId})`
            : "transparent"
        }
        stroke="currentColor"
        strokeWidth="0.6"
      />
    </svg>
  );
}
