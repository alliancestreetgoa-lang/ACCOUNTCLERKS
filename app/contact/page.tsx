import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";
import { Icon } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, contactPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Talk To An Expert",
  description: "Book a 20-minute walkthrough of your books and get a fixed monthly quote. Multi-step enquiry, instant scheduling.",
};

const ASSURANCES = [
  { icon: Icon.shield, t: "No commitment", d: "A walkthrough, not a sales pitch." },
  { icon: Icon.refresh, t: "Switch in under a week", d: "From any software or bookkeeper." },
  { icon: Icon.check, t: "One business day", d: "A real expert replies fast." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Talk To An Expert", path: "/contact" },
          ]),
          contactPageSchema(),
        ]}
      />
      <PageHero
        eyebrow="Talk to an expert"
        title={<>Close your last <span className="italic text-evergreen-300">messy</span> month-end.</>}
        lead="Tell us a little about your business and book a 20-minute walkthrough. You'll leave with a fixed monthly quote and a clear plan."
      />

      <Section surface="canvas">
        <div className="grid gap-[clamp(28px,4vw,56px)] lg:grid-cols-2">
          {/* Multi-step qualification form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Scheduling + assurances */}
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL} />
            <div className="grid gap-4 sm:grid-cols-3">
              {ASSURANCES.map((a) => {
                const IconC = a.icon;
                return (
                  <div key={a.t} className="rounded-2xl border border-[var(--hair-light)] bg-canvas p-5">
                    <IconC size={20} className="text-evergreen-600" />
                    <div className="mt-3 text-[0.95rem] font-medium">{a.t}</div>
                    <p className="mt-1 text-[0.85rem] text-neutral-500">{a.d}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
