import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StorySection } from "@/components/home/StorySection";
import { FromLucknow } from "@/components/home/FromLucknow";
import { getCollections } from "@/lib/api/collections";
import { getFeaturedProducts } from "@/lib/api/products";

/**
 * Homepage flow (editorial luxury layout):
 *   1. Hero — anchored image + opening editorial copy
 *   2. Shop by category — collection tiles
 *   3. Bestsellers — most-loved pieces this season
 *   4. The craft — atelier story on navy
 *   5. From Lucknow — quiet pull-quote band
 */
export default async function Home() {
  const [collections, featured] = await Promise.all([
    getCollections(),
    getFeaturedProducts(8),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid collections={collections} />
      <FeaturedProducts products={featured} />
      <StorySection />
      <FromLucknow />
    </>
  );
}
