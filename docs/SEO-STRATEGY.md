# ACCOUNTCLERKS — Complete SEO Strategy
**Tagline:** *Beyond the Numbers* · **Version:** 1.0
**Companion to:** `BRAND-DESIGN-SYSTEM.md`, `SITEMAP-INFORMATION-ARCHITECTURE.md`

> Goal: own the high-intent "strategic finance / outsourced accounting / fractional CFO" space for growing companies, and build topical authority through a Financial-Management content cluster. Built to be implemented directly against the Next.js app (App Router `metadata`, `sitemap.ts`, `robots.ts`, JSON-LD).

---

## 1 · Page Titles (≤ 60 chars, ` | ACCOUNTCLERKS` suffix)

| Route | Title tag | Primary keyword |
| --- | --- | --- |
| `/` | ACCOUNTCLERKS — Strategic Finance & Accounting Partner | strategic finance partner |
| `/services` | Finance & Accounting Services \| ACCOUNTCLERKS | outsourced accounting services |
| `/services#finance-accounting` | Finance & Accounting \| ACCOUNTCLERKS | finance and accounting services |
| `/services#management-accounts` | Management Accounts \| ACCOUNTCLERKS | management accounts service |
| `/services#outsourced-finance` | Outsourced Finance Solutions \| ACCOUNTCLERKS | outsourced finance function |
| `/financial-management` | Financial Management & FP&A \| ACCOUNTCLERKS | financial management services |
| `/who-we-work-with` | Industries We Serve \| ACCOUNTCLERKS | accounting for [industry] |
| `/growth-journey` | The Finance Growth Journey \| ACCOUNTCLERKS | business finance growth stages |
| `/about` | About Us — Strategic Finance Partner \| ACCOUNTCLERKS | about accountclerks |
| `/resources` | Finance & Accounting Insights \| ACCOUNTCLERKS | small business finance guides |
| `/resources/[slug]` | {Article Title} \| ACCOUNTCLERKS | query-led, per article |
| `/contact` | Talk to a Finance Expert \| ACCOUNTCLERKS | book a finance consultation |

**Rules:** one H1 per page (distinct from the `<title>`), front-load the keyword, no keyword stuffing, brand suffix everywhere for SERP recognition.

---

## 2 · Meta Descriptions (≤ 155 chars, benefit-led, one CTA verb)

| Route | Meta description |
| --- | --- |
| `/` | Beyond the numbers: clean books plus the counsel to act on them. Bookkeeping, CFO advisory & financial management for growing companies. Talk to an expert. |
| `/services` | Finance & Accounting, Management Accounts, and Outsourced Finance — handled by a real team that reads your numbers. Book a 20-minute walkthrough. |
| `/financial-management` | Cash-flow forecasting, FP&A, and board-ready reporting that turn a clean close into a clear decision. See it on your numbers. |
| `/who-we-work-with` | Finance tailored to your world — startups, e-commerce, retail, automotive & international. See the pains we fix and the outcomes we deliver. |
| `/growth-journey` | From raw data to real growth: the four stages we take every client through. Explore the journey. |
| `/about` | We keep the discipline of the original record-keeper and read the books out loud — in time to matter. Meet the team behind ACCOUNTCLERKS. |
| `/resources` | Plain-spoken guides, checklists, and tools from a finance team that does this daily. Search articles, guides & downloads. |
| `/contact` | Book a free 20-minute walkthrough of your books and get a fixed monthly quote. A dedicated clerk reconciling by next week. |

Implementation: per-route `export const metadata` (already in place); resource detail uses dynamic `generateMetadata`.

---

## 3 · Keyword Architecture

**Head terms (high volume, high competition):** outsourced accounting, bookkeeping services, fractional CFO, financial management services, management accounts.

**Mid-tail (primary targets — convertible):**
- outsourced finance function for startups
- monthly management accounts service
- cash flow forecasting service
- fractional CFO for SaaS / e-commerce
- bookkeeping for [industry]

