import clsx from "clsx";

/**
 * CSS-class scroll reveals. Elements carry the `.reveal` class; RevealObserver
 * (an IntersectionObserver) adds `.is-inview` when they enter the viewport, and
 * the CSS in globals.css (scoped to `.js-reveal`) animates them in. IO reads the
 * real visual position, so reveals stay reliable under Locomotive's transform —
 * one reveal system, no AOS, no per-element Framer.
 *
 * No "use client" needed — these are pure presentational wrappers.
 */

/** Single element reveal — fades + lifts in once when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={clsx("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Wrapper whose RevealItem children reveal in a staggered cascade (CSS-driven). */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  gap?: number;
  delay?: number;
  className?: string;
}) {
  return <div className={clsx("reveal-group", className)}>{children}</div>;
}

/** Child of RevealGroup (also works standalone) — reveals on scroll. */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("reveal", className)}>{children}</div>;
}
