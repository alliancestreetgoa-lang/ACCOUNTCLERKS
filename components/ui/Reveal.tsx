"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Single element revealed on scroll via GSAP ScrollTrigger. */
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
        { autoAlpha: 0, y: 46 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
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

/** Staggered reveal of direct children on scroll. */
export function RevealGroup({
  children,
  gap = 0.12,
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
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: gap,
          delay,
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        }
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

/** Child of RevealGroup — hidden until the group's stagger reveals it. */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}
