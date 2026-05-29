import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StorySection } from "@/components/home/StorySection";
import { getCollections } from "@/lib/api/collections";
import { getFeaturedProducts } from "@/lib/api/products";

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
    </>
  );
}
