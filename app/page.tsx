import { Hero3D } from "@/components/sections/Hero3D";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { FinancialDashboard } from "@/components/sections/FinancialDashboard";
import { GrowthJourney } from "@/components/sections/GrowthJourney";
import { IndustryExplorer } from "@/components/sections/IndustryExplorer";
import { ToolCallout } from "@/components/sections/ToolCallout";
import { ContactSection } from "@/components/sections/ContactSection";

const SERVICES = [
  { icon: Icon.ledger, title: "Finance & Accounting", desc: "Every transaction categorized, reconciled, and reviewed by a human before the 5th." },
  { icon: Icon.chart, title: "Management Accounts", desc: "Monthly reporting and commentary you can actually make decisions from." },
  { icon: Icon.users, title: "Outsourced Finance", desc: "A full finance function — clerk to fractional CFO — without the headcount." },
];

const VALUES = ["Precision is the floor", "Say the real thing", "Own the outcome", "Quietly relentless"];

const TEAM = [
  { name: "Alexandra Chen", role: "Lead Clerk · CPA" },
  { name: "Marcus Reid", role: "FP&A Advisor" },
  { name: "Sarah Kapoor", role: "Tax Lead · EA" },
  { name: "James Whitfield", role: "Engagement Lead" },
];

const QUOTES = [
  { q: "We handed off two years of half-done books on a Friday. By the next close they were balanced, audited clean, and I stopped dreading the 1st of the month.", n: "Daria Reyes", r: "Founder, Hearthwood Goods", av: "DR", bg: "bg-evergreen-500", lead: true },
  { q: "Our CPA opened the year-end pack and asked who did our books. That's the whole review.", n: "Jonah Marlow", r: "Partner, Marlow & Co.", av: "JM", bg: "bg-neutral-800" },
  { q: "I finally know our runway on a Monday instead of guessing until the quarter closes.", n: "Priya Tan", r: "COO, Northbeam", av: "PT", bg: "bg-brass-400" },
];

