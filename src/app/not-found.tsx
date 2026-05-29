import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          404 — Not found
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy-ink)] leading-tight">
          This piece is no longer in the atelier.
        </h1>
        <p className="mt-5 text-base text-[var(--color-muted)] leading-relaxed">
          The page you&rsquo;re looking for has moved or sold out. Browse the
          full collection below.
        </p>
        <div className="mt-8 flex justify-center">
          <Button as="link" href="/collections">
            Browse collections
          </Button>
        </div>
      </Container>
    </section>
  );
}
