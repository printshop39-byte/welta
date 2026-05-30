"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Welta site error:", error);
  }, [error]);

  return (
    <section className="py-24">
      <Container className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Something went wrong
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy-ink)] leading-tight">
          The atelier needs a moment.
        </h1>
        <p className="mt-5 text-base text-[var(--color-muted)] leading-relaxed">
          We weren&rsquo;t able to load this page. Please try again — and if it
          keeps happening, write to us at weltaindia@gmail.com.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button as="button" onClick={() => reset()}>
            Try again
          </Button>
          <Button as="link" href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </Container>
    </section>
  );
}
