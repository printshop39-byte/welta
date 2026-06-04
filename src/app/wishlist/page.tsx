import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "Your saved Welta Chikankari pieces — keep your favourite hand-embroidered Lucknowi kurtas, anarkalis, sarees and dupattas in one place.",
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <WishlistView />
      </Container>
    </section>
  );
}