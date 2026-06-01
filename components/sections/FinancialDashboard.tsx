"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AreaChart, BarChart, DonutGauge } from "@/components/charts/Charts";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { easeOut } from "@/lib/motion";

type TabKey = "cashflow" | "forecast" | "profitability";

const TABS: { key: TabKey; label: string }[] = [
  { key: "cashflow", label: "Cashflow" },
  { key: "forecast", label: "Forecasting" },
  { key: "profitability", label: "Profitability" },
];

const DATA: Record<
  TabKey,
  {
    headline: string;
    value: number; decimals: number; prefix: string; suffix: string;
    delta: string;
    chart: React.ReactNode;
    stats: { k: string; v: React.ReactNode }[];
  }
> = {
  cashflow: {
    headline: "Operating cash flow · TTM",
    value: 1.84, decimals: 2, prefix: "$", suffix: "M", delta: "+18.2%",
    chart: <AreaChart data={[12, 18, 15, 24, 22, 30, 28, 38, 42, 51, 55, 64]} width={560} height={220} className="h-[220px] w-full" />,
    stats: [
      { k: "Inflows", v: <AnimatedCounter value={4.2} decimals={1} prefix="$" suffix="M" /> },
      { k: "Outflows", v: <AnimatedCounter value={2.36} decimals={2} prefix="$" suffix="M" /> },
      { k: "Days cash", v: <AnimatedCounter value={186} /> },
    ],
  },
  forecast: {
    headline: "12-month forecast · base case",
    value: 7.9, decimals: 1, prefix: "$", suffix: "M", delta: "+31% YoY",
    chart: <BarChart data={[{ label: "Q1", value: 48 }, { label: "Q2", value: 62 }, { label: "Q3", value: 78 }, { label: "Q4", value: 100 }]} height={220} />,
    stats: [
      { k: "Runway", v: <AnimatedCounter value={18.4} decimals={1} suffix=" mo" /> },
      { k: "Confidence", v: <AnimatedCounter value={92} suffix="%" /> },
      { k: "Scenarios", v: <AnimatedCounter value={3} /> },
    ],
  },
  profitability: {
    headline: "Gross & net margin",
    value: 68, decimals: 0, prefix: "", suffix: "%", delta: "+8.4 pts",
    chart: (
      <div className="flex h-[220px] items-center justify-center gap-10">
        <DonutGauge value={68} label="gross" color="#B07FD0" trackColor="rgba(243,239,229,0.1)" />
        <DonutGauge value={24} label="net" color="#29ABE2" trackColor="rgba(243,239,229,0.1)" />
      </div>
    ),
    stats: [
      { k: "Gross margin", v: <AnimatedCounter value={68} suffix="%" /> },
      { k: "Net margin", v: <AnimatedCounter value={24} suffix="%" /> },
      { k: "Per-unit", v: <AnimatedCounter value={41.2} decimals={1} prefix="$" /> },
    ],
  },
};

export function FinancialDashboard() {
  const [tab, setTab] = useState<TabKey>("cashflow");
  const reduce = useReducedMotion();
  const d = DATA[tab];

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--hair-dark)] bg-[linear-gradient(165deg,#191c15,#0d0f0b)] shadow-e4">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hair-dark)] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-[0.8rem] text-[var(--on-ink-mut)]">ACCOUNTCLERKS · Live financial dashboard</span>
        </div>
        <div className="flex gap-1 rounded-full border border-[var(--hair-dark)] p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative rounded-full px-4 py-1.5 text-[0.82rem] font-medium transition-colors ${
                tab === t.key ? "text-neutral-900" : "text-[var(--on-ink-mut)] hover:text-[var(--on-ink)]"
              }`}
            >
              {tab === t.key && (
                <motion.span layoutId="dash-pill" className="absolute inset-0 rounded-full bg-evergreen-300" transition={{ duration: 0.3, ease: easeOut }} />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* body */}
      <div className="grid gap-px bg-[var(--hair-dark)] md:grid-cols-[1.6fr_1fr]">
        <div className="bg-[#191c15] p-6">
          <div className="mb-1 text-[0.74rem] uppercase tracking-[0.06em] text-[var(--on-ink-faint)]">{d.headline}</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? { opacity: 1 } : { opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", y: -8 }}
              transition={{ duration: 0.28, ease: easeOut }}
            >
              <div className="flex items-end gap-3">
                <span className="font-serif text-[2.6rem] leading-none text-[var(--on-ink)]">
                  <AnimatedCounter key={tab} value={d.value} decimals={d.decimals} prefix={d.prefix} suffix={d.suffix} />
                </span>
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-evergreen-500/15 px-2 py-0.5 text-[0.78rem] font-medium text-evergreen-300">{d.delta}</span>
              </div>
              <div className="mt-5">{d.chart}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid bg-[#191c15]">
          {d.stats.map((s, i) => (
            <div key={s.k} className={`flex items-center justify-between px-6 py-5 ${i < d.stats.length - 1 ? "border-b border-[var(--hair-dark)]" : ""}`}>
              <span className="text-[0.88rem] text-[var(--on-ink-mut)]">{s.k}</span>
              <span className="font-serif text-[1.4rem] text-[var(--on-ink)]">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
