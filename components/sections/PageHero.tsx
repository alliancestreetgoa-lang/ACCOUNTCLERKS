"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/sections/ParticleField";
import { stagger, wordReveal } from "@/lib/motion";

export function PageHero({
  eyebrow,
  title,
  lead,
  cta,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  cta?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <header
      className="relative overflow-hidden pb-[clamp(56px,9vh,110px)] pt-[clamp(130px,18vh,200px)] text-[var(--on-ink)]"
      style={{
        background:
          "radial-gradient(120% 90% at 85% 0%, rgba(107,46,147,.28) 0%, rgba(107,46,147,0) 50%), radial-gradient(80% 60% at 12% 100%, rgba(41,171,226,.08) 0%, rgba(41,171,226,0) 55%), linear-gradient(168deg, #1D0F30 0%, #160A24 65%)",
      }}
    >
      <ParticleField className="pointer-events-none absolute inset-0 z-0 h-full w-full" density={0.85} />
      <div className="wrap relative z-10">
        <motion.div variants={stagger(0.07)} initial={reduce ? "show" : "hidden"} animate="show" className="mx-auto max-w-5xl text-center">
          <motion.span
            variants={wordReveal}
            className="inline-flex items-center justify-center gap-[0.6em] text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-300 before:h-px before:w-[26px] before:bg-current before:opacity-50"
          >
            {eyebrow}
          </motion.span>
          <motion.h1 variants={wordReveal} className="mt-4 font-serif text-[clamp(2.6rem,6vw,4.8rem)] font-normal leading-[1.04] tracking-[-0.02em]">
            {title}
          </motion.h1>
          {lead && (
            <motion.p variants={wordReveal} className="mx-auto mt-5 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.22rem)] text-[var(--on-ink-mut)]">
              {lead}
            </motion.p>
          )}
          {cta && (
            <motion.div variants={wordReveal} className="mt-8">
              <Button href={cta.href} variant="primary">{cta.label}</Button>
            </motion.div>
          )}
        </motion.div>
        {children}
      </div>
    </header>
  );
}
