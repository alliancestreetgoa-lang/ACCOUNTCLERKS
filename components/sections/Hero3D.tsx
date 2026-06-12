"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ParticleField } from "@/components/sections/ParticleField";
import { stagger } from "@/lib/motion";

const HEADLINE = ["Beyond", "The", "Numbers"];

// Hero entrance: y-slide only — no opacity hidden state so content is
// always readable even if Framer Motion stalls. GSAP exit handles fade-out.
const heroReveal = {
  hidden: { y: "0.5em" },
  show: { y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <section id="hero-section" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[76px]">
      {/* Particles — separate scroll layer, moves slightly slower */}
      <div {...(reduce ? {} : { "data-scroll": true, "data-scroll-speed": "0.6" })} className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <ParticleField className="h-full w-full" colorScheme="light" />
      </div>

      <div id="hero-content" {...(reduce ? {} : { "data-scroll": true, "data-scroll-speed": "1.4" })} className="wrap relative z-10">
        <motion.div variants={stagger(0.08)} initial={reduce ? "show" : "hidden"} animate="show" className="mx-auto max-w-6xl text-center">

          <motion.span
            id="hero-eyebrow"
            variants={heroReveal}
            className="inline-flex items-center gap-[0.6em] text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-600 before:h-px before:w-[26px] before:bg-current before:opacity-50"
          >
            Strategic finance partner
          </motion.span>

          <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.2rem)] font-normal leading-[1.04] tracking-[-0.02em] text-neutral-900 lg:whitespace-nowrap">
            {HEADLINE.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block align-baseline">
                <motion.span
                  id={`hw-${i}`}
                  variants={heroReveal}
                  className={`inline-block ${i === 0 ? "hero-gradient-text italic pb-[0.24em] pr-[0.12em]" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p id="hero-sub" variants={heroReveal} className="mt-6 mx-auto max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.22rem)] text-neutral-500">
            We provide strategic finance support that helps businesses gain clarity, maintain profitability, and grow with confidence.
          </motion.p>

          <motion.div id="hero-cta" variants={heroReveal} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary">Talk To An Expert</Button>
            <Button href="/services" variant="secondary">Explore our services</Button>
          </motion.div>

          <motion.div id="hero-stats" variants={heroReveal} className="mx-auto mt-10 flex flex-wrap justify-center gap-9 border-t pt-6" style={{borderColor:'rgba(107,46,147,.18)'}}>
            <Meta value={<AnimatedCounter value={480} suffix="+" />} label="Companies on the books" />
            <Meta value={<AnimatedCounter value={99.8} decimals={1} suffix="%" />} label="Reconciliation accuracy" />
            <Meta value={<AnimatedCounter value={1.2} decimals={1} prefix="$" suffix="B" />} label="Cash flow under management" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-400"
      >
        <span className="text-[0.68rem] uppercase tracking-[0.22em]">Scroll</span>
        <span className="block h-9 w-px overflow-hidden" style={{background:'rgba(107,46,147,.2)'}}>
          <motion.span
            className="block h-1/2 w-px bg-evergreen-500"
            animate={reduce ? {} : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Meta({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-[1.65rem] leading-none text-neutral-900">{value}</div>
      <div className="mx-auto mt-1.5 max-w-[16ch] text-[0.78rem] text-neutral-500">{label}</div>
    </div>
  );
}
