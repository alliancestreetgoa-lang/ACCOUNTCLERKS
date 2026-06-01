import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section
      className="flex min-h-[80svh] items-center justify-center px-6 text-center text-[var(--on-ink)]"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(107,46,147,.28), transparent 55%), linear-gradient(168deg, #1D0F30 0%, #160A24 70%)" }}
    >
      <div className="max-w-[40ch]">
        <div className="font-serif text-[clamp(5rem,16vw,9rem)] leading-none text-evergreen-300">404</div>
        <h1 className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">This page didn't reconcile.</h1>
        <p className="mt-4 text-[var(--on-ink-mut)]">
          The page you're after doesn't exist or has moved. Let's get you back to something that balances.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">Back home</Button>
          <Button href="/resources" variant="ghost-dark">Browse resources</Button>
        </div>
      </div>
    </section>
  );
}
