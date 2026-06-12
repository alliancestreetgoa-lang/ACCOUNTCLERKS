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
  "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/50 before:via-white/10 before:to-transparent before:opacity-90 " +
  // diagonal shine sweep on hover
  "after:pointer-events-none after:absolute after:inset-0 after:-translate-x-[130%] after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,.65)_50%,rgba(220,235,255,.30)_58%,transparent_72%)] after:transition-transform after:duration-[700ms] after:ease-out motion-reduce:after:hidden";

const hoverSweep = "hover:after:translate-x-[130%]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-evergreen-500 to-cyan-600 text-canvas border border-white/25 shadow-[0_10px_30px_-8px_rgba(41,171,226,.55),inset_0_1px_0_rgba(255,255,255,.45)] hover:from-evergreen-600 hover:to-cyan-500 hover:shadow-[0_16px_38px_-8px_rgba(41,171,226,.75),inset_0_1px_0_rgba(255,255,255,.5)] " +
    hoverSweep,
  secondary:
    "bg-[linear-gradient(145deg,rgba(255,255,255,.92)_0%,rgba(218,234,255,.78)_50%,rgba(200,222,255,.68)_100%)] " +
    "text-neutral-800 border border-white " +
    "shadow-[inset_0_2px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(160,200,255,.45),0_8px_28px_-8px_rgba(80,130,220,.22),0_1px_2px_rgba(20,22,15,.05)] " +
    "hover:bg-[linear-gradient(145deg,rgba(255,255,255,1)_0%,rgba(224,238,255,.88)_50%,rgba(210,228,255,.80)_100%)] " +
    "hover:shadow-[inset_0_2px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(160,200,255,.60),0_14px_36px_-8px_rgba(80,130,220,.32),0_1px_3px_rgba(20,22,15,.06)] " +
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
