import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { RunwayCalculator } from "@/components/sections/RunwayCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Free Runway Calculator",
  description: "Estimate your startup's cash runway in seconds. Model cash, burn, and revenue to see how many months you have — and when to act.",
};

const FACTS = [
  { icon: Icon.wallet, t: "Runway", d: "Cash on hand ÷ net monthly burn — the months before you hit zero." },
  { icon: Icon.scissors, t: "Net burn", d: "Monthly expenses minus revenue. The lower it is, the longer you last." },
  { icon: Icon.compass, t: "When to act", d: "Most teams start a raise or cost plan with 6–9 months left." },
];

export default function RunwayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Runway Calculator", path: "/tools/runway-calculator" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ACCOUNTCLERKS Runway Calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            url: `${siteUrl}/tools/runway-calculator`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
        ]}
      />

      <PageHero
        eyebrow="Free tool"
        title={<>How long does your <span className="italic text-evergreen-300">cash</span> last?</>}
        lead="Model your cash, burn, and revenue to estimate your runway in seconds — then see exactly when to act."
      />

      <Section surface="canvas">
        <Reveal>
          <RunwayCalculator />
        </Reveal>
      </Section>

      <Section surface="cream">
        <Reveal>
          <SectionHead eyebrow="The basics" title="What the numbers mean." />
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3" gap={0.07}>
          {FACTS.map((f) => {
            const IconC = f.icon;
            return (
              <RevealItem key={f.t}>
                <div className="h-full rounded-[22px] glass-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-evergreen-50 text-evergreen-600">
                    <IconC size={22} />
                  </div>
                  <h3 className="mt-4 font-serif text-[1.25rem]">{f.t}</h3>
                  <p className="mt-2 text-[0.94rem] text-neutral-500">{f.d}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section surface="ink" className="text-center">
        <Reveal>
          <SectionHead
            onDark
            center
            eyebrow="Beyond the estimate"
            title="A calculator guesses. We forecast."
            lead="This is a quick estimate. We build live, multi-scenario forecasts from your real books — updated every close."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex justify-center gap-3">
          <Button href="/contact" variant="primary">Talk To An Expert</Button>
          <Button href="/financial-management" variant="ghost-dark">See financial management</Button>
        </Reveal>
      </Section>
    </>
  );
}
