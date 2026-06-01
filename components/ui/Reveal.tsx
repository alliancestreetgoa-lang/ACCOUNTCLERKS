"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Single element, scroll-LINKED reveal (scrubbed) for a buttery feel. */
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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 55%",
            scrub: 1.2, // smoothing lag — animation eases toward the scrollbar
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref as never} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Tag>
  );
}

/** Staggered, scroll-linked reveal of direct children. */
export function RevealGroup({
  children,
  gap = 0.15,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  gap?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;
    if (prefersReduced()) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 48%", scrub: 1.2 },
      });
      tl.fromTo(
        items,
        { autoAlpha: 0, y: 54 },
        { autoAlpha: 1, y: 0, ease: "power2.out", stagger: gap, delay }
      );
    }, el);
    return () => ctx.revert();
  }, [gap, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Child of RevealGroup — hidden until the group's scrubbed timeline reveals it. */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}
