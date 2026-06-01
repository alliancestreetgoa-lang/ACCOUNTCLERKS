import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ResourcesHub } from "@/components/sections/ResourcesHub";
import { ToolCallout } from "@/components/sections/ToolCallout";
import { getResources } from "@/lib/resources";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Resources Hub",
  description: "Articles, guides, checklists, videos, and downloads — plain-spoken finance knowledge, searchable and filterable.",
};

// Revalidate periodically so CMS-backed content stays fresh (ISR).

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])} />
      <PageHero
        eyebrow="Resources hub"
        title={<>Finance, <span className="italic text-evergreen-300">read out loud</span>.</>}
        lead="Articles, guides, checklists, videos, and downloads from a team that does this every day. Search and filter to find exactly what you need."
      />

      <Section surface="canvas">
        <Reveal>
          <ResourcesHub resources={resources} />
        </Reveal>
        <div className="mt-14">
          <ToolCallout />
        </div>
      </Section>

      <Section surface="cream" className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight">Get the monthly read in your inbox.</h2>
          <p className="mx-auto mt-3 max-w-[44ch] text-neutral-500">One genuinely useful finance email a month. No noise.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-7 flex max-w-md flex-wrap gap-3">
            <input
              type="email"
              placeholder="Your work email"
              aria-label="Email address"
              className="h-12 min-w-[200px] flex-1 rounded-full border border-neutral-200 bg-canvas px-4 text-[0.95rem] outline-none transition-colors focus:border-evergreen-500"
            />
            <Button href="mailto:hello@accountclerks.com?subject=Subscribe%20to%20the%20monthly%20read" variant="primary">Subscribe</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
