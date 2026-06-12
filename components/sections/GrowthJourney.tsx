"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    accent: "#8B35D6",
  },
  {
    n: "02",
    key: "accounting",
    icon: Icon.ledger,
    title: "Finance & Accounting",
    sub: "Record & reconcile",
    desc: "Clean data becomes a closed set of books — reconciled to the cent, on time, and audit-ready every month.",
    points: ["Daily reconciliation", "Monthly close by the 5th", "Tax-ready statements"],
    accent: "#6B2E93",
  },
  {
    n: "03",
    key: "analysis",
    icon: Icon.chart,
    title: "Financial Management & Analysis",
    sub: "Understand & decide",
    desc: "Closed books become insight — dashboards, forecasts, and the monthly read that turns numbers into decisions.",
    points: ["KPI dashboards & board packs", "Cashflow & scenario forecasting", "Plain-language recommendations"],
    accent: "#0E9FD8",
  },
  {
    n: "04",
    key: "growth",
    icon: Icon.rocket,
    title: "Business Development & Growth",
    sub: "Expand & grow",
    desc: "Insight becomes action — pricing, expansion, fundraising, and the strategic counsel to grow with confidence.",
    points: ["Growth & expansion modeling", "Fundraising & investor reporting", "Strategic CFO partnership"],
    accent: "#E0187A",
  },
];

function StageVisual({ stageKey, accent }: { stageKey: string; accent: string }) {
  if (stageKey === "data")
    return (
      <div className="grid w-full gap-2">
        {["Stripe payout", "Vendor invoice", "Payroll run", "Card expense"].map((t, i) => (
          <motion.div
            key={t}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/70 px-4 py-3 text-[0.85rem] text-neutral-500"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <span>{t}</span>
            <span className="text-evergreen-500">✓ categorized</span>
          </motion.div>
        ))}
      </div>
    );
  if (stageKey === "accounting")
    return (
      <div className="w-full rounded-2xl border border-neutral-200 bg-white/70 p-5">
        {[["Operating", "100%"], ["Card", "100%"], ["Savings", "96%"]].map(([k, v], i) => (
          <div key={k} className="mb-3 last:mb-0">
            <div className="mb-1.5 flex justify-between text-[0.8rem] text-neutral-500"><span>{k}</span><span>{v}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
              <motion.div className="h-full rounded-full" style={{ background: accent }} initial={{ width: 0 }} whileInView={{ width: v }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }} />
            </div>
          </div>
        ))}
      </div>
    );
  if (stageKey === "analysis")
    return <div className="w-full rounded-2xl border border-neutral-200 bg-white/70 p-5"><AreaChart data={[20, 28, 24, 36, 33, 46, 52, 64]} width={420} height={150} stroke={accent} fill={accent} className="h-[150px] w-full" /></div>;
  return <div className="w-full rounded-2xl border border-neutral-200 bg-white/70 p-5"><BarChart data={[{ label: "Y1", value: 40 }, { label: "Y2", value: 62 }, { label: "Y3", value: 84 }, { label: "Y4", value: 100 }]} height={150} color={accent} trackColor="rgba(20,22,15,0.08)" /></div>;
}

export function GrowthJourney() {
  return (
    <div className="relative text-neutral-900">
      <div className="wrap py-24 lg:py-32">
        {/* vertical journey: a connecting rail + four stages that reveal on scroll */}
        <div className="relative grid gap-20 lg:gap-28">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-evergreen-500/0 via-neutral-300 to-evergreen-500/0 lg:block"
          />
          {STAGES.map((s, i) => (
            <Stage key={s.key} s={s} flip={i % 2 === 1} />
          ))}
        </div>

        {/* closing CTA */}
        <div className="mt-24 text-center">
          <h3 className="mx-auto max-w-[18ch] font-serif text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight">From raw data to real growth — we run the whole journey.</h3>
          <div className="mt-7 flex justify-center gap-3">
            <Button href="/contact" variant="primary">Talk To An Expert</Button>
            <Button href="/financial-management" variant="secondary">See the dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** One journey stage — reveals (fade + lift) once when scrolled into view. */
function Stage({ s, flip }: { s: (typeof STAGES)[number]; flip: boolean }) {
  const reduce = useReducedMotion();
  const IconC = s.icon;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 56 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2"
    >
      <div className={flip ? "lg:order-2" : ""}>
        <span className="font-serif text-[clamp(4rem,9vw,7rem)] leading-none" style={{ color: s.accent }}>{s.n}</span>
        <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-[0.78rem] font-medium text-neutral-500">
          <IconC size={16} /> {s.sub}
        </div>
        <h3 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.018em]">{s.title}</h3>
        <p className="mt-4 max-w-[46ch] text-[1.08rem] text-neutral-500">{s.desc}</p>
        <ul className="mt-6 grid gap-2.5">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-[0.95rem]">
              <Icon.check size={16} className="text-evergreen-500" /> {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={`flex justify-center ${flip ? "lg:order-1" : ""}`}>
        <StageVisual stageKey={s.key} accent={s.accent} />
      </div>
    </motion.article>
  );
}
