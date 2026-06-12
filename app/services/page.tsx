import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/icons";
import { BarChart, AreaChart, DonutGauge } from "@/components/charts/Charts";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/seo";

const FAQS = [
  { q: "How quickly can you take over our books?", a: "Most clients are fully onboarded within a week. We connect your accounts, review the current state, and your dedicated clerk starts reconciling immediately — even mid-month." },
  { q: "Do you work with our existing accounting software?", a: "Yes. We work inside QuickBooks, Xero, NetSuite, and most major platforms. If you're switching, we handle the migration as part of onboarding." },
  { q: "What's the difference between bookkeeping and management accounts?", a: "Bookkeeping keeps your records accurate and compliant. Management accounts turn that data into monthly reporting and commentary you can actually make decisions from. Most growing companies need both." },
  { q: "Can we start with bookkeeping and add advisory later?", a: "Absolutely. Many clients begin with bookkeeping, then layer on management accounts and fractional CFO support as they scale. The same team grows with you." },
  { q: "How is pricing structured?", a: "A fixed monthly fee based on your transaction volume and the services you need — no hourly meters and no per-report charges. You'll get a clear quote after a 20-minute walkthrough." },
];

export const metadata: Metadata = {
  title: "Services",
  description: "Finance & Accounting, Management Accounts, and Outsourced Finance Solutions — handled by people who read the numbers.",
};

const SERVICES = [
  {
    id: "finance-accounting",
    icon: Icon.ledger,
    eyebrow: "Service 01",
    title: "Finance & Accounting",
    lead: "The dependable foundation — books reconciled to the cent, on time, every month.",
    features: [
      "Daily bank, card & processor reconciliation",
      "Accounts payable & receivable",
      "Payroll and contractor filings",
      "Tax-ready financial statements",
      "Year-end close & audit support",
    ],
    graphic: "bars",
  },
  {
    id: "management-accounts",
    icon: Icon.chart,
    eyebrow: "Service 02",
    title: "Management Accounts",
    lead: "Monthly management reporting that turns a clean close into decisions you can act on.",
    features: [
      "Monthly P&L, balance sheet & cash flow",
      "Department & project profitability",
      "Budget vs. actual variance analysis",
      "KPI dashboards & board packs",
      "Plain-language commentary",
    ],
    graphic: "area",
  },
  {
    id: "outsourced-finance",
    icon: Icon.users,
    eyebrow: "Service 03",
    title: "Outsourced Finance Solutions",
    lead: "A full finance function — from clerk to controller to fractional CFO — without the headcount.",
    features: [
      "Dedicated bookkeeping clerk",
      "Fractional controller & CFO advisory",
      "Process design & systems setup",
      "Fundraising & investor reporting",
      "Scales seamlessly as you grow",
    ],
    graphic: "donut",
  },
];

const CASES = [
  { tag: "SaaS · Series A", title: "From 6 weeks late to closed by the 5th", metric: "−31 days", note: "to monthly close after migrating to managed bookkeeping." },
  { tag: "E-commerce", title: "Margin clarity across 4 sales channels", metric: "+8.4 pts", note: "true gross margin uncovered after channel-level reconciliation." },
  { tag: "Agency", title: "Project profitability that changed pricing", metric: "+22%", note: "blended margin after class-tracked management accounts." },
];

