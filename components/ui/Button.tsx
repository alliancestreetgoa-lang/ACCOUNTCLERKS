import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "ghost-dark";
type Size = "sm" | "md" | "lg";

// Liquid-glass base: translucent + blur, top sheen (::before), shine sweep (::after).
const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] backdrop-blur-md " +
  "transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out-strong will-change-transform " +
  "active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-evergreen-500 motion-reduce:active:scale-100 " +
  // top specular sheen
  "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:via-transparent before:to-transparent before:opacity-80 " +
  // diagonal shine sweep on hover
  "after:pointer-events-none after:absolute after:inset-0 after:-translate-x-[130%] after:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.35),transparent_70%)] after:transition-transform after:duration-[900ms] after:ease-out motion-reduce:after:hidden";

const hoverSweep = "hover:after:translate-x-[130%]";

const variants: Record<Variant, string> = {
  primary:
    "bg-evergreen-500/85 text-canvas border border-white/25 shadow-[0_10px_30px_-8px_rgba(107,46,147,.65),inset_0_1px_0_rgba(255,255,255,.45)] hover:bg-evergreen-500 hover:shadow-[0_16px_38px_-8px_rgba(107,46,147,.85),inset_0_1px_0_rgba(255,255,255,.5)] " +
    hoverSweep,
  secondary:
    "bg-white/50 text-neutral-900 border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_6px_18px_-6px_rgba(20,22,15,.22)] hover:bg-white/70 " +
    hoverSweep,
  ghost:
    "bg-neutral-900/[0.04] text-neutral-700 border border-neutral-900/10 shadow-[inset_0_1px_0_rgba(255,255,255,.5)] hover:bg-neutral-900/[0.08] hover:border-neutral-900/20 " +
    hoverSweep,
  "ghost-dark":
    "bg-white/10 text-[var(--on-ink)] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_8px_24px_-10px_rgba(0,0,0,.5)] hover:bg-white/[0.18] hover:border-white/40 " +
    hoverSweep,
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-[52px] px-7 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
