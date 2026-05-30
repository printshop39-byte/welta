import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Welta Chikankari for hand-embroidered kurtas, anarkalis, sarees, and dupattas.",
};

type SearchParams = { q?: string };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? await getProducts({ search: query }) : [];

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Search
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy-ink)] leading-tight">
          {query ? `Results for “${query}”` : "Search the atelier"}
        </h1>
        <form action="/search" method="get" className="mt-8 max-w-xl flex">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search anarkalis, sarees, kurtas…"
            className="flex-1 px-5 py-3 bg-[var(--color-ivory-soft)] border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-navy)] text-sm"
          />
          <button
            type="submit"
            className="px-7 py-3 bg-[var(--color-navy)] text-[var(--color-ivory)] text-xs tracking-[0.22em] uppercase hover:bg-[var(--color-navy-ink)] transition-colors"
          >
            Search
          </button>
        </form>
        <div className="mt-14">
          {query && results.length === 0 ? (
            <p className="text-[var(--color-muted)]">
              No pieces matched your search. Try a different keyword.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {results.map((p, i) => (
                // First-row cards are LCP candidates: 2-col grid on mobile
                // and 4-col on desktop. Marking 2 covers the mobile/tablet
                // first row in full; desktop first row keeps 2 lazy which
                // is fine because they're typically not the LCP element.
                <ProductCard key={p.id} product={p} priority={i < 2} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