function ServiceGraphic({ kind }: { kind: string }) {
  if (kind === "bars")
    return <BarChart data={[{ value: 42 }, { value: 70 }, { value: 55 }, { value: 88 }, { value: 64 }, { value: 100 }]} height={160} />;
  if (kind === "area")
    return <AreaChart data={[20, 28, 24, 36, 33, 46, 42, 58, 62, 74]} width={460} height={170} className="h-[170px] w-full" />;
  return (
    <div className="flex items-center justify-center py-2">
      <DonutGauge value={94} color="#2F8C63" trackColor="rgba(20,22,15,0.08)" label="capacity freed" />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...SERVICES.map((s) =>
            serviceSchema({ name: s.title, description: s.lead, path: `/services#${s.id}`, serviceType: "Accounting" })
          ),
          faqSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title={<>Finance services that end in a <span className="italic text-evergreen-300">recommendation</span>.</>}
        lead="Three ways we work with you — from keeping the books to running your entire finance function. Every engagement is owned by a real team, amplified by software."
        cta={{ label: "Start Now", href: "/contact" }}
      />

      {/* Service blocks — alternating editorial layout */}
      {SERVICES.map((s, i) => {
        const IconC = s.icon;
        const reversed = i % 2 === 1;
        return (
          <Section key={s.id} id={s.id} surface={i % 2 === 0 ? "canvas" : "cream"}>
            <div className={`grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-evergreen-50 text-evergreen-600">
                  <IconC size={24} />
                </div>
                <span className="mt-5 inline-block text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-600">{s.eyebrow}</span>
                <h2 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.06] tracking-[-0.018em]">{s.title}</h2>
                <p className="mt-4 max-w-[46ch] text-[1.1rem] text-neutral-500">{s.lead}</p>
                <ul className="mt-6 grid gap-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-neutral-700">
                      <Icon.check size={18} className="mt-0.5 shrink-0 text-evergreen-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/contact" variant="secondary">Discuss {s.title.toLowerCase()}</Button>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[28px] glass-card p-7 shadow-e2">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[0.8rem] text-neutral-400">Illustrative outcome</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-evergreen-50 px-2.5 py-1 text-[0.72rem] font-medium text-evergreen-700">
                      <Icon.growth size={14} /> Trending up
                    </span>
                  </div>
                  <ServiceGraphic kind={s.graphic} />
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })}

      {/* Interactive comparison cards */}
      <Section surface="ink">
        <Reveal>
          <SectionHead onDark eyebrow="How engagements work" title="Pick your altitude. Change it any time." lead="Start where you need us and scale up — the same team grows with you." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" gap={0.08}>
          {[
            { name: "Books only", price: "Bookkeeping", desc: "We keep it clean; you steer.", items: ["Reconciliation", "Monthly statements", "Tax-ready"] },
            { name: "Books + reporting", price: "Management Accounts", desc: "Numbers that explain themselves.", items: ["Everything in Books", "KPI dashboards", "Board packs", "Commentary"], featured: true },
            { name: "Full function", price: "Outsourced Finance", desc: "We run finance end to end.", items: ["Everything in Reporting", "Controller + CFO", "Fundraising support"] },
          ].map((t) => (
            <RevealItem key={t.name}>
              <div
                className={`group flex h-full flex-col rounded-[24px] p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out-strong hover:-translate-y-1 ${
                  t.featured
                    ? "bg-evergreen-500 text-canvas shadow-e3"
                    : "border border-[var(--hair-dark)] bg-white/[0.03] text-[var(--on-ink)] hover:border-white/25"
                }`}
              >
                <div className="text-[0.76rem] uppercase tracking-[0.1em] opacity-70">{t.name}</div>
                <div className="mt-2 font-serif text-[1.6rem] leading-tight">{t.price}</div>
                <p className={`mt-2 text-[0.95rem] ${t.featured ? "text-canvas/80" : "text-[var(--on-ink-mut)]"}`}>{t.desc}</p>
                <ul className="mt-6 grid gap-2.5">
                  {t.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-[0.92rem]">
                      <Icon.check size={16} className={t.featured ? "text-canvas" : "text-evergreen-300"} />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Button href="/contact" variant={t.featured ? "secondary" : "ghost-dark"} className={t.featured ? "w-full bg-canvas text-neutral-900" : "w-full"}>
                    Start Now
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Case studies */}
      <Section surface="cream" id="case-studies">
        <Reveal>
          <SectionHead eyebrow="Proof" title="Outcomes, not deliverables." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" gap={0.08}>
          {CASES.map((c) => (
            <RevealItem key={c.title}>
              <a href="/resources?type=case-studies" className="group flex h-full flex-col rounded-[24px] glass-card p-7 transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-evergreen-600">{c.tag}</span>
                <div className="mt-4 font-serif text-[2.4rem] leading-none text-neutral-900 figure">{c.metric}</div>
                <h3 className="mt-3 text-[1.15rem] font-medium leading-snug">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] text-neutral-500">{c.note}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9rem] font-medium text-evergreen-600">
                  Read the case study
                  <span className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">→</span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* FAQ */}
      <Section surface="canvas">
        <Reveal>
          <SectionHead center eyebrow="Questions" title="The things clients ask first." className="mb-12" />
        </Reveal>
        <Reveal delay={0.1}>
          <FAQ items={FAQS} />
        </Reveal>
      </Section>

      {/* CTA */}
      <Section surface="ink" className="text-center">
        <Reveal>
          <SectionHead onDark center eyebrow="Hand off the books this month" title="Tell us where it hurts. We'll show you the fix." lead="Twenty minutes to walk your books and a fixed monthly quote." />
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex justify-center gap-3">
          <Button href="/contact" variant="primary">Start Now</Button>
          <Button href="/financial-management" variant="ghost-dark">See financial management</Button>
        </Reveal>
      </Section>
    </>
  );
}
