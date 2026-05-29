import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="py-20">
      <Container>
        <div className="animate-pulse space-y-10">
          <div className="h-12 sm:h-16 w-3/4 bg-[var(--color-cream)]" />
          <div className="h-5 w-1/2 bg-[var(--color-cream)]" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[var(--color-cream)]" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
