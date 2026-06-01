"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ParticleField } from "@/components/sections/ParticleField";
import { wordReveal, stagger } from "@/lib/motion";

const HEADLINE = ["Beyond", "The", "Numbers"];

export function Hero3D() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -8,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[76px] text-[var(--on-ink)]"
      style={{
        background:
          "radial-gradient(120% 90% at 80% 10%, rgba(107,46,147,.34) 0%, rgba(107,46,147,0) 50%), radial-gradient(90% 70% at 8% 100%, rgba(216,27,126,.14) 0%, rgba(216,27,126,0) 55%), radial-gradient(70% 60% at 95% 80%, rgba(41,171,226,.12) 0%, rgba(41,171,226,0) 55%), linear-gradient(168deg, #1D0F30 0%, #160A24 62%)",
      }}
    >
      {/* Mouse-reactive particle field — full-bleed background layer */}
      <ParticleField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      {/* Copy */}
      <div ref={contentRef} className="wrap relative z-10">
        <motion.div variants={stagger(0.08)} initial={reduce ? "show" : "hidden"} animate="show" className="mx-auto max-w-6xl text-center">
          <motion.span
            variants={wordReveal}
            className="inline-flex items-center gap-[0.6em] text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-300 before:h-px before:w-[26px] before:bg-current before:opacity-50"
          >
            Strategic finance partner
          </motion.span>

          <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.2rem)] font-normal leading-[1.04] tracking-[-0.02em] lg:whitespace-nowrap">
            {HEADLINE.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block pb-[0.12em] align-bottom">
                <motion.span
                  variants={wordReveal}
                  className={`inline-block ${i === 0 ? "italic bg-gradient-to-br from-[#B07FD0] via-[#D81B7E] to-[#29ABE2] bg-clip-text pb-[0.24em] pr-[0.12em] text-transparent" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={wordReveal} className="mt-6 mx-auto max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.22rem)] text-[var(--on-ink-mut)]">
            We provide strategic finance support that helps businesses gain clarity, maintain profitability, and grow with confidence.
          </motion.p>

          <motion.div variants={wordReveal} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary">Talk To An Expert</Button>
            <Button href="/services" variant="ghost-dark">Explore our services</Button>
          </motion.div>

          <motion.div variants={wordReveal} className="mx-auto mt-10 flex flex-wrap justify-center gap-9 border-t border-[var(--hair-dark)] pt-6">
            <Meta value={<AnimatedCounter value={480} suffix="+" />} label="Companies on the books" />
            <Meta value={<AnimatedCounter value={99.8} decimals={1} suffix="%" />} label="Reconciliation accuracy" />
            <Meta value={<AnimatedCounter value={1.2} decimals={1} prefix="$" suffix="B" />} label="Cash flow under management" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Meta({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-[1.65rem] leading-none">{value}</div>
      <div className="mx-auto mt-1.5 max-w-[16ch] text-[0.78rem] text-[var(--on-ink-mut)]">{label}</div>
    </div>
  );
}
