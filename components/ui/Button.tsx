import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "ghost-dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-out-strong will-change-transform " +
  "active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-evergreen-500 " +
  "motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-evergreen-500 text-canvas hover:bg-evergreen-600",
  secondary: "bg-transparent text-neutral-900 border border-neutral-200 hover:border-neutral-900/30",
  ghost: "bg-transparent text-neutral-700 border border-[var(--hair-light)] hover:border-neutral-900/25",
  "ghost-dark":
    "bg-transparent text-[var(--on-ink)] border border-[var(--hair-dark)] hover:border-white/40 hover:bg-white/5",
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
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
