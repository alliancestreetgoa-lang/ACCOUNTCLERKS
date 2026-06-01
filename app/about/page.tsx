import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description: "Our story, mission, vision, and the team behind ACCOUNTCLERKS — the finance partner that reads the numbers and tells you what's next.",
};

const VALUES = [
  { icon: Icon.shield, title: "Precision is the floor", desc: "Reconciled to the cent, every time. Accuracy isn't the pitch — it's the price of entry." },
  { icon: Icon.compass, title: "Say the real thing", desc: "We translate, we don't obscure. You hear the hard truth first, in words you can act on." },
  { icon: Icon.check, title: "Own the outcome", desc: "We're accountable to your decision, not just your statements." },
  { icon: Icon.refresh, title: "Quietly relentless", desc: "No theatrics. Consistent, compounding rigor that makes us impossible to replace." },
];

const TEAM = [
  { mono: "DR", name: "Daniel Rowe", role: "Lead Clerk", cred: "CPA", grad: "from-evergreen-500 to-evergreen-700" },
  { mono: "SM", name: "Sara Mehta", role: "FP&A Advisor", cred: "FP&A", grad: "from-neutral-700 to-neutral-900" },
  { mono: "TO", name: "Tom Okafor", role: "Tax Lead", cred: "EA · Tax", grad: "from-brass-400 to-brass-600" },
  { mono: "LC", name: "Lena Cruz", role: "Engagement Lead", cred: "Lead", grad: "from-[#29abe2] to-[#1b75bb]" },
  { mono: "JP", name: "James Park", role: "Fractional CFO", cred: "CFO", grad: "from-evergreen-600 to-evergreen-900" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        title={<>The clerk who <span className="italic text-evergreen-300">reads</span> the book.</>}
        lead="We kept the discipline of the original record-keeper and dropped the dust. Today the clerk doesn't just keep the book — they read it, and help you write the next chapter."
        cta={{ label: "Meet the team", href: "#team" }}
      />

      {/* Our Story */}
      <Section surface="canvas">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="Our story" title="Most companies meet their numbers too late." />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[1.08rem] text-neutral-600">
            <p>The books close weeks after the month they describe, land as a static report, and answer questions nobody is still asking. Finance becomes a rear-view mirror — accurate, and useless for steering.</p>
            <p>ACCOUNTCLERKS was built on a simple conviction: <strong className="text-neutral-900">the ledger is the most honest story a company tells about itself</strong> — and someone should be reading it out loud, in time to matter.</p>
            <p>So we built a different kind of finance partner. Dedicated clerks who own your books end to end, working inside software that reconciles in real time — and who read what the numbers are saying, every month, to the people making the call.</p>
          </Reveal>
        </div>
      </Section>

      {/* Mission + Vision */}
      <Section surface="ink">
        <RevealGroup className="grid gap-5 md:grid-cols-2" gap={0.1}>
          <RevealItem>
            <div className="flex h-full flex-col rounded-[28px] border border-[var(--hair-dark)] bg-white/[0.03] p-9">
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-300">Our mission</span>
              <p className="mt-5 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.3]">
                To give every ambitious company the financial clarity that usually only the largest can afford — accurate books, and the counsel to act on them.
              </p>
              <p className="mt-auto pt-8 text-[var(--on-ink-mut)]">We collapse the distance between <em>what happened</em> and <em>what to do next.</em></p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="flex h-full flex-col rounded-[28px] bg-evergreen-700 p-9 text-canvas">
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-evergreen-300">Our vision</span>
              <p className="mt-5 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.3]">
                A world where finance is a company's sharpest decision-making instrument — not its slowest reporting obligation.
              </p>
              <p className="mt-auto pt-8 text-canvas/75">Every operator opens their books like a map: to know where they are, and choose where to go.</p>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* How We Add Value */}
      <Section surface="canvas">
        <Reveal>
          <SectionHead eyebrow="How we add value" title="Five behaviors, not five posters." lead="These show up in the work, every month — the reasons clients stay for years." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {VALUES.map((v) => {
            const IconC = v.icon;
            return (
              <RevealItem key={v.title}>
                <div className="flex h-full flex-col rounded-[24px] border border-[var(--hair-light)] bg-canvas p-7 transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-evergreen-50 text-evergreen-600"><IconC size={22} /></div>
                  <h3 className="mt-5 font-serif text-[1.3rem] leading-tight">{v.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-neutral-500">{v.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Lead & Follow System */}
      <Section surface="cream">
        <Reveal>
          <SectionHead eyebrow="The lead & follow system" title="We lead where we're expert. We follow where you steer." lead="A clear division of labor that keeps you in control of the business — and us in control of the numbers." />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[28px] border border-evergreen-100 bg-evergreen-50 p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-evergreen-500 text-canvas"><Icon.compass size={22} /></span>
                <h3 className="font-serif text-[1.6rem]">We lead</h3>
              </div>
              <p className="mt-4 text-neutral-600">On the things you shouldn't have to think about.</p>
              <ul className="mt-6 grid gap-3">
                {["The monthly close & reconciliation", "Compliance, payroll & tax readiness", "Reporting cadence & accuracy", "Proactive flags — runway, margin, risk"].map((it) => (
                  <li key={it} className="flex items-start gap-3 text-neutral-700"><Icon.check size={18} className="mt-0.5 shrink-0 text-evergreen-600" />{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[28px] border border-[var(--hair-light)] bg-canvas p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-900 text-canvas"><Icon.users size={22} /></span>
                <h3 className="font-serif text-[1.6rem]">We follow</h3>
              </div>
              <p className="mt-4 text-neutral-600">On the decisions that are yours to make.</p>
              <ul className="mt-6 grid gap-3">
                {["Your growth strategy & priorities", "Hiring, pricing & investment calls", "Risk appetite & timing", "The direction of the business"].map((it) => (
                  <li key={it} className="flex items-start gap-3 text-neutral-700"><Icon.check size={18} className="mt-0.5 shrink-0 text-brass-600" />{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-8 text-center text-[1.05rem] text-neutral-500">
          The result: a finance function that runs itself — and a partner who tells you what to do, without ever taking the wheel.
        </Reveal>
      </Section>

      {/* Meet the team */}
      <Section surface="canvas" id="team">
        <Reveal>
          <SectionHead eyebrow="Meet the team" title="Real people own your books." lead="Not a faceless queue — a dedicated clerk and an advisor who know your business by name." />
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5" gap={0.06}>
          {TEAM.map((m) => (
            <RevealItem key={m.name}>
              <div className="group overflow-hidden rounded-[20px] border border-[var(--hair-light)] bg-canvas transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                <div className={`grid aspect-square place-items-center bg-gradient-to-br ${m.grad} font-serif text-[2rem] text-canvas`}>{m.mono}</div>
                <div className="p-4">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-[0.84rem] text-neutral-500">{m.role}</div>
                  <div className="mt-2 text-[0.72rem] uppercase tracking-[0.06em] text-evergreen-600">{m.cred}</div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* CTA */}
      <Section surface="ink" className="text-center">
        <Reveal>
          <SectionHead onDark center eyebrow="Work with us" title="Let's read your numbers together." />
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex justify-center gap-3">
          <Button href="/contact" variant="primary">Talk To An Expert</Button>
          <Button href="/who-we-work-with" variant="ghost-dark">See who we help</Button>
        </Reveal>
      </Section>
    </>
  );
}
