import { cn } from "@/lib/utils";
import { ParticleField } from "@/components/sections/ParticleField";
import { Badge } from "@/components/ui/Badge";

/** Dark sections share the hero's gradient + drifting particle backdrop. */
const INK_BG =
  "radial-gradient(100% 90% at 85% 0%, rgba(107,46,147,.30) 0%, rgba(107,46,147,0) 55%), radial-gradient(85% 80% at 8% 100%, rgba(41,171,226,.10) 0%, rgba(41,171,226,0) 55%), radial-gradient(70% 60% at 100% 90%, rgba(216,27,126,.10) 0%, rgba(216,27,126,0) 55%), linear-gradient(168deg, #1D0F30 0%, #160A24 70%)";

/** Light white-purple/blue sections — white base with visible purple + blue radial washes. */
const PURPLE_BG =
  "radial-gradient(130% 90% at 5% 0%, rgba(107,46,147,.13) 0%, transparent 55%), radial-gradient(100% 80% at 95% 100%, rgba(41,171,226,.12) 0%, transparent 50%), radial-gradient(70% 60% at 50% 50%, rgba(216,27,126,.04) 0%, transparent 65%), #ffffff";

/** Alternate purple/blue wash — blue top-right, purple bottom-left for visual variety. */
const PURPLE_BG_ALT =
  "radial-gradient(120% 90% at 95% 5%, rgba(41,171,226,.13) 0%, transparent 55%), radial-gradient(100% 80% at 5% 95%, rgba(107,46,147,.12) 0%, transparent 50%), #ffffff";

/** Section wrapper with surface + vertical rhythm. */
export function Section({
  children,
  surface = "canvas",
  id,
  className,
}: {
  children: React.ReactNode;
  surface?: "canvas" | "cream" | "ink" | "purple" | "purple-alt";
  id?: string;
  className?: string;
}) {
  if (surface === "ink") {
    return (
      <section
        id={id}
        className={cn("relative overflow-hidden py-[clamp(72px,11vh,140px)] text-[var(--on-ink)]", className)}
        style={{ background: INK_BG }}
      >
        <ParticleField className="pointer-events-none absolute inset-0 z-0 h-full w-full" density={0.95} />
        <div className="wrap relative z-10">{children}</div>
      </section>
    );
  }
  if (surface === "purple" || surface === "purple-alt") {
    return (
      <section id={id} className={cn("py-[clamp(72px,11vh,140px)]", className)} style={{ background: surface === "purple-alt" ? PURPLE_BG_ALT : PURPLE_BG }}>
        <div className="wrap">{children}</div>
      </section>
    );
  }
  const surfaces = {
    canvas: "bg-canvas text-neutral-900",
    cream: "bg-cream text-neutral-900",
  } as const;
  return (
    <section id={id} className={cn("py-[clamp(72px,11vh,140px)]", surfaces[surface as "canvas" | "cream"], className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  onDark = false,
  center = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.55em] text-[0.72rem] font-medium uppercase tracking-[0.16em]",
        onDark ? "text-evergreen-300" : "text-evergreen-600",
        center && "justify-center"
      )}
    >
      <Badge className="h-[1.15em] w-[1.15em]" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[60ch]", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow onDark={onDark} center={center}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="mt-3 font-serif text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06] tracking-[-0.018em]">
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 text-[clamp(1.05rem,1.45vw,1.2rem)] max-w-[46ch]",
            center && "mx-auto",
            onDark ? "text-[var(--on-ink-mut)]" : "text-neutral-500"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
