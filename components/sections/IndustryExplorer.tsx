"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { easeOut, stagger, staggerItem } from "@/lib/motion";

type Industry = {
  key: string;
  name: string;
  icon: (p: { size?: number; className?: string }) => React.ReactElement;
  tagline: string;
  pains: string[];
  solutions: string[];
  benefits: string[];
  story: { metric: string; title: string; note: string };
};

const INDUSTRIES: Industry[] = [
  {
    key: "entrepreneurs",
    name: "Entrepreneurs",
    icon: Icon.compass,
    tagline: "You are the finance department — until you're not.",
    pains: ["Books done at midnight, badly", "No view of what you can actually pay yourself", "Tax season is a yearly panic"],
    solutions: ["Done-for-you bookkeeping from day one", "Owner-pay & tax set-aside planning", "Quarterly check-ins with a real advisor"],
    benefits: ["Hours back every week", "Confidence in every number", "Never surprised by a tax bill"],
    story: { metric: "12 hrs", title: "Reclaimed weekly", note: "a solo founder handed off the books and got their evenings back." },
  },
  {
    key: "startups",
    name: "Startups",
    icon: Icon.rocket,
    tagline: "Investor-ready, before the investor asks.",
    pains: ["Diligence finds messy books", "No reliable runway or burn number", "Board wants metrics you can't produce"],
    solutions: ["GAAP-clean books & data room", "Burn, runway & cohort reporting", "Board packs and investor updates"],
    benefits: ["Faster, cleaner raises", "Runway you can trust weekly", "Metrics that survive scrutiny"],
    story: { metric: "−31 days", title: "To monthly close", note: "a Series A SaaS company went from 6 weeks late to closed by the 5th." },
  },
  {
    key: "ecommerce",
    name: "E-Commerce",
    icon: Icon.cart,
    tagline: "True margin, untangled from the payout noise.",
    pains: ["Stripe/Shopify fees blur real margin", "Inventory & COGS never reconcile", "Multi-channel chaos at tax time"],
    solutions: ["Channel-level reconciliation", "Inventory & COGS tracking", "Sales-tax nexus handling"],
    benefits: ["Margin clarity per channel", "Accurate COGS & profit", "Calm, compliant tax filing"],
    story: { metric: "+8.4 pts", title: "Gross margin uncovered", note: "after reconciling four sales channels to actual payouts." },
  },
  {
    key: "retail",
    name: "Retail",
    icon: Icon.store,
    tagline: "Every location, on one clean ledger.",
    pains: ["Per-store performance is a guess", "POS data never matches the bank", "Cash handling & shrinkage blind spots"],
    solutions: ["Multi-location P&L", "POS-to-bank reconciliation", "Cash & inventory controls"],
    benefits: ["Know your best & worst stores", "Reconciled daily takings", "Tighter cash control"],
    story: { metric: "3→1", title: "Days to reconcile", note: "a 5-store retailer cut close time after POS integration." },
  },
  {
    key: "automotive",
    name: "Automotive",
    icon: Icon.car,
    tagline: "Built for dealerships, workshops, and fleets.",
    pains: ["Parts, service & sales blur together", "Floor-plan financing is hard to track", "Job-level profit is invisible"],
    solutions: ["Department-level accounting", "Floor-plan & asset tracking", "Job & technician profitability"],
    benefits: ["Clear department margins", "Financing under control", "Profit per job, visible"],
    story: { metric: "+22%", title: "Service margin", note: "after job-level profitability reporting for a workshop group." },
  },
  {
    key: "international",
    name: "International Markets",
    icon: Icon.globe,
    tagline: "Multi-entity, multi-currency, one source of truth.",
    pains: ["FX gains/losses misreported", "Consolidation across entities is manual", "Compliance differs in every market"],
    solutions: ["Multi-currency bookkeeping", "Group consolidation & eliminations", "Local-compliance coordination"],
    benefits: ["Accurate FX & consolidation", "One group-level view", "Compliant in every market"],
    story: { metric: "4 entities", title: "Consolidated monthly", note: "a cross-border group closed group accounts in one cycle." },
  },
];

function Column({ title, items, tone }: { title: string; items: string[]; tone: "pain" | "sol" | "ben" }) {
  const dot = tone === "pain" ? "bg-signal-error" : tone === "sol" ? "bg-evergreen-500" : "bg-brass-400";
  return (
    <motion.div variants={staggerItem}>
      <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-neutral-400">{title}</div>
      <ul className="grid gap-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-[0.95rem] text-neutral-700">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const ind = INDUSTRIES[active];
  const ActiveIcon = ind.icon;

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Industry list */}
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {INDUSTRIES.map((it, i) => {
          const IconC = it.icon;
          const on = i === active;
          return (
            <button
              key={it.key}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left backdrop-blur-md transition-[background-color,border-color,transform] duration-200 ease-out-strong lg:w-full ${
                on
                  ? "border-white/25 bg-evergreen-500/85 text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_10px_24px_-10px_rgba(107,46,147,.6)]"
                  : "glass-card text-neutral-700 hover:bg-white/75"
              }`}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${on ? "bg-white/25 text-canvas" : "bg-evergreen-50 text-evergreen-600"}`}>
                <IconC size={18} />
              </span>
              <span className="font-medium">{it.name}</span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-[28px] glass-card p-7 shadow-e1 sm:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={ind.key}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-evergreen-50 text-evergreen-600">
                <ActiveIcon size={22} />
              </span>
              <div>
                <h3 className="font-serif text-[1.7rem] leading-none">{ind.name}</h3>
              </div>
            </div>
            <p className="mt-4 max-w-[50ch] text-[1.05rem] text-neutral-500">{ind.tagline}</p>

            <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="mt-8 grid gap-7 sm:grid-cols-3">
              <Column title="Pain points" items={ind.pains} tone="pain" />
              <Column title="Our solutions" items={ind.solutions} tone="sol" />
              <Column title="The benefit" items={ind.benefits} tone="ben" />
            </motion.div>

            {/* Case study */}
            <div className="mt-8 flex flex-col items-start gap-5 rounded-2xl bg-cream p-6 sm:flex-row sm:items-center">
              <div className="font-serif text-[2.6rem] leading-none text-evergreen-700 figure">{ind.story.metric}</div>
              <div className="flex-1">
                <div className="text-[1.05rem] font-medium">{ind.story.title}</div>
                <p className="mt-1 text-[0.95rem] text-neutral-500">{ind.story.note}</p>
              </div>
              <Button href="/resources?type=case-studies" variant="secondary" size="sm">Read case study</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { INDUSTRIES };
