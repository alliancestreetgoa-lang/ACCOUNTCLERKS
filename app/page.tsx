import { Hero3D } from "@/components/sections/Hero3D";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { FinancialDashboard } from "@/components/sections/FinancialDashboard";
import { GrowthJourney } from "@/components/sections/GrowthJourney";
import { IndustryExplorer } from "@/components/sections/IndustryExplorer";
import { ToolCallout } from "@/components/sections/ToolCallout";
import { ContactForm } from "@/components/sections/ContactForm";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";

const SERVICES = [
  { icon: Icon.ledger, title: "Finance & Accounting", desc: "Every transaction categorized, reconciled, and reviewed by a human before the 5th." },
  { icon: Icon.chart, title: "Management Accounts", desc: "Monthly reporting and commentary you can actually make decisions from." },
  { icon: Icon.users, title: "Outsourced Finance", desc: "A full finance function — clerk to fractional CFO — without the headcount." },
];

const VALUES = ["Precision is the floor", "Say the real thing", "Own the outcome", "Quietly relentless"];

const TEAM = [
  { mono: "DR", name: "Daniel Rowe", role: "Lead Clerk · CPA", grad: "from-evergreen-500 to-evergreen-700" },
  { mono: "SM", name: "Sara Mehta", role: "FP&A Advisor", grad: "from-neutral-700 to-neutral-900" },
  { mono: "TO", name: "Tom Okafor", role: "Tax Lead · EA", grad: "from-brass-400 to-brass-600" },
  { mono: "LC", name: "Lena Cruz", role: "Engagement Lead", grad: "from-[#29abe2] to-[#1b75bb]" },
  { mono: "JP", name: "James Park", role: "Fractional CFO", grad: "from-evergreen-600 to-evergreen-900" },
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
      <Section id="services" surface="cream" className="scroll-mt-20">
        <Reveal>
          <SectionHead eyebrow="What we do" title="Everything below the line, handled by people who read it." lead="A real finance team owns your books end to end. The software just makes the month-end disappear." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" gap={0.07}>
          {SERVICES.map((s) => {
            const IconC = s.icon;
            return (
              <RevealItem key={s.title}>
                <div className="flex h-full flex-col rounded-[24px] glass-card p-7 transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-evergreen-50 text-evergreen-600"><IconC size={24} /></div>
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
      <Section id="financial-management" surface="ink" className="scroll-mt-20">
        <Reveal>
          <SectionHead onDark eyebrow="Financial management" title="Numbers that tell you what to do next." lead="Forecasting, FP&A, and board-ready reporting — switch views to explore the live picture your team works from." />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <FinancialDashboard />
        </Reveal>
      </Section>

      {/* GROWTH JOURNEY */}
      <Section id="growth-journey" surface="ink" className="scroll-mt-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHead center onDark eyebrow="The growth journey" title="From raw data to real growth." lead="Every client moves through the same four stages with us — scroll the journey." />
        </Reveal>
      </Section>
      <GrowthJourney />

      {/* WHO WE WORK WITH */}
      <Section id="who-we-work-with" surface="cream" className="scroll-mt-20">
        <Reveal>
          <SectionHead eyebrow="Who we work with" title="Different books. Same clean close." lead="Pick your world to see the pains we fix and the outcomes we deliver." />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <IndustryExplorer />
        </Reveal>
      </Section>

      {/* ABOUT */}
      <Section id="about" surface="ink" className="scroll-mt-20">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
          <Reveal>
            <SectionHead onDark eyebrow="About us" title="The clerk who reads the book." />
            <p className="mt-5 max-w-[48ch] text-[1.05rem] text-[var(--on-ink-mut)]">
              We kept the discipline of the original record-keeper and dropped the dust. Today the clerk doesn't just keep the book — they read it, and help you write the next chapter.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {VALUES.map((v) => (
                <span key={v} className="relative pl-4 text-[0.95rem] text-[var(--on-ink)] before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-evergreen-300">
                  {v}
                </span>
              ))}
            </div>
          </Reveal>
          <RevealGroup className="grid gap-5 sm:grid-cols-2" gap={0.1}>
            <RevealItem>
              <div className="h-full rounded-[24px] border border-[var(--hair-dark)] bg-white/[0.03] p-7">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-evergreen-300">Mission</span>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug">Give every ambitious company the financial clarity that usually only the largest can afford.</p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-[24px] bg-evergreen-700 p-7 text-canvas">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-evergreen-300">Vision</span>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug">Finance as a company's sharpest decision-making instrument — not its slowest obligation.</p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      {/* TEAM */}
      <Section surface="canvas">
        <Reveal>
          <SectionHead eyebrow="Meet the team" title="Real people own your books." />
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5" gap={0.06}>
          {TEAM.map((m) => (
            <RevealItem key={m.name}>
              <div className="overflow-hidden rounded-[20px] glass-card transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                <div className={`grid aspect-square place-items-center bg-gradient-to-br ${m.grad} font-serif text-[2rem] text-canvas`}>{m.mono}</div>
                <div className="p-4"><div className="font-medium">{m.name}</div><div className="text-[0.84rem] text-neutral-500">{m.role}</div></div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* TESTIMONIALS */}
      <Section surface="cream">
        <Reveal>
          <SectionHead eyebrow="In their words" title="The month-end stopped being ours." />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          {QUOTES.map((qt) => (
            <Reveal key={qt.n} className={qt.lead ? "lg:row-span-2" : ""}>
              <figure className={`flex h-full flex-col rounded-[24px] p-7 sm:p-8 ${qt.lead ? "bg-ink text-[var(--on-ink)]" : "glass-card"}`}>
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
      <Section id="resources" surface="canvas" className="scroll-mt-20">
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
      <Section id="contact" surface="ink" className="scroll-mt-20">
        <Reveal>
          <SectionHead onDark center eyebrow="Talk to an expert" title="Close your last messy month-end." lead="Tell us about your business and book a 20-minute walkthrough — fixed monthly quote, clerk reconciling by next week." />
        </Reveal>
        <div className={process.env.NEXT_PUBLIC_CALENDLY_URL ? "mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2" : "mx-auto mt-12 max-w-xl"}>
          <Reveal>
            <ContactForm />
          </Reveal>
          {process.env.NEXT_PUBLIC_CALENDLY_URL && (
            <Reveal delay={0.1}>
              <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL} />
            </Reveal>
          )}
        </div>
      </Section>
    </>
  );
}
