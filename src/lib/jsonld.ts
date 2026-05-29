import type { Product } from "@/types/product";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://weltachikankari.in";

/**
 * Build a schema.org `Product` JSON-LD object for a PDP.
 *
 * Schema fields chosen for Google's Merchant rich-results requirements
 * (name, image, description, sku, brand, offers.price, offers.priceCurrency,
 * offers.availability) plus aggregateRating which lifts the rich snippet
 * in search results.
 */
export function productJsonLd(product: Product) {
  const url = `${SITE_URL}/products/${product.slug}`;
  const image = product.images[0]?.url;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  const anyInStock = product.variants.some((v) => v.inStock);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    // Prefer the MyBillBook SKU when present; fall back to the
    // internal id (UUID) for the 8 hand-made products that don't
    // carry an external code.
    sku: product.sku ?? product.id,
    image: absoluteImage,
    url,
    brand: {
      "@type": "Brand",
      name: "Welta Chikankari",
    },
    category: product.collectionSlug,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: product.currency,
      price: product.price.toString(),
      availability: anyInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating.toString(),
            reviewCount: product.reviewCount,
            bestRating: "5",
            worstRating: "1",
          }
        : undefined,
  };
}
