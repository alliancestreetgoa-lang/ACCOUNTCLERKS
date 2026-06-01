import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/primitives";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: React.ReactNode;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated ${updated}`} />
      <Section surface="canvas">
        <div className="mx-auto max-w-[var(--maxw-prose)]">
          {intro && <p className="text-[1.1rem] leading-relaxed text-neutral-600">{intro}</p>}
          {sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-serif text-[1.5rem] leading-snug">{s.heading}</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-neutral-600">{s.body}</div>
            </section>
          ))}
          <p className="mt-12 rounded-2xl bg-cream p-5 text-[0.88rem] text-neutral-500">
            This document is a starting template, not legal advice. Have it reviewed by qualified counsel before publishing.
          </p>
        </div>
      </Section>
    </>
  );
}