export default function HomePage() {
  return (
    <>
      <Hero3D />

      {/* SERVICES */}
      <Section id="services" surface="purple" className="scroll-mt-20">
        <Reveal>
          <SectionHead eyebrow="What we do" title="Everything below the line, handled by people who read it." lead="A real finance team owns your books end to end. The software just makes the month-end disappear." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" gap={0.07}>
          {SERVICES.map((s, idx) => {
            const IconC = s.icon;
            return (
              <RevealItem key={s.title}>
                <div className="flex h-full flex-col rounded-[24px] glass-card p-7 transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-evergreen-500 to-cyan-500 text-white shadow-[0_4px_14px_rgba(107,46,147,.35)]"><IconC size={24} /></div>
                  <h3 className="mt-5 font-serif text-[1.4rem]">{s.title}</h3>
                  <p className="mt-2 text-[0.96rem] text-neutral-500">{s.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal delay={0.1} className="mt-8">
          <Button href="/services" variant="secondary">See all services</Button>
        </Reveal>
      </Section>

      {/* FINANCIAL MANAGEMENT */}
      <Section id="financial-management" surface="canvas" className="scroll-mt-20">
        <Reveal>
          <SectionHead eyebrow="Financial management" title="Numbers that tell you what to do next." lead="Forecasting, FP&A, and board-ready reporting — switch views to explore the live picture your team works from." />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <div id="dashboard-card">
            <FinancialDashboard />
          </div>
        </Reveal>
      </Section>

      {/* GROWTH JOURNEY */}
      <Section id="growth-journey" surface="canvas" className="scroll-mt-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHead center eyebrow="The growth journey" title="From raw data to real growth." lead="Every client moves through the same four stages with us — scroll the journey." />
        </Reveal>
      </Section>
      <GrowthJourney />

      {/* WHO WE WORK WITH */}
      <Section id="who-we-work-with" surface="purple-alt" className="scroll-mt-20">
        <Reveal>
          <SectionHead eyebrow="Who we work with" title="Different books. Same clean close." lead="Pick your world to see the pains we fix and the outcomes we deliver." />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <IndustryExplorer />
        </Reveal>
      </Section>

      {/* ABOUT */}
      <Section id="about" surface="purple" className="scroll-mt-20">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="About us" title="The clerk who reads the book." />
            <p className="mt-5 max-w-[48ch] text-[1.05rem] text-neutral-500">
              We kept the discipline of the original record-keeper and dropped the dust. Today the clerk doesn't just keep the book — they read it, and help you write the next chapter.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {VALUES.map((v) => (
                <span key={v} className="relative pl-4 text-[0.95rem] text-neutral-700 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-evergreen-500">
                  {v}
                </span>
              ))}
            </div>
          </Reveal>
          <RevealGroup className="grid gap-5 sm:grid-cols-2" gap={0.1}>
            <RevealItem>
              <div className="h-full rounded-[24px] glass-card p-7">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-evergreen-600">Mission</span>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug text-neutral-900">Give every ambitious company the financial clarity that usually only the largest can afford.</p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-[24px] bg-gradient-to-br from-evergreen-600 to-cyan-600 p-7 text-canvas">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/70">Vision</span>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug">Finance as a company's sharpest decision-making instrument — not its slowest obligation.</p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      {/* TEAM */}
      <Section surface="purple-alt">
        <Reveal>
          <SectionHead eyebrow="Meet the team" title="Real people own your books." />
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4" gap={0.06}>
          {TEAM.map((m, idx) => (
            <RevealItem key={m.name}>
              <div className="team-glass overflow-hidden rounded-[24px]">
                <span className="team-glass-shine" aria-hidden="true" />
                <span className="team-glass-border" aria-hidden="true" />
                <div className="relative z-10 aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/team-photo.jpg`}
                    alt={m.name}
                    className="h-full w-full object-cover object-[center_8%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 p-4">
                  <div className="font-semibold text-neutral-900">{m.name}</div>
                  <div className="text-[0.84rem] text-neutral-500">{m.role}</div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* TESTIMONIALS */}
      <Section surface="purple">
        <Reveal>
          <SectionHead eyebrow="In their words" title="The month-end stopped being ours." />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          {QUOTES.map((qt, idx) => (
            <Reveal key={qt.n} className={qt.lead ? "lg:row-span-2" : ""}>
              <figure className={`testimonial-card flex h-full flex-col rounded-[24px] p-7 sm:p-8 ${qt.lead ? "bg-ink text-[var(--on-ink)]" : "glass-card"}`}>
                <div className={`font-serif text-[3rem] leading-[0.4] ${qt.lead ? "text-evergreen-300" : "text-evergreen-500"}`}>&ldquo;</div>
                <blockquote className={`mt-4 font-serif leading-snug ${qt.lead ? "text-[clamp(1.5rem,2.4vw,2rem)]" : "text-[1.2rem]"}`}>{qt.q}</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <span className={`grid h-10 w-10 place-items-center rounded-full ${qt.bg} text-[0.85rem] font-semibold text-canvas`}>{qt.av}</span>
                  <span>
                    <span className="block text-[0.95rem] font-medium">{qt.n}</span>
                    <span className={`block text-[0.82rem] ${qt.lead ? "text-[var(--on-ink-mut)]" : "text-neutral-400"}`}>{qt.r}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* RESOURCES / TOOL */}
      <Section id="resources" surface="purple-alt" className="scroll-mt-20">
        <Reveal>
          <SectionHead eyebrow="Resources" title="Finance, read out loud." lead="Guides, checklists, and free tools from a team that does this every day." />
        </Reveal>
        <div className="mt-10">
          <ToolCallout />
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Button href="/resources" variant="secondary">Browse all resources</Button>
        </Reveal>
      </Section>

      {/* CONTACT */}
      <Section id="contact" surface="purple" className="scroll-mt-20">
        <Reveal>
          <SectionHead center eyebrow="Talk to an expert" title="Talk To An Expert, What is your need" lead="Tell us about your business — we'll match you to the right service and get started within the week." />
        </Reveal>
        <ContactSection />
      </Section>
    </>
  );
}
