import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { IndustryExplorer } from "@/components/sections/IndustryExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Who We Work With",
  description: "Entrepreneurs, startups, e-commerce, retail, automotive, and international markets — finance tailored to how you actually run.",
};

export default function WhoWeWorkWithPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Work With", path: "/who-we-work-with" }])} />
      <PageHero
        eyebrow="Who we work with"
        title={<>Different books. <span className="italic text-evergreen-300">Same clean close.</span></>}
        lead="We speak your industry's numbers. Choose your world below to see the pains we fix, the solutions we bring, and the outcomes we've delivered."
        cta={{ label: "Start Now", href: "/contact" }}
      />

      <Section surface="cream">
        <Reveal>
          <SectionHead eyebrow="Find your fit" title="Pick your industry." lead="Each is handled by a team that understands its specific metrics, margins, and compliance." />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <IndustryExplorer />
        </Reveal>
      </Section>

      <Section surface="ink" className="text-center">
        <Reveal>
          <SectionHead onDark center eyebrow="Not sure you fit a box?" title="Most of our clients don't." lead="If you make, sell, or build something — we can keep its books and read them back to you." />
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex justify-center gap-3">
          <Button href="/contact" variant="primary">Start Now</Button>
          <Button href="/services" variant="ghost-dark">Explore services</Button>
        </Reveal>
      </Section>
    </>
  );
}
