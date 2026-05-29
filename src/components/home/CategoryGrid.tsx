import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/collection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type CategoryGridProps = {
  collections: Collection[];
};

export function CategoryGrid({ collections }: CategoryGridProps) {
  return (
    <Section
      eyebrow="Shop by craft"
      title="Curated collections"
      description="From floor-length anarkalis to featherlight dupattas — each collection celebrates a distinct facet of Lucknowi chikankari."
      spacing="tight"
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {collections.slice(0, 6).map((c, i) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                <Image
                  src={c.thumbnail}
                  alt={`${c.name} chikankari collection`}
                  fill
                  // Hero is the LCP candidate; first category tile is a
                  // backup. Everything else is lazy so we don't tank LCP.
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-ink)]/75 via-[var(--color-navy-ink)]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[var(--color-ivory)] leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[var(--color-ivory-soft)]/85 line-clamp-1">
                    {c.tagline}
                  </p>
                  <p className="mt-2 sm:mt-3 text-[10px] tracking-[0.32em] uppercase text-[var(--color-gold-soft)] group-hover:text-[var(--color-ivory)] transition-colors">
                    Shop {c.productCount} pieces →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
