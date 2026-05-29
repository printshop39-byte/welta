import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCollections } from "@/lib/api/collections";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse all Welta Chikankari collections — anarkalis, kurta sets, sarees, dupattas, festive edits, and menswear, all hand-embroidered in Lucknow.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();
  return (
    // Inline header (instead of <Section/>) so we can shave the vertical
    // padding that was pushing the first card row below the fold on
    // typical laptop viewports.
    <section className="pt-8 sm:pt-10 pb-16 sm:pb-20">
      <Container>
        <div className="max-w-2xl mb-6 sm:mb-8">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold-deep)] font-medium mb-3">
            The atelier
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[var(--color-navy-ink)] leading-[1.1]">
            All collections
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[var(--color-muted)] leading-relaxed">
            Every collection is a chapter in the Welta Chikankari story —
            explore the full edit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                <Image
                  src={c.thumbnail}
                  alt={`${c.name} collection`}
                  fill
                  // This is a bounded hub page: only ~6 collections total.
                  // Chrome's LCP picker can land on any card depending on
                  // viewport height and zoom (4:5 cards make row-2 cards
                  // partially above the fold on tall displays). Marking
                  // all of them priority is small, removes the warning,
                  // and matches the user intent — they're here to browse
                  // every collection at once. Next.js defaults the rest
                  // of the site to lazy; this page is the deliberate
                  // exception.
                  priority
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-ink)]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--color-ivory)] leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-ivory-soft)]/85">
                    {c.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
