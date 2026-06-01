# ACCOUNTCLERKS
### Complete Sitemap & Information Architecture
**Tagline:** *Beyond the Numbers* · **Version:** 1.0 · **Companion to:** `BRAND-DESIGN-SYSTEM.md`

> A world-class consulting-firm architecture: structured like McKinsey/Deloitte (capability × audience × insight), executed with the clarity of Stripe/Linear. Every page earns its place in a funnel — **discover → qualify → trust → convert** — and ends in a path to *Talk To An Expert*.

---

## Table of Contents
1. [IA Principles](#1--ia-principles)
2. [Navigation Rationale](#2--navigation-rationale-resolving-overlap)
3. [Global Navigation System](#3--global-navigation-system)
4. [Complete Sitemap](#4--complete-sitemap)
5. [URL & Taxonomy Architecture](#5--url--taxonomy-architecture)
6. [Page-by-Page Specifications](#6--page-by-page-specifications)
7. [Page Templates (scalable types)](#7--page-templates-scalable-page-types)
8. [Internal Linking Model](#8--global-internal-linking-model)
9. [SEO Architecture Summary](#9--seo-architecture-summary)
10. [Conversion Funnel Map](#10--conversion-funnel-map)

---

## 1 · IA Principles

1. **Three axes of navigation.** A visitor finds the firm through one of three mental models — *what I need* (Services), *who I am* (Who We Work With), or *how you think* (What We Do / Resources). The IA serves all three to the same destinations.
2. **Hub-and-spoke.** Every category is a hub page that frames the topic and links to spokes (detail pages). Spokes link back up and laterally. No orphan pages.
3. **One primary CTA, everywhere.** *Talk To An Expert* is the persistent conversion goal. Secondary CTAs feed it.
4. **Depth ≤ 3 clicks.** Any page is reachable within three clicks of home.
5. **Templates over bespoke.** Repeating page types (service detail, industry, case study, article) share a template so the site scales to 100+ pages without IA debt.
6. **Authority through evidence.** Capability claims are always one click from proof (case studies, outcomes, data).

---

## 2 · Navigation Rationale (resolving overlap)

The requested nav contains naturally overlapping concepts. We assign each a distinct, non-competing job:

| Nav item | Job (the question it answers) | Content type |
| --- | --- | --- |
| **Services** | "What can you do *for* me?" | The full menu of engagements (offerings) |
| **Financial Management** | "Show me your flagship capability in depth." | An elevated strategic pillar (the highest-value offering, given its own top-level prominence) |
| **Who We Work With** | "Do you understand *my* business?" | Industries + company stages |
| **What We Do** | "*How* do you work, and to what end?" | Approach, methodology, the platform, outcomes |
| **About** | "Can I trust the firm and the people?" | Story, team, careers, contact |
| **Resources** | "Do you actually know this space?" | Insights, guides, case studies, tools |
| **Talk To An Expert** | "I'm ready — get me to a human." | Primary conversion |

> **Distinction that prevents cannibalization:** *Services / Financial Management* describe **offerings** (the noun — what you buy). *What We Do* describes **method and value** (the verb — how it works and what changes). They cross-link but never duplicate.

---

## 3 · Global Navigation System

### 3.1 Primary navigation (sticky top bar, left → right)
```
[A] ACCOUNTCLERKS   Services▾  Financial Management▾  Who We Work With▾  What We Do▾  About▾  Resources▾      [ Talk To An Expert ]
```
- Logo → Home.
- Six dropdown items (mega-menus where noted).
- **Talk To An Expert** = persistent primary button (evergreen), right-aligned.
- Behavior: transparent over dark hero → glass `blur(14px)` + hairline on scroll (per design system §14.5).

### 3.2 Mega-menu contents
**Services ▾** (mega, 2 columns + feature)
```
CORE SERVICES                 ADVISORY                     ┌ FEATURED ─────────┐
· Bookkeeping                 · Fractional CFO             │ Not sure where to │
· Payroll & Contractors       · Controller Services        │ start?            │
· Tax-Ready Financials        · Cleanup & Catch-Up         │ [ Talk to an      │
                                                            │   expert → ]      │
→ View all services                                         └───────────────────┘
```
**Financial Management ▾** (mega)
```
PLAN                          REPORT                       ┌ FEATURED ─────────┐
· Cash-Flow Forecasting       · Reporting & Analytics      │ See a live close  │
· FP&A / Planning             · Board & Investor Reporting │ dashboard →       │
· Budgeting & Scenarios                                    └───────────────────┘
→ Explore Financial Management
```
**Who We Work With ▾**
```
BY INDUSTRY                   BY STAGE
· SaaS & Software             · Startups (pre-seed → A)
· E-commerce & Retail         · Scaling ($2M–$20M)
· Professional Services       · Established ($20M+)
· Healthcare & Practices
· Agencies & Studios
→ All industries
```
**What We Do ▾**
```
· Our Approach    · The Platform    · Outcomes & Results    → How we engage
```
**About ▾**
```
· Our Story    · Team    · Careers    · Contact
```
**Resources ▾**
```
· Insights (articles)   · Guides   · Case Studies   · Tools & Calculators   · Newsletter
→ Browse all resources
```

### 3.3 Utility navigation (top-right, pre-CTA)
`Client Login` · `Pricing` (text links, muted)

### 3.4 Footer (global)
```
COLUMN 1 — Brand            COLUMN 2 — Services         COLUMN 3 — Company       COLUMN 4 — Resources
[A] ACCOUNTCLERKS           Bookkeeping                 Our Story                Insights
"Beyond the Numbers."       Payroll                     Team                     Guides
Short positioning line.     Tax-Ready Financials        Careers                  Case Studies
[ Talk to an Expert ]       Fractional CFO              Contact                  Tools
                            Financial Management        Pricing                  Newsletter

BOTTOM BAR: © 2026 ACCOUNTCLERKS · Privacy · Terms · Security · Accessibility · [Social]
```
Footer doubles as a sitemap and passes link equity to every hub.

---

## 4 · Complete Sitemap

```
/  (Home)
│
├── /services/                                   ► Services hub
│   ├── /services/bookkeeping/
│   ├── /services/payroll/
│   ├── /services/tax/
│   ├── /services/fractional-cfo/
│   ├── /services/controller/
│   └── /services/cleanup-catch-up/
│
├── /financial-management/                       ► Flagship pillar hub
│   ├── /financial-management/cash-flow-forecasting/
│   ├── /financial-management/fpa/
│   ├── /financial-management/budgeting/
│   ├── /financial-management/reporting-analytics/
│   └── /financial-management/board-investor-reporting/
│
├── /who-we-work-with/                           ► Audiences hub
│   ├── /who-we-work-with/saas/
│   ├── /who-we-work-with/ecommerce/
│   ├── /who-we-work-with/professional-services/
│   ├── /who-we-work-with/healthcare/
│   ├── /who-we-work-with/agencies/
│   ├── /who-we-work-with/startups/
│   ├── /who-we-work-with/scaling/
│   └── /who-we-work-with/established/
│
├── /what-we-do/                                 ► Approach / value hub
│   ├── /what-we-do/our-approach/
│   ├── /what-we-do/platform/
│   └── /what-we-do/outcomes/
│
├── /about/                                      ► Firm hub
│   ├── /about/story/
│   ├── /about/team/
│   ├── /about/careers/
│   │   └── /about/careers/[role-slug]/
│   └── /about/contact/
│
├── /resources/                                  ► Content hub
│   ├── /resources/insights/
│   │   └── /resources/insights/[article-slug]/
│   ├── /resources/guides/
│   │   └── /resources/guides/[guide-slug]/
│   ├── /resources/case-studies/
│   │   └── /resources/case-studies/[client-slug]/
│   ├── /resources/tools/
│   │   ├── /resources/tools/runway-calculator/
│   │   └── /resources/tools/burn-multiple-calculator/
│   └── /resources/newsletter/
│
├── /talk-to-an-expert/                          ► Primary conversion
│   └── /talk-to-an-expert/thank-you/
│
├── /pricing/                                    (utility / secondary)
├── /login/                                      (external app handoff)
│
└── Legal & system
    ├── /privacy/   ├── /terms/   ├── /security/   ├── /accessibility/
    ├── /sitemap/   ├── /search/  └── /404 · /500
```

**Depth check:** every page ≤ 3 clicks from Home. Total: ~6 hubs, ~25 evergreen pages, 4 dynamic templates (article / case study / industry / role).

---

## 5 · URL & Taxonomy Architecture

- **Pattern:** lowercase, hyphenated, no trailing params, folder-based hierarchy mirrors nav: `/financial-management/fpa/`.
- **Stable & flat where it matters:** detail pages live one level under their hub; resources nest under type. Avoid dates in URLs (evergreen content).
- **Taxonomy for Resources:**
  - *Content type* → folder (`insights/`, `guides/`, `case-studies/`).
  - *Topic tags* (filter, not URL): Bookkeeping, Cash Flow, Fundraising, Tax, Payroll, Scaling.
  - *Industry tags* (filter): SaaS, E-commerce, Healthcare, Agencies, Professional Services.
  - *Stage tags*: Startup, Scaling, Established.
- **Canonicalization:** filtered/sorted resource lists `canonical` to the clean hub; pagination uses `rel=next/prev` + self-canonical.

---

## 6 · Page-by-Page Specifications

> Each spec = **Goals · User journey · Sections · CTAs · SEO · Internal linking.**

---

### 6.1 — Home `/`
**Goals**
- Reframe the category in 5 seconds: strategic partner, not a bookkeeper.
- Route the three visitor types (need / identity / curiosity) to the right hub.
- Build trust fast (proof, names, outcomes) and drive *Talk To An Expert*.

**User journey**
- *Entry:* brand search, referral, paid, organic for "outsourced finance / fractional CFO."
- *On page:* hero reframe → scan services → recognize self in audiences → see proof → CTA.
- *Exit to:* Services hub, an Industry page, a flagship Financial Management page, or the contact flow.

**Page sections**
1. Hero — statement + floating live-ledger visual + dual CTA (*Talk To An Expert* / *See how it works*).
2. Trust bar — client names + headline metric.
3. Services snapshot — bento of core offerings → Services hub.
4. Platform / "the close, visible" — dark product showcase → What We Do / Platform.
5. Who we work with — 4–6 audience tiles → audience pages.
6. Outcomes strip — 3 quantified results → /what-we-do/outcomes/.
7. Case study spotlight — one featured story → case study.
8. Testimonials — quote wall.
9. Insights teaser — 3 latest resources → Resources.
10. Final CTA — cinematic close → Talk To An Expert.

**CTAs:** Primary *Talk To An Expert* (hero, mid, footer-CTA). Secondary *See how it works*, *Explore services*, *Read the story*.

**SEO**
- URL `/` · Title: `ACCOUNTCLERKS — Strategic Finance & Accounting Partner` · Meta: "Beyond the numbers: clean books plus the strategic counsel to act on them. Bookkeeping, CFO advisory, and financial management for growing companies."
- H1: *Books that close the month for you.* (brand) — keep one H1.
- Schema: `Organization`, `WebSite` (+ Sitelinks SearchBox), `BreadcrumbList`.

**Internal linking:** links *down* to all six hubs (primary discovery surface); receives links from every page (logo + footer).

---

### 6.2 — Services hub `/services/`
**Goals:** present the full offering set; help visitors self-select an engagement; pass authority to each service detail.

**User journey:** "I know I need help with X" → scan services → open the relevant detail → convert. Or "I'm not sure" → *Talk To An Expert* triage CTA.

**Sections**
1. Intro hero — "Everything below the line, handled by people who read it."
2. Core services grid (Bookkeeping, Payroll, Tax) — cards → details.
3. Advisory services grid (Fractional CFO, Controller, Cleanup) — cards → details.
4. "Where Services meets Financial Management" — bridge module → flagship pillar.
5. How engagements work (3-step) → What We Do / Approach.
6. Proof: outcomes + one case study.
7. CTA band — *Not sure where to start? Talk to an expert.*

**CTAs:** per-card *Learn more*; section *Talk To An Expert*.

**SEO:** URL `/services/` · Title: `Finance & Accounting Services | ACCOUNTCLERKS` · H1: *Finance services that end in a recommendation.* · Keywords: outsourced accounting services, bookkeeping & CFO services. Schema: `Service` (itemList) + `BreadcrumbList`.

**Internal linking:** hub for all 6 service spokes; cross-links to Financial Management hub and Who We Work With (audience-relevant services).

---

### 6.3 — Financial Management hub `/financial-management/` (flagship pillar)
**Goals:** position the firm's highest-value, most differentiated capability — forward-looking financial strategy ("Beyond the Numbers" made literal); attract higher-ACV buyers (founders/heads of finance).

**User journey:** *Entry:* organic for "cash flow forecasting / FP&A / fractional CFO reporting," or stepped down from Services. *On page:* understand the strategic layer → see the platform/reporting → proof → high-intent CTA (often a CFO-level call).

**Sections**
1. Hero — "Numbers that tell you what to do next." + reporting/forecast visual.
2. The five capabilities grid → spokes (Forecasting, FP&A, Budgeting, Reporting & Analytics, Board/Investor Reporting).
3. Live dashboard showcase (dark) → Platform.
4. From close to decision — narrative module (the differentiator).
5. Outcomes (runway extended, board-ready, faster close) → Outcomes.
6. Featured case study (a scaling/SaaS client).
7. CTA — *Talk to a finance expert.*

**CTAs:** Primary *Talk To An Expert*; secondary *See a live close dashboard*.

**SEO:** URL `/financial-management/` · Title: `Financial Management & FP&A | ACCOUNTCLERKS` · H1: *Financial management, beyond the numbers.* · Keywords: financial management services, FP&A, cash flow forecasting, board reporting. Schema: `Service` + `BreadcrumbList`. **This is a pillar page** — long-form, the SEO authority hub for the topic cluster.

**Internal linking:** pillar that links to all 5 spokes and receives links from every related insight/guide (topic cluster model). Cross-links to Fractional CFO service.

---

### 6.4 — Who We Work With hub `/who-we-work-with/`
**Goals:** create instant relevance ("they get *my* business"); segment into industry + stage; route to tailored proof.

**User journey:** visitor identifies by industry or stage → opens their page → sees industry-specific pains, services, and a same-industry case study → converts with high confidence.

**Sections**
1. Hero — "Different books. Same clean close."
2. By Industry grid (5 tiles) → industry pages.
3. By Stage grid (3 tiles) → stage pages.
4. Why fit matters — short trust module.
5. Cross-section proof carousel (logos by sector).
6. CTA — *Find your fit — talk to an expert.*

**CTAs:** per-tile *Explore*; section *Talk To An Expert*.

**SEO:** URL `/who-we-work-with/` · Title: `Industries We Serve | ACCOUNTCLERKS` · H1: *Built for the way you run.* Schema: `CollectionPage` + `BreadcrumbList`.

**Internal linking:** hub for 8 audience spokes; each audience page cross-links to the most relevant Services + Financial Management spokes + a matching case study.

---

### 6.5 — What We Do hub `/what-we-do/`
**Goals:** explain *method and value* (not offerings); make the "partner, not vendor" claim tangible; differentiate via platform + outcomes.

**User journey:** evaluator comparing firms → wants to understand *how* it works and *what changes* → reassured by approach + outcomes → CTA.

**Sections**
1. Hero — the philosophy ("We close your books, then tell you what to do about them.").
2. Our Approach (3–4 step engagement model) → /our-approach/.
3. The Platform (product showcase) → /platform/.
4. Outcomes & Results (quantified) → /outcomes/.
5. Proof: case study + testimonial.
6. CTA — *See it on your books.*

**CTAs:** *Talk To An Expert*; *Tour the platform*; *See outcomes*.

**SEO:** URL `/what-we-do/` · Title: `Our Approach to Finance & Accounting | ACCOUNTCLERKS` · H1: *How we work — and what changes.* Schema: `WebPage` + `BreadcrumbList`.

**Internal linking:** links to its 3 spokes; cross-links to Services (offerings) and case studies (proof of approach).

---

### 6.6 — About hub `/about/`
**Goals:** humanize the firm; establish credibility, leadership, and culture; support recruiting and trust.

**User journey:** late-funnel trust check or candidate → reads story, meets team → contact or careers.

**Sections**
1. Hero — mission/vision statement.
2. Our Story snapshot → /about/story/.
3. Leadership/Team preview → /about/team/.
4. Values (from brand system).
5. Careers teaser → /about/careers/.
6. Contact block → /about/contact/ + Talk To An Expert.

**CTAs:** *Meet the team*, *See open roles*, *Talk To An Expert*.

**SEO:** URL `/about/` · Title: `About ACCOUNTCLERKS | Strategic Finance Partner` · H1: *The clerk who reads the book.* Schema: `AboutPage` + `Organization`.

**Internal linking:** to story/team/careers/contact; team bios link to authored insights (E-E-A-T).

---

### 6.7 — Resources hub `/resources/`
**Goals:** demonstrate expertise (E-E-A-T), capture top-of-funnel organic traffic, nurture via tools/newsletter, feed pillar pages.

**User journey:** organic searcher lands on an article/guide → related content → tool or newsletter → eventually a service/contact CTA.

**Sections**
1. Hero + search.
2. Featured guide (pillar) → guide.
3. Filterable grid: type + topic + industry filters.
4. Tools spotlight (calculators) → tools.
5. Newsletter signup.
6. Soft CTA — *Talk To An Expert* (contextual, not pushy).

**CTAs:** *Read*, *Use the calculator*, *Subscribe*, soft *Talk To An Expert*.

**SEO:** URL `/resources/` · Title: `Finance & Accounting Insights | ACCOUNTCLERKS` · H1: *Finance, read out loud.* Schema: `Blog`/`CollectionPage` + `BreadcrumbList`.

**Internal linking:** content cluster engine — every article links *up* to its pillar (Financial Management / Services) and *laterally* to related articles; tools link to relevant services.

---

### 6.8 — Talk To An Expert `/talk-to-an-expert/`
**Goals:** convert intent into a booked conversation with minimum friction; qualify lightly; reassure.

**User journey:** high-intent arrival from any CTA → sees what to expect → books / submits in < 2 min → thank-you with next steps.

**Sections**
1. Hero — "Twenty minutes to walk your books." + what you'll get.
2. Two-path chooser: **Book a call** (embedded scheduler) | **Send a message** (short form).
3. What to expect (3 steps) — reduces anxiety.
4. Trust strip — names, security note, response-time promise.
5. FAQ (pricing, switching, onboarding).
6. (No competing nav-heavy distractions — focused page.)

**Form fields (minimal):** Name · Work email · Company · Revenue range (select) · What you need (select) · Message (optional).

**CTAs:** Primary *Book my walkthrough* / *Send message*. Confirmation → `/talk-to-an-expert/thank-you/`.

**SEO:** URL `/talk-to-an-expert/` · Title: `Talk to a Finance Expert | ACCOUNTCLERKS` · Meta: book a free 20-minute walkthrough. Schema: `ContactPage`. (Thank-you page = `noindex`.)

**Internal linking:** *receives* links from every page (it's the conversion endpoint); links out only to FAQ/security/pricing for reassurance.

---

### 6.9 — Pricing `/pricing/` (utility)
**Goals:** set fixed-fee expectation, reduce price anxiety, qualify; route to contact for Scale/custom.
**Sections:** tiers (Essentials / Growth / Scale), what's included, comparison, FAQ, CTA.
**CTAs:** *Talk To An Expert* per tier. **SEO:** Title `Pricing | ACCOUNTCLERKS`; Schema `Offer`. **Linking:** from nav utility + footer + home pricing section.

---

## 7 · Page Templates (scalable page types)

### 7.1 — Service Detail template (e.g. `/services/bookkeeping/`)
**Goals:** explain one offering deeply; handle objections; convert at the right altitude.
**Journey:** problem-aware visitor → confirms scope/fit → proof → CTA.
**Sections:** (1) Hero (problem + outcome), (2) What's included (deliverables list), (3) How it works (3–4 steps), (4) Who it's for (links to audiences), (5) Proof (metric + mini case study), (6) Related services (cross-sell), (7) FAQ, (8) CTA band.
**CTAs:** *Talk To An Expert*; secondary *See pricing*.
**SEO:** Title `[Service] Services | ACCOUNTCLERKS`; H1 = service + value; keyword = "[service] for [audience]"; Schema `Service` + `FAQPage` + `BreadcrumbList`.
**Linking:** up to Services hub; lateral to 2–3 related services; to relevant audience pages; to a matching case study; from related insights.

### 7.2 — Industry / Stage template (e.g. `/who-we-work-with/saas/`)
**Goals:** prove domain understanding; map pains → services; convert with same-industry proof.
**Sections:** (1) Hero (industry-specific pain), (2) "What we see in [industry]" pains, (3) Services that fit (curated subset), (4) Industry metrics/benchmarks, (5) Same-industry case study, (6) Industry FAQ, (7) CTA.
**CTAs:** *Talk To An Expert*. **SEO:** Title `Finance & Accounting for [Industry] | ACCOUNTCLERKS`; keyword "accounting for [industry]"; Schema `Service` + `BreadcrumbList`.
**Linking:** up to Who We Work With; to curated services + financial-management spokes; to matching case study + industry insights.

### 7.3 — Case Study template (`/resources/case-studies/[client]/`)
**Goals:** turn outcomes into evidence; map result → relevant service.
**Sections:** (1) Hero (client + headline result), (2) Context/challenge, (3) What we did (services used, linked), (4) Results (quantified, `tabular-nums`), (5) Pull-quote, (6) Related case studies + services, (7) CTA.
**CTAs:** *Talk To An Expert*; *Explore [service used]*.
**SEO:** Title `[Client] Case Study | ACCOUNTCLERKS`; Schema `Article` + `BreadcrumbList`. **Linking:** to every service/industry it touches (high-value internal links); featured on home, hubs, and matching audience pages.

### 7.4 — Insight / Article template (`/resources/insights/[slug]/`)
**Goals:** rank for informational queries; demonstrate expertise; route to pillar + soft conversion.
**Sections:** (1) Title + author (bio link, E-E-A-T) + read time, (2) TOC, (3) body (H2/H3 outline), (4) inline CTA to relevant service/tool, (5) key takeaways, (6) related articles, (7) newsletter + soft CTA.
**SEO:** Title = query-led; Schema `Article` + `Person` (author) + `BreadcrumbList`; FAQ schema where applicable. **Linking (cluster):** *up* to its pillar page (Financial Management or a Service hub), *lateral* to 3+ related articles, *down* to a tool. Pillars receive these links to build topical authority.

### 7.5 — Guide / Pillar-lite template (`/resources/guides/[slug]/`)
Long-form, gated or ungated; same as article but with a downloadable asset CTA and stronger links to the matching service pillar.

### 7.6 — Career / Role template (`/about/careers/[role]/`)
Sections: role summary, responsibilities, requirements, culture/values, apply CTA. Schema `JobPosting`.

---

## 8 · Global Internal Linking Model

```
                         ┌──────────────┐
            ┌────────────│     HOME     │────────────┐
            │            └──────────────┘            │
            ▼                    ▼                    ▼
   ┌────────────────┐  ┌──────────────────┐  ┌────────────────┐
   │   SERVICES hub │◄─┤ FINANCIAL MGMT   │  │ WHO WE WORK     │
   │  (offerings)   │  │ hub (PILLAR)     │  │ WITH hub        │
   └───────┬────────┘  └────────┬─────────┘  └───────┬────────┘
           │ spokes             │ spokes             │ spokes
           ▼                    ▼                    ▼
   service details ◄──lateral──► fm spokes ◄────► industry/stage pages
           │                    ▲                    │
           └──────► CASE STUDIES ◄────────────────── ┘   (proof links into all)
                          ▲
                    INSIGHTS/GUIDES ──cluster links up to pillars
                          │
                          ▼
                  TALK TO AN EXPERT  ◄── every page's primary CTA
```

**Rules**
1. **Hub-and-spoke:** hubs link down to all spokes; spokes link up + to 2–3 lateral siblings.
2. **Topic clusters:** every insight/guide links *up* to its pillar (Financial Management or a Service) with descriptive anchors; pillars are the SEO authority sinks.
3. **Proof injection:** case studies link into the services and industries they prove; hubs feature them.
4. **Cross-axis bridges:** Services ↔ Financial Management ↔ Who We Work With link laterally so the three discovery models converge.
5. **Conversion endpoint:** *Talk To An Expert* is linked from every page; it links out minimally (FAQ/security/pricing only).
6. **Anchor discipline:** descriptive, keyword-aware anchors ("cash-flow forecasting"), never "click here." Max ~100 internal links/page; prioritize contextual over navigational.
7. **Footer = equity distributor:** passes link weight to all hubs + key spokes from every page.

---

## 9 · SEO Architecture Summary

**Topical authority (cluster) map**
| Pillar (authority hub) | Cluster content feeding it |
| --- | --- |
| `/financial-management/` | guides/articles on cash flow, FP&A, runway, board reporting, fundraising metrics |
| `/services/bookkeeping/` | "how to clean up books", "monthly close checklist", "accrual vs cash" |
| `/who-we-work-with/saas/` | "SaaS metrics", "ARR vs revenue", "SaaS COGS" |

**Technical SEO**
- One `<h1>` per page; logical H2/H3 outline mirrors sections.
- `BreadcrumbList` schema sitewide; visible breadcrumbs on all pages ≥ level 2.
- `Organization` + `WebSite` (+ SearchBox) on home; `Service`, `Article`, `FAQPage`, `JobPosting`, `Person`, `ContactPage` per type.
- XML sitemap at `/sitemap.xml` (indexable pages only); `noindex` on thank-you, search results, filtered list duplicates.
- Canonical tags on all pages; filtered/paginated resource lists canonicalize to clean hub.
- Clean folder URLs mirror IA; no orphan pages (every page has ≥1 contextual inbound link beyond nav).
- Core Web Vitals budget (per design system): image-led but performance-first; only `transform`/`opacity` animated.
- Open Graph + Twitter cards per template; case studies and insights get unique social images.

**Metadata governance:** Title ≤ 60 chars, brand suffix ` | ACCOUNTCLERKS`; meta description ≤ 155 chars, benefit-led, one CTA verb.

---

## 10 · Conversion Funnel Map

| Stage | Visitor mindset | Primary pages | Page CTA goal | Macro/micro conversion |
| --- | --- | --- | --- | --- |
| **Discover (TOFU)** | "I have a finance problem / question" | Insights, Guides, Tools, Home | Educate, capture | Newsletter, tool use *(micro)* |
| **Qualify (MOFU)** | "Could this firm help *me*?" | Services, Financial Management, Who We Work With | Build relevance | View 2+ pages, save/share *(micro)* |
| **Trust (MOFU→BOFU)** | "Are they credible? Proof?" | Case Studies, What We Do/Outcomes, About/Team, Testimonials | De-risk | Read case study, view pricing *(micro)* |
| **Convert (BOFU)** | "I'm ready to talk" | Talk To An Expert, Pricing | Book the call | Form submit / booked call *(macro)* |
| **Retain/Expand** | existing client | Login (app), Resources | Value & upsell | Login, engagement *(post-sale)* |

**Funnel principle:** every page offers *one* contextual next step toward *Talk To An Expert* — never a dead end, never a hard sell on educational pages.

---

*© 2026 ACCOUNTCLERKS — Beyond the Numbers. This IA is the source of truth for site structure, URLs, and linking. Pair with `BRAND-DESIGN-SYSTEM.md` for visual/UI execution.*