**Long-tail (content cluster — TOFU):**
- how to forecast cash flow for a startup
- what should be in SaaS COGS
- month-end close checklist
- when to hire a fractional CFO
- how to read a P&L

**Intent mapping:**
| Intent | Keyword type | Page type |
| --- | --- | --- |
| Informational | long-tail questions | Resources (articles/guides) |
| Commercial | "[service] for [industry]" | Service + Industry pages |
| Transactional | "hire / outsourced [service]", "[service] near me" | Services, Contact, Local |

**Cluster model:** `/financial-management` is the **pillar**; every cash-flow / FP&A / forecasting / runway article links up to it with descriptive anchors. Each service page is a secondary pillar for its sub-cluster.

---

## 4 · Schema Markup (JSON-LD)

| Page | Types |
| --- | --- |
| Global (`/`) | `Organization`, `WebSite` (+ `SearchAction` sitelinks box) |
| All pages ≥ L2 | `BreadcrumbList` |
| `/services` + each service | `Service` (with `provider`, `areaServed`, `serviceType`) |
| `/financial-management` | `Service` + `FAQPage` |
| Industry pages | `Service` scoped to `audience` |
| `/resources/[slug]` | `Article` (+ `author` `Person`, `datePublished`) |
| `/contact` | `ContactPage` |
| Local (per office) | `LocalBusiness` / `AccountingService` (NAP, geo, hours) |
| Team bios | `Person` (for E-E-A-T) |

**`Organization` baseline (add to root layout `<head>` via a JSON-LD script):**
```json
{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "ACCOUNTCLERKS",
  "description": "Strategic finance and accounting partner for growing companies.",
  "url": "https://accountclerks.com",
  "logo": "https://accountclerks.com/logo.png",
  "slogan": "Beyond the Numbers",
  "sameAs": ["https://www.linkedin.com/company/accountclerks", "https://twitter.com/accountclerks"],
  "areaServed": "Worldwide",
  "knowsAbout": ["Bookkeeping","Management Accounts","Cash Flow Forecasting","FP&A","Fractional CFO"]
}
```
Implement as a server component injecting `<script type="application/ld+json">` per page; validate with Google Rich Results Test.

---

## 5 · Open Graph

Per-page OG via App Router `metadata.openGraph`. Defaults in root layout, overridden per route.
```ts
openGraph: {
  type: "website",
  siteName: "ACCOUNTCLERKS",
  title: "<page title>",
  description: "<meta description>",
  url: "https://accountclerks.com/<route>",
  images: [{ url: "/og/<route>.png", width: 1200, height: 630, alt: "<page>" }],
}
```
- **Images:** 1200×630, on-brand (ink + evergreen, serif headline). Use Next.js `opengraph-image.tsx` (dynamic OG) per route so resources auto-generate a card from the title.
- Resource articles use `type: "article"` with `publishedTime` and `authors`.

---

## 6 · Twitter Cards
```ts
twitter: {
  card: "summary_large_image",
  site: "@accountclerks",
  creator: "@accountclerks",
  title: "<page title>",
  description: "<meta description>",
  images: ["/og/<route>.png"],
}
```
Use `summary_large_image` sitewide; reuse the OG image. Add to root `metadata`, override per route.

---

## 7 · Technical SEO

