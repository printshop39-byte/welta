import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Your Welta Chikankari shopping bag.",
};

// Server wrapper keeps the metadata SSR-friendly; CartView is a client
// island that reads the localStorage-backed cart store. During SSR and
// the first client paint, the cart store reports EMPTY, so both renders
// produce identical HTML — no hydration mismatch.
export default function CartPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <CartView />
      </Container>
    </section>
  );
}
