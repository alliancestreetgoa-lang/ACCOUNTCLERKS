"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Wire to your error monitoring (Sentry, etc.) here.
    console.error(error);
  }, [error]);

  return (
    <section
      className="flex min-h-[80svh] items-center justify-center px-6 text-center text-[var(--on-ink)]"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(216,27,126,.18), transparent 55%), linear-gradient(168deg, #1D0F30 0%, #160A24 70%)" }}
    >
      <div className="max-w-[42ch]">
        <h1 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight">Something went off the books.</h1>
        <p className="mt-4 text-[var(--on-ink-mut)]">
          An unexpected error occurred. Try again — and if it persists, our team would still love to hear from you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()} variant="primary">Try again</Button>
          <Button href="/contact" variant="ghost-dark">Talk to an expert</Button>
        </div>
        {error.digest && <p className="mt-6 text-[0.78rem] text-[var(--on-ink-faint)]">Reference: {error.digest}</p>}
      </div>
    </section>
  );
}
