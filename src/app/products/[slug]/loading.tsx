import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="h-3 w-40 bg-[var(--color-cream)] animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-[3/4] bg-[var(--color-cream)] animate-pulse" />
          <div className="space-y-5">
            <div className="h-10 w-3/4 bg-[var(--color-cream)] animate-pulse" />
            <div className="h-4 w-1/2 bg-[var(--color-cream)] animate-pulse" />
            <div className="h-8 w-1/3 bg-[var(--color-cream)] animate-pulse" />
            <div className="h-12 w-full bg-[var(--color-cream)] animate-pulse mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
