import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { AddToBag } from "@/components/product/AddToBag";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import { formatINR, discountPercent } from "@/lib/format";
import { productJsonLd } from "@/lib/jsonld";

type Params = { slug: string };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  const image = product.images[0]?.url;
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · Welta Chikankari`,
      description: product.shortDescription,
      type: "website",
      // metadataBase set in app/layout.tsx turns relative URLs into
      // absolute ones for social previews.
      images: image ? [{ url: image, alt: product.images[0].alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const discount = discountPercent(product.price, product.mrp);
  const related = (await getProducts({ collection: product.collectionSlug }))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = productJsonLd(product);

  return (
    <>
      {/* Product schema for Google rich results. Server-rendered so it
          appears in the initial HTML the crawler sees. */}
      <script
        type="application/ld+json"
        // JSON.stringify is safe here: product fields are
        // server-controlled and Next escapes the script tag content.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <nav className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)] mb-8">
            <Link href="/collections" className="hover:text-[var(--color-gold-deep)]">
              Collections
            </Link>
            <span className="mx-3">/</span>
            <Link
              href={`/collections/${product.collectionSlug}`}
              className="hover:text-[var(--color-gold-deep)]"
            >
              {product.collectionSlug.replace(/-/g, " ")}
            </Link>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="relative aspect-[3/4] bg-[var(--color-cream)] overflow-hidden">
              {product.images[0] && (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-ink)] leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-base text-[var(--color-muted)]">
                {product.shortDescription}
              </p>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-serif text-3xl text-[var(--color-navy-ink)]">
                  {formatINR(product.price)}
                </span>
                {product.mrp > product.price && (
                  <span className="text-base text-[var(--color-muted)] line-through">
                    {formatINR(product.mrp)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-gold-deep)]">
                    Save {discount}%
                  </span>
                )}
              </div>
              {product.sku && (
                <p className="mt-3 text-[11px] tracking-[0.22em] uppercase text-[var(--color-muted)]">
                  SKU · {product.sku}
                </p>
              )}
              {/* Client island — owns size selection, qty, Add to Bag,
                  and the "Coming soon" wishlist feedback. */}
              <AddToBag product={product} />
              <div className="mt-12 space-y-6 text-sm text-[var(--color-charcoal)] leading-relaxed">
                <p>{product.description}</p>
                {product.fabric && (
                  <Detail label="Fabric" value={product.fabric} />
                )}
                {product.craft && <Detail label="Craft" value={product.craft} />}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <Detail
                    label="Care"
                    value={product.careInstructions.join(" · ")}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
      {related.length > 0 && (
        <section className="bg-[var(--color-ivory-soft)] py-16">
          <Container>
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-navy-ink)] mb-10">
              You may also love
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 py-3 border-t border-[var(--color-line)]">
      <span className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}
