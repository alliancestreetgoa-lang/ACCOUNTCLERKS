import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PortableBody } from "@/components/PortableBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getResources, getResourceBySlug, slugOf, type ResourceType } from "@/lib/resources";


const TYPE_LABEL: Record<ResourceType, string> = {
  article: "Article", guide: "Guide", checklist: "Checklist", video: "Video", download: "Download",
};

export const dynamicParams = false; // static export: only prebuilt slugs

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: slugOf(r) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return { title: "Resource not found" };
  return {
    title: r.title,
    description: r.excerpt,
    openGraph: { title: r.title, description: r.excerpt, type: "article" },
  };
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) notFound();

  const all = await getResources();
  const related = all.filter((x) => x.topic === r.topic && slugOf(x) !== slug).slice(0, 3);
  const dateLabel = new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: r.title, path: r.href },
          ]),
          articleSchema({ title: r.title, description: r.excerpt, path: r.href, date: r.date }),
        ]}
      />
      {/* Header */}
      <header
        className="relative overflow-hidden pb-[clamp(40px,7vh,80px)] pt-[clamp(120px,17vh,190px)] text-[var(--on-ink)]"
        style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(107,46,147,.28) 0%, rgba(107,46,147,0) 50%), radial-gradient(80% 60% at 10% 100%, rgba(41,171,226,.08) 0%, rgba(41,171,226,0) 55%), linear-gradient(168deg, #1D0F30 0%, #160A24 65%)" }}
      >
        <div className="wrap relative z-10 max-w-[var(--maxw-prose)]">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-[0.88rem] text-[var(--on-ink-mut)] transition-colors hover:text-[var(--on-ink)]">
            ← All resources
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.78rem]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-evergreen-500/15 px-2.5 py-1 font-medium text-evergreen-300">
              {TYPE_LABEL[r.type]}
            </span>
            <span className="text-[var(--on-ink-faint)]">{r.topic}</span>
            <span className="text-[var(--on-ink-faint)]">·</span>
            <span className="text-[var(--on-ink-faint)]">{dateLabel}</span>
            {r.readTime && <><span className="text-[var(--on-ink-faint)]">·</span><span className="text-[var(--on-ink-faint)]">{r.readTime}</span></>}
          </div>
          <h1 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.02em]">{r.title}</h1>
          <p className="mt-5 text-[clamp(1.1rem,1.6vw,1.3rem)] text-[var(--on-ink-mut)]">{r.excerpt}</p>
        </div>
      </header>

      {/* Body */}
      <Section surface="canvas">
        <article className="mx-auto max-w-[var(--maxw-prose)]">
          {r.body && r.body.length > 0 ? (
            <Reveal>
              <PortableBody value={r.body} />
            </Reveal>
          ) : (
            <Reveal className="rounded-[20px] border border-[var(--hair-light)] bg-cream p-7">
              <p className="text-[1.08rem] leading-[1.7] text-neutral-700">{r.excerpt}</p>
              <p className="mt-4 text-[0.95rem] text-neutral-500">
                The full {TYPE_LABEL[r.type].toLowerCase()} is managed in the CMS. Connect a Sanity project and add a{" "}
                <code className="rounded bg-canvas px-1.5 py-0.5 text-[0.85em]">body</code> to publish the complete piece here.
              </p>
              {r.type === "download" && (
                <div className="mt-6"><Button href={r.href} variant="primary">Download</Button></div>
              )}
            </Reveal>
          )}

          {/* Inline CTA */}
          <div className="mt-12 rounded-[24px] bg-evergreen-700 p-8 text-canvas">
            <h2 className="font-serif text-[1.6rem] leading-tight">Want this handled for you?</h2>
            <p className="mt-2 max-w-[44ch] text-canvas/80">Our team does this every month for 480+ companies. Twenty minutes to see it on your books.</p>
            <div className="mt-5"><Button href="/contact" variant="secondary" className="bg-canvas text-neutral-900">Talk To An Expert</Button></div>
          </div>
        </article>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section surface="cream">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)]">Related {r.topic.toLowerCase()} reading</h2>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {related.map((x) => (
              <RevealItem key={x.id}>
                <Link href={x.href} className="group flex h-full flex-col rounded-[22px] border border-[var(--hair-light)] bg-canvas p-6 transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-evergreen-50 px-2.5 py-1 text-[0.72rem] font-medium text-evergreen-700">
                    {TYPE_LABEL[x.type]}
                  </span>
                  <h3 className="mt-4 font-serif text-[1.25rem] leading-snug">{x.title}</h3>
                  <p className="mt-2 text-[0.92rem] text-neutral-500">{x.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.88rem] font-medium text-evergreen-600">
                    Open <span className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}
    </>
  );
}
