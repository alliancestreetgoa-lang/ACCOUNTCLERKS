/**
 * Resource data layer — the CMS integration seam.
 *
 * `getResources()` is the single source the UI consumes. Today it returns
 * typed local content; to wire a headless CMS (Sanity, Contentful, Hygraph,
 * WordPress, etc.) replace the body with a fetch — the shape stays identical,
 * so no UI changes are needed.
 *
 * Example (Sanity):
 *   const data = await client.fetch(`*[_type == "resource"]{...}`);
 *   return data.map(normalize);
 *
 * Example (Contentful REST):
 *   const res = await fetch(`https://cdn.contentful.com/spaces/${SPACE}/entries?...`,
 *     { headers: { Authorization: `Bearer ${CDA_TOKEN}` }, next: { revalidate: 600 } });
 */

import { isSanityConfigured } from "@/sanity/env";

export type ResourceType = "article" | "guide" | "checklist" | "video" | "download";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  excerpt: string;
  topic: string;
  date: string; // ISO
  readTime?: string;
  href: string;
  featured?: boolean;
  /** Portable Text blocks for the full article/guide body (CMS-driven). */
  body?: any[];
}

/** Single-segment detail slug for a resource (last path segment of href). */
export function slugOf(r: Resource): string {
  return r.href.split("/").filter(Boolean).pop() ?? "";
}

/** Normalize an internal href to the canonical /resources/<slug> detail path. */
function normalizeHref(href: string): string {
  if (/^https?:\/\//.test(href)) return href; // leave external links alone
  return `/resources/${href.split("/").filter(Boolean).pop()}`;
}

export const RESOURCE_TYPES: { key: ResourceType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "article", label: "Articles" },
  { key: "guide", label: "Guides" },
  { key: "checklist", label: "Checklists" },
  { key: "video", label: "Videos" },
  { key: "download", label: "Downloads" },
];

export const RESOURCE_TOPICS = ["Cash Flow", "Bookkeeping", "Fundraising", "Tax", "SaaS", "E-commerce", "Scaling"] as const;

const LOCAL: Resource[] = [
  { id: "1", type: "guide", title: "The founder's guide to cash-flow forecasting", excerpt: "A practical, build-it-yourself framework for projecting runway and pressure-testing scenarios.", topic: "Cash Flow", date: "2026-05-20", readTime: "14 min", href: "/resources/guides/cash-flow-forecasting", featured: true },
  { id: "2", type: "article", title: "Runway, explained simply", excerpt: "What runway really measures, why it moves, and the two levers that change it fastest.", topic: "Cash Flow", date: "2026-05-12", readTime: "6 min", href: "/resources/insights/runway-explained" },
  { id: "3", type: "article", title: "SaaS COGS done right", excerpt: "What belongs in cost of revenue for a software company — and what quietly inflates your margin.", topic: "SaaS", date: "2026-05-04", readTime: "8 min", href: "/resources/insights/saas-cogs" },
  { id: "4", type: "checklist", title: "The month-end close checklist", excerpt: "Twenty-three steps to a clean, audit-ready close by the 5th — print it and tick it off.", topic: "Bookkeeping", date: "2026-04-28", href: "/resources/checklists/month-end-close" },
  { id: "5", type: "video", title: "Reading your P&L in 5 minutes", excerpt: "A short walkthrough of the four numbers that actually tell you how the month went.", topic: "Bookkeeping", date: "2026-04-19", readTime: "5 min", href: "/resources/videos/reading-your-pnl" },
  { id: "6", type: "download", title: "Board reporting template (XLSX)", excerpt: "The exact board pack we ship clients — KPIs, cash, and commentary, ready to fill.", topic: "Fundraising", date: "2026-04-10", href: "/resources/downloads/board-reporting-template" },
  { id: "7", type: "article", title: "E-commerce margin: untangling the payout", excerpt: "How processor and platform fees hide your true gross margin — and how to recover it.", topic: "E-commerce", date: "2026-03-30", readTime: "7 min", href: "/resources/insights/ecommerce-margin" },
  { id: "8", type: "checklist", title: "Fundraise-readiness checklist", excerpt: "Get your data room and financials diligence-proof before you start the raise.", topic: "Fundraising", date: "2026-03-22", href: "/resources/checklists/fundraise-readiness" },
  { id: "9", type: "guide", title: "Bookkeeping basics for scaling teams", excerpt: "When to move from cash to accrual, add class tracking, and bring on a controller.", topic: "Scaling", date: "2026-03-14", readTime: "11 min", href: "/resources/guides/bookkeeping-for-scaling" },
  { id: "10", type: "download", title: "Cash-flow forecast model (Sheets)", excerpt: "A 13-week and 12-month forecast model, pre-built with the formulas we use.", topic: "Cash Flow", date: "2026-03-02", href: "/resources/downloads/cash-flow-model" },
  { id: "11", type: "article", title: "Five wins for close week", excerpt: "Small process changes that shave days off your monthly close immediately.", topic: "Bookkeeping", date: "2026-02-21", readTime: "5 min", href: "/resources/insights/close-week-wins" },
  { id: "12", type: "video", title: "What a fractional CFO actually does", excerpt: "Where senior finance counsel adds value before you can justify a full-time hire.", topic: "Scaling", date: "2026-02-10", readTime: "9 min", href: "/resources/videos/fractional-cfo" },
];

/**
 * Single data entry point for the UI.
 * Fetches from Sanity when configured; otherwise falls back to local content,
 * and also falls back on any fetch error so the page never breaks.
 */
export async function getResources(): Promise<Resource[]> {
  if (!isSanityConfigured) {
    return localSorted();
  }
  try {
    const { sanityClient } = await import("@/sanity/client");
    const { resourcesQuery } = await import("@/sanity/queries");
    const data = await sanityClient.fetch<Resource[]>(resourcesQuery);
    return data.length ? data.map((r) => ({ ...r, href: normalizeHref(r.href) })) : localSorted();
  } catch (err) {
    console.error("[resources] Sanity fetch failed, using local content:", err);
    return localSorted();
  }
}

/** Fetch a single resource by its detail slug, with the same fallback behavior. */
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  if (isSanityConfigured) {
    try {
      const { sanityClient } = await import("@/sanity/client");
      const { resourceBySlugQuery } = await import("@/sanity/queries");
      const data = await sanityClient.fetch<Resource | null>(resourceBySlugQuery, { slug });
      if (data) return { ...data, href: normalizeHref(data.href) };
    } catch (err) {
      console.error("[resources] Sanity by-slug fetch failed, using local content:", err);
    }
  }
  return localSorted().find((r) => slugOf(r) === slug) ?? null;
}

function localSorted(): Resource[] {
  return [...LOCAL]
    .map((r) => ({ ...r, href: normalizeHref(r.href) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
