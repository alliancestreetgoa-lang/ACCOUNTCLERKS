import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { FinancialDashboard } from "@/components/sections/FinancialDashboard";
import { Icon } from "@/components/ui/icons";
import { Sparkline } from "@/components/charts/Charts";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/seo";

const FM_FAQS = [
  { q: "What's included in financial management vs. bookkeeping?", a: "Bookkeeping records what happened. Financial management is the forward-looking layer on top — forecasting, budgeting, scenario planning, and board-ready reporting that tells you what to do next." },
  { q: "How accurate are the cash-flow forecasts?", a: "Forecasts are built from your reconciled actuals and updated every close, with base, upside, and downside scenarios. They're directional tools for decisions — and they get sharper every month as the model learns your business." },
  { q: "Can you produce board and investor reporting?", a: "Yes. We prepare board packs, investor updates, and the metrics (runway, burn, cohort, unit economics) that survive diligence — in templates your stakeholders can open without a translator." },
  { q: "Do we get a real person or just a dashboard?", a: "Both. The live dashboard is always on, but a dedicated advisor delivers the monthly read — what changed, what it means, and the recommended move — in plain language." },
];

export const metadata: Metadata = {
  title: "Financial Management",
  description: "Expansion, growth, profitability, cost control, budgeting, cashflow, and forecasting — an interactive financial command center.",
};

const AREAS = [
  { icon: Icon.rocket, title: "Expansion", desc: "Model new markets, locations, and entities before you commit the capital.", trend: [20, 28, 26, 38, 44, 52, 66], up: true },
  { icon: Icon.growth, title: "Growth", desc: "Track the levers that actually move revenue — and the unit economics underneath.", trend: [30, 34, 40, 46, 55, 63, 74], up: true },
  { icon: Icon.coins, title: "Profitability", desc: "Margin by product, channel, and customer, so you grow the right lines.", trend: [44, 48, 52, 58, 60, 65, 68], up: true },
  { icon: Icon.scissors, title: "Cost Control", desc: "Spot waste and runway risks early, with spend categorized and benchmarked.", trend: [70, 64, 58, 52, 47, 43, 39], up: false },
  { icon: Icon.calculator, title: "Budgeting", desc: "Living budgets with budget-vs-actual variance flagged the moment it drifts.", trend: [50, 52, 49, 54, 51, 55, 53], up: true },
  { icon: Icon.wallet, title: "Cashflow", desc: "Know your cash position and days-of-runway every Monday, not every quarter.", trend: [40, 44, 42, 50, 56, 60, 66], up: true },
  { icon: Icon.compass, title: "Forecasting", desc: "Base, upside, and downside scenarios you can pressure-test in minutes.", trend: [35, 42, 48, 55, 63, 72, 84], up: true },
];

export default function FinancialManagementPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Financial Management", path: "/financial-management" },
          ]),
          serviceSchema({
            name: "Financial Management & FP&A",
            description: "Cash-flow forecasting, FP&A, budgeting, and board-ready reporting that turn a clean close into a clear decision.",
            path: "/financial-management",
            serviceType: "Financial Management",
          }),
          faqSchema(FM_FAQS),
        ]}
      />
      <PageHero
        eyebrow="Financial management"
        title={<>Numbers that tell you <span className="italic text-evergreen-300">what to do next</span>.</>}
        lead="The strategic layer above the close — a live command center for expansion, growth, profitability, cost control, budgeting, cashflow, and forecasting."
        cta={{ label: "Talk To An Expert", href: "/contact" }}
      />

      {/* Interactive dashboard */}
      <Section surface="ink">
        <Reveal>
          <SectionHead center onDark eyebrow="Live dashboard" title="Your finances, visible while they happen." lead="Switch views to explore cashflow, forecasting, and profitability — the same picture your dedicated team works from." />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <FinancialDashboard />
        </Reveal>
      </Section>

      {/* Seven areas */}
      <Section surface="canvas">
        <Reveal>
          <SectionHead eyebrow="What we manage" title="Seven disciplines, one connected view." lead="Each area is tracked, reported, and turned into a recommendation every month." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {AREAS.map((a) => {
            const IconC = a.icon;
            return (
              <RevealItem key={a.title}>
                <div className="group flex h-full flex-col rounded-[24px] glass-card p-7 transition-[transform,border-color,box-shadow] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200 hover:shadow-e2">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-evergreen-50 text-evergreen-600">
                      <IconC size={22} />
                    </div>
                    <Sparkline data={a.trend} width={84} height={28} stroke={a.up ? "#2F8C63" : "#C7A867"} />
                  </div>
                  <h3 className="mt-5 font-serif text-[1.45rem]">{a.title}</h3>
                  <p className="mt-2 text-[0.96rem] text-neutral-500">{a.desc}</p>
                </div>
              </RevealItem>
            );
          })}
          {/* Closing CTA tile to complete the grid */}
          <RevealItem>
            <div className="flex h-full flex-col justify-center rounded-[24px] bg-evergreen-700 p-7 text-canvas">
              <h3 className="font-serif text-[1.5rem] leading-tight">See it on your numbers.</h3>
              <p className="mt-2 text-[0.95rem] text-canvas/80">A 20-minute walkthrough on your live books.</p>
              <div className="mt-5">
                <Button href="/contact" variant="secondary" className="bg-canvas text-neutral-900">Talk To An Expert</Button>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Outcome band */}
      <Section surface="cream">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="The difference" title="From a rear-view mirror to a windshield." lead="Most firms hand you last month's report. We hand you next month's decision — what changed, what it means, and the move we'd make." />
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-4" gap={0.08}>
            {[
              { v: "5th", l: "Books closed by" },
              { v: "Weekly", l: "Cash visibility" },
              { v: "3", l: "Forecast scenarios" },
              { v: "100%", l: "Decisions backed by data" },
            ].map((s) => (
              <RevealItem key={s.l}>
                <div className="rounded-2xl glass-card p-6">
                  <div className="font-serif text-[2rem] leading-none figure">{s.v}</div>
                  <div className="mt-2 text-[0.88rem] text-neutral-500">{s.l}</div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* FAQ */}
      <Section surface="canvas">
        <Reveal>
          <SectionHead center eyebrow="Questions" title="Financial management, answered." className="mb-12" />
        </Reveal>
        <Reveal delay={0.1}>
          <FAQ items={FM_FAQS} />
        </Reveal>
      </Section>
    </>
  );
}
