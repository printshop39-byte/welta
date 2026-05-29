import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <>
      <section className="bg-[var(--color-ivory-soft)] py-16 sm:py-20">
        <Container>
          <div className="h-3 w-24 bg-[var(--color-cream)] animate-pulse" />
          <div className="mt-4 h-12 w-2/3 bg-[var(--color-cream)] animate-pulse" />
          <div className="mt-4 h-4 w-1/2 bg-[var(--color-cream)] animate-pulse" />
        </Container>
      </section>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-[var(--color-cream)] animate-pulse" />
                <div className="h-4 w-3/4 bg-[var(--color-cream)] animate-pulse" />
                <div className="h-3 w-1/2 bg-[var(--color-cream)] animate-pulse" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
