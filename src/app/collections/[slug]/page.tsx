import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { getCollectionBySlug, getCollections } from "@/lib/api/collections";
import { getProducts } from "@/lib/api/products";

type Params = { slug: string };

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} · Welta Chikankari`,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();
  const products = await getProducts({ collection: slug });

  return (
    <>
      <section className="bg-[var(--color-ivory-soft)] py-16 sm:py-20">
        <Container>
          <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
            Collection
          </p>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[var(--color-navy-ink)] leading-tight max-w-3xl">
            {collection.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            {collection.description}
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          {products.length === 0 ? (
            <p className="text-center text-[var(--color-muted)] py-16">
              Pieces for this collection are coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((p, i) => (
                // Only the first card is the LCP candidate above the fold.
                // Marking 4 cards `priority` was costing LCP budget and
                // triggering a Next.js warning.
                <ProductCard key={p.id} product={p} priority={i === 0} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
