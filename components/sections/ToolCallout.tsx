import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Sparkline } from "@/components/charts/Charts";
import { Icon } from "@/components/ui/icons";

/** Promo card for the free Runway Calculator. Drop inside any <Section>. */
export function ToolCallout() {
  return (
    <Reveal>
      <div
        className="relative grid items-center gap-8 overflow-hidden rounded-[28px] border border-[var(--hair-dark)] p-8 text-[var(--on-ink)] shadow-e3 md:grid-cols-[1.15fr_1fr] md:p-10"
        style={{
          background:
            "radial-gradient(90% 120% at 0% 0%, rgba(107,46,147,.45), transparent 55%), radial-gradient(80% 120% at 100% 100%, rgba(41,171,226,.20), transparent 55%), linear-gradient(160deg, #1D0F30, #160A24)",
        }}
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-evergreen-300">
            <Icon.wallet size={14} /> Free tool
          </span>
          <h3 className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-tight">How long does your cash last?</h3>
          <p className="mt-3 max-w-[44ch] text-[var(--on-ink-mut)]">
            Model your cash, burn, and revenue and get your runway in seconds — no signup, nothing stored.
          </p>
          <div className="mt-6">
            <Button href="/tools/runway-calculator" variant="primary">
              Open the Runway Calculator
              <span aria-hidden>→</span>
            </Button>
          </div>
        </div>

        {/* Decorative mini-result */}
        <div className="rounded-[20px] border border-[var(--hair-dark)] bg-black/20 p-6 backdrop-blur-sm" aria-hidden>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.1em] text-[var(--on-ink-faint)]">Estimated runway</div>
              <div className="mt-1 font-serif text-[2.6rem] leading-none">7.6 mo</div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9961F]/20 px-2.5 py-1 text-[0.72rem] font-medium text-[#E0A93A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E0A93A]" /> Caution
            </span>
          </div>
          <div className="mt-4">
            <Sparkline data={[100, 88, 80, 67, 58, 44, 31, 18, 6]} width={300} height={48} stroke="#B07FD0" className="w-full" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
