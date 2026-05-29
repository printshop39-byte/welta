import type { Product } from "@/types/product";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/product/ProductCard";

type FeaturedProductsProps = {
  products: Product[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function FeaturedProducts({
  products,
  eyebrow = "The atelier favourites",
  title = "Bestsellers & new arrivals",
  description = "Hand-picked pieces, ready to ship from our Lucknow atelier.",
}: FeaturedProductsProps) {
  return (
    <Section
      eyebrow={eyebrow}
      title={title}
      description={description}
      className="bg-[var(--color-ivory)]"
      spacing="tight"
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((p, i) => (
            // First card carries `priority`: on short viewports (laptop
            // portrait, ~800px tall) the FeaturedProducts row 1 sits
            // partially above the fold, and Chrome's LCP picker can
            // land on the first card image (which is the same
            // ivory-mul-anarkali file referenced from mock data).
            // Marking just card 0 keeps the LCP signal stable without
            // re-eagering the whole grid. Cards 1+ stay lazy via Next's
            // default behaviour — no explicit `loading` prop is passed.
            <ProductCard key={p.id} product={p} priority={i === 0} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
