"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icons";
import { AreaChart, BarChart } from "@/components/charts/Charts";
import { Button } from "@/components/ui/Button";

const STAGES = [
  {
    n: "01",
    key: "data",
    icon: Icon.list,
    title: "Financial Data Processing",
    sub: "Capture & clean",
    desc: "Every receipt, bank feed, and invoice ingested, categorized, and verified — turning raw transactions into trustworthy data.",
    points: ["Automated bank & card feeds", "Receipt & document capture", "Categorization & validation"],
    accent: "#B07FD0",
  },
  {
    n: "02",
    key: "accounting",
    icon: Icon.ledger,
    title: "Finance & Accounting",
    sub: "Record & reconcile",
    desc: "Clean data becomes a closed set of books — reconciled to the cent, on time, and audit-ready every month.",
    points: ["Daily reconciliation", "Monthly close by the 5th", "Tax-ready statements"],
    accent: "#7A3DA0",
  },
  {
    n: "03",
    key: "analysis",
    icon: Icon.chart,
    title: "Financial Management & Analysis",
    sub: "Understand & decide",
    desc: "Closed books become insight — dashboards, forecasts, and the monthly read that turns numbers into decisions.",
    points: ["KPI dashboards & board packs", "Cashflow & scenario forecasting", "Plain-language recommendations"],
    accent: "#29ABE2",
  },
  {
    n: "04",
    key: "growth",
    icon: Icon.rocket,
    title: "Business Development & Growth",
    sub: "Expand & grow",
    desc: "Insight becomes action — pricing, expansion, fundraising, and the strategic counsel to grow with confidence.",
    points: ["Growth & expansion modeling", "Fundraising & investor reporting", "Strategic CFO partnership"],
    accent: "#D81B7E",
  },
];

function StageVisual({ stageKey, accent }: { stageKey: string; accent: string }) {
  if (stageKey === "data")
    return (
      <div className="grid w-full gap-2">
        {["Stripe payout", "Vendor invoice", "Payroll run", "Card expense"].map((t, i) => (
          <motion.div
            key={t}
            className="flex items-center justify-between rounded-xl border border-[var(--hair-dark)] bg-white/[0.04] px-4 py-3 text-[0.85rem] text-[var(--on-ink-mut)]"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <span>{t}</span>
            <span className="text-evergreen-300">✓ categorized</span>
          </motion.div>
        ))}
      </div>
    );
  if (stageKey === "accounting")
    return (
      <div className="w-full rounded-2xl border border-[var(--hair-dark)] bg-white/[0.04] p-5">
        {[["Operating", "100%"], ["Card", "100%"], ["Savings", "96%"]].map(([k, v], i) => (
          <div key={k} className="mb-3 last:mb-0">
            <div className="mb-1.5 flex justify-between text-[0.8rem] text-[var(--on-ink-mut)]"><span>{k}</span><span>{v}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" style={{ background: accent }} initial={{ width: 0 }} whileInView={{ width: v }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }} />
            </div>
          </div>
        ))}
      </div>
    );
  if (stageKey === "analysis")
    return <div className="w-full rounded-2xl border border-[var(--hair-dark)] bg-white/[0.04] p-5"><AreaChart data={[20, 28, 24, 36, 33, 46, 52, 64]} width={420} height={150} stroke={accent} fill={accent} className="h-[150px] w-full" /></div>;
  return <div className="w-full rounded-2xl border border-[var(--hair-dark)] bg-white/[0.04] p-5"><BarChart data={[{ label: "Y1", value: 40 }, { label: "Y2", value: 62 }, { label: "Y3", value: 84 }, { label: "Y4", value: 100 }]} height={150} color={accent} trackColor="rgba(243,239,229,0.08)" /></div>;
}

export function GrowthJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop: pin + horizontal scrub
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) fillRef.current.style.transform = `scaleX(${self.progress})`;
            setActive(Math.min(STAGES.length - 1, Math.round(self.progress * (STAGES.length - 1))));
          },
        },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-neutral-900 text-[var(--on-ink)]">
      {/* progress bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 bg-white/10">
        <div ref={fillRef} className="h-full origin-left bg-evergreen-300" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* step indicators */}
      <div className="pointer-events-none absolute inset-x-0 top-8 z-20 hidden justify-center gap-8 lg:flex">
        {STAGES.map((s, i) => (
          <span key={s.key} className={`flex items-center gap-2 text-[0.78rem] font-medium transition-colors duration-300 ${i === active ? "text-evergreen-300" : "text-[var(--on-ink-faint)]"}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-full border text-[0.7rem] ${i === active ? "border-evergreen-300 bg-evergreen-500/20" : "border-white/15"}`}>{s.n}</span>
            {s.sub}
          </span>
        ))}
      </div>

      {/* track — horizontal on desktop (pinned scrub), stacked on mobile */}
      <div ref={trackRef} className="flex flex-col lg:h-screen lg:flex-row lg:flex-nowrap">
        {STAGES.map((s) => {
          const IconC = s.icon;
          return (
            <article key={s.key} className="flex w-full shrink-0 items-center py-20 lg:h-screen lg:w-screen lg:py-0">
              <div className="wrap grid w-full items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
                <div>
                  <span className="font-serif text-[clamp(4rem,9vw,7rem)] leading-none" style={{ color: s.accent, opacity: 0.5 }}>{s.n}</span>
                  <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-[var(--hair-dark)] px-3.5 py-1.5 text-[0.78rem] font-medium text-[var(--on-ink-mut)]">
                    <IconC size={16} /> {s.sub}
                  </div>
                  <h3 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.018em]">{s.title}</h3>
                  <p className="mt-4 max-w-[46ch] text-[1.08rem] text-[var(--on-ink-mut)]">{s.desc}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[0.95rem]">
                        <Icon.check size={16} className="text-evergreen-300" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <StageVisual stageKey={s.key} accent={s.accent} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* closing CTA (after the pinned scroll on desktop) */}
      <div className="wrap py-20 text-center">
        <h3 className="mx-auto max-w-[18ch] font-serif text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight">From raw data to real growth — we run the whole journey.</h3>
        <div className="mt-7 flex justify-center gap-3">
          <Button href="/contact" variant="primary">Talk To An Expert</Button>
          <Button href="/financial-management" variant="ghost-dark">See the dashboard</Button>
        </div>
      </div>
    </div>
  );
}
