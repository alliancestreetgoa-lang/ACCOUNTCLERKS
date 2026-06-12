"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ParticleField } from "@/components/sections/ParticleField";
import { wordReveal, stagger } from "@/lib/motion";

const HEADLINE = ["Beyond", "The", "Numbers"];

export function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[76px]"
      style={{
        background:
          "radial-gradient(150% 120% at 85% -5%, rgba(107,46,147,.28) 0%, transparent 55%), radial-gradient(120% 100% at -5% 110%, rgba(41,171,226,.24) 0%, transparent 55%), radial-gradient(80% 70% at 50% 60%, rgba(216,27,126,.07) 0%, transparent 65%), #f7f4fd",
      }}
    >
      {/* Vivid pink/purple/blue particles on light background */}
      <ParticleField className="pointer-events-none absolute inset-0 z-0 h-full w-full" colorScheme="light" />

      <div {...(reduce ? {} : { "data-scroll": true, "data-scroll-speed": 1.4 })} className="wrap relative z-10">
        <motion.div variants={stagger(0.08)} initial={reduce ? "show" : "hidden"} animate="show" className="mx-auto max-w-6xl text-center">
          <motion.span
            variants={wordReveal}
            className="inline-flex items-center gap-[0.6em] text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-600 before:h-px before:w-[26px] before:bg-current before:opacity-50"
          >
            Strategic finance partner
          </motion.span>

          <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.2rem)] font-normal leading-[1.04] tracking-[-0.02em] text-neutral-900 lg:whitespace-nowrap">
            {HEADLINE.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block align-baseline">
                <motion.span
                  variants={wordReveal}
                  className={`inline-block ${i === 0 ? "italic bg-gradient-to-br from-evergreen-500 via-[#D81B7E] to-cyan-500 bg-clip-text pb-[0.24em] pr-[0.12em] text-transparent" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={wordReveal} className="mt-6 mx-auto max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.22rem)] text-neutral-500">
            We provide strategic finance support that helps businesses gain clarity, maintain profitability, and grow with confidence.
          </motion.p>

          <motion.div variants={wordReveal} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary">Start Now</Button>
            <Button href="/services" variant="secondary">Explore our services</Button>
          </motion.div>

          <motion.div variants={wordReveal} className="mx-auto mt-10 flex flex-wrap justify-center gap-9 border-t pt-6" style={{borderColor:'rgba(107,46,147,.18)'}}>
            <Meta value={<AnimatedCounter value={480} suffix="+" />} label="Companies on the books" />
            <Meta value={<AnimatedCounter value={99.8} decimals={1} suffix="%" />} label="Reconciliation accuracy" />
            <Meta value={<AnimatedCounter value={1.2} decimals={1} prefix="$" suffix="B" />} label="Cash flow under management" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
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
