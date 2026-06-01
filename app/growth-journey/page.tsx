import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthJourney } from "@/components/sections/GrowthJourney";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Growth Journey",
  description: "Four stages from raw financial data to business growth — data processing, accounting, management & analysis, and development.",
};

export default function GrowthJourneyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Growth Journey", path: "/growth-journey" }])} />
      <PageHero
        eyebrow="The growth journey"
        title={<>From raw data to <span className="italic text-evergreen-300">real growth</span>.</>}
        lead="Every client moves through the same four stages with us. Scroll to walk the journey — from the first transaction to a thriving, well-advised business."
      />
      <GrowthJourney />
    </>
  );
}