- **Rendering:** static (SSG) for marketing pages + ISR for resources — fast TTFB, fully crawlable HTML (no client-only content gating). ✅ already implemented.
- **Sitemap:** `app/sitemap.ts` (dynamic, includes resource slugs). ✅ Submit to Search Console + Bing Webmaster.
- **Robots:** `app/robots.ts` → allow all, references sitemap. ✅
- **RSS:** `/resources/feed.xml` for distribution & discovery. ✅
- **Canonicals:** self-canonical per page; filtered resource lists canonicalize to `/resources` (avoid duplicate-content from query params).
- **URLs:** lowercase, hyphenated, folder hierarchy mirrors IA; no dates in URLs (evergreen). ✅
- **Core Web Vitals:** animate only `transform`/`opacity` (GPU); `next/font` (no layout shift, self-hosted); responsive `next/image` for any photography; lazy-load below the fold; reduced-motion respected. Target LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **Headings:** single `<h1>`, logical `<h2>/<h3>` outline mirroring sections. ✅
- **Internal linking:** hub-and-spoke + topic clusters + footer equity distribution (per IA doc).
- **Accessibility = SEO:** semantic landmarks, alt text, focus states, color contrast (AA verified in brand doc).
- **hreflang:** add when international entities launch (`en`, `en-GB`, etc.).
- **Monitoring:** Search Console (coverage, queries, CWV), Bing Webmaster, Ahrefs/Semrush for rank + backlink tracking. 404 monitoring + redirects map on any URL change.

---

## 8 · Local SEO

For each physical office / served metro:
- **Google Business Profile:** category *Accounting / Bookkeeping service*; complete NAP, hours, services, photos, posts. Collect & respond to reviews (target 4.7★+).
- **Consistent NAP** across site footer, GBP, and citations (Yelp, Clutch, local directories, industry bodies).
- **Local landing pages** (`/locations/[city]`) when there's genuine local presence — unique content, embedded map, `LocalBusiness` schema, local testimonials. Avoid thin doorway pages.
- **`AccountingService` schema** with `geo`, `openingHours`, `priceRange`, `areaServed`.
- **Local link building:** chambers of commerce, local startup/accelerator partners, sponsorships.
- **Reviews schema** only on genuine, policy-compliant review content.

---

## 9 · Blog / Content Strategy

**Engine:** Sanity-driven Resources hub (articles, guides, checklists, videos, downloads) already built with search + filtering + detail pages.

**Cadence:** 2–4 publishes/month, each mapped to a cluster and a target query.

**Cluster plan (feeds `/financial-management` + service pillars):**
| Cluster | Sample posts | Links up to |
| --- | --- | --- |
| Cash flow | "How to forecast cash flow", "13-week cash model", "Runway explained" | `/financial-management` |
| Month-end | "Close checklist", "Accrual vs cash", "5 close-week wins" | `/services#finance-accounting` |
| Fundraising | "Fundraise-readiness checklist", "Board pack template", "Burn multiple" | `/financial-management` |
| SaaS finance | "SaaS COGS", "ARR vs revenue", "SaaS metrics that matter" | `/who-we-work-with/saas` |
| Scaling | "When to hire a fractional CFO", "Cash → accrual", "Class tracking" | `/services#outsourced-finance` |

**Per-post SEO checklist:** target one primary + 2–3 secondary keywords; query-led H1; TOC; descriptive internal links up to pillar + 3 laterals; `Article` + author `Person` schema; unique OG image; FAQ schema where the query warrants; CTA to the relevant service.

**Formats for links & authority:** original benchmark data ("State of SMB cash flow"), free tools (runway / burn calculators — linkable assets), downloadable templates (lead capture), expert quotes for digital PR.

**Distribution:** newsletter (the monthly read), LinkedIn, RSS, repurpose guides → short videos.

**Measurement:** organic sessions, keyword rankings (pillar + cluster), assisted conversions to `/contact`, newsletter signups, backlinks earned per asset.

---

## 10 · Roadmap

| Phase | Focus |
| --- | --- |
| **0–30 days** | Submit sitemap, verify Search Console/Bing, ship `Organization`/`Article` JSON-LD + dynamic OG images, baseline rank tracking. |
| **1–3 months** | Publish 2 pillar guides + 6 cluster articles, build internal links, launch 2 calculators, optimize titles/meta from CTR data. |
| **3–6 months** | Local pages + GBP (if applicable), digital PR for the data/tool assets, FAQ schema rollout, prune/merge thin content. |
| **6–12 months** | hreflang for international, topical expansion into adjacent clusters, backlink campaigns, CWV tuning from field data. |

*© 2026 ACCOUNTCLERKS — Beyond the Numbers.*
