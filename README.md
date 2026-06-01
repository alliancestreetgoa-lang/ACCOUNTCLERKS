# ACCOUNTCLERKS — Production Website

A complete, production-ready marketing site for a strategic finance consultancy.
**Beyond the Numbers.**

## Stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router, RSC, ISR) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** + design tokens (`tailwind.config.ts`) |
| Animation | **Framer Motion** (reveals, transitions, springs) + **GSAP/ScrollTrigger** (hero parallax, pinned growth journey) |
| CMS | **Sanity** (decoupled Studio in `studio/`, fetched via `next-sanity`) |
| Forms | Multi-step lead form → API route → **Resend** email + **CRM** webhook/HubSpot |
| Scheduling | **Calendly** inline embed |
| SEO | `metadata` API, dynamic `sitemap.ts`, `robots.ts`, RSS, JSON-LD-ready |

React 19. Fully responsive. `prefers-reduced-motion` respected throughout. `npm run build` passes with 27 prerendered routes.

## Folder structure

```
accountclerks-app/
├── app/                          # App Router — routes, layouts, route handlers
│   ├── layout.tsx                # Root: fonts, Navbar, Footer, LoadingScreen, ScrollProgress
│   ├── template.tsx              # Per-navigation page transition
│   ├── globals.css               # Tailwind + tokens + reduced-motion
│   ├── page.tsx                  # Home (mounts Hero)
│   ├── services/page.tsx
│   ├── financial-management/page.tsx
│   ├── who-we-work-with/page.tsx
│   ├── growth-journey/page.tsx
│   ├── about/page.tsx
│   ├── resources/
│   │   ├── page.tsx              # Hub (search + filter, ISR)
│   │   ├── [slug]/page.tsx       # Article/guide detail (Portable Text, SSG+ISR)
│   │   └── feed.xml/route.ts     # RSS feed
│   ├── contact/page.tsx          # Multi-step form + Calendly
│   ├── api/contact/route.ts      # Lead → email (Resend) + CRM
│   ├── sitemap.ts                # Dynamic sitemap (incl. resource slugs)
│   └── robots.ts
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── motion/                   # LoadingScreen, ScrollProgress
│   ├── sections/                 # Hero, PageHero, FinancialDashboard, GrowthJourney,
│   │                             #   IndustryExplorer, ResourcesHub, ContactForm, CalendlyEmbed
│   ├── charts/Charts.tsx         # AreaChart, BarChart, DonutGauge, Sparkline (animated SVG)
│   ├── ui/                       # Button, primitives (Section/Eyebrow/SectionHead),
│   │                             #   Reveal, AnimatedCounter, icons
│   └── PortableBody.tsx          # Brand-styled Portable Text renderer
├── lib/                          # motion presets, resources data layer, site utils, cn()
├── sanity/                       # Client-side CMS access (env, client, GROQ queries)
├── studio/                       # SEPARATE Sanity Studio package (React 18) — config, schemas, seed
├── tailwind.config.ts            # Evergreen/neutral/brass tokens, fonts, shadows, easings
├── next.config.mjs
└── .env.local.example
```

**Reusable-component architecture:** routes compose from `ui` primitives + `sections` + `charts`; design tokens live once in `tailwind.config.ts` and `globals.css`; motion presets live once in `lib/motion.ts`. Adding a page = composing existing parts.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in as needed (all optional — graceful fallbacks)
npm run dev                        # http://localhost:3000
npm run build && npm start         # production
```

## Sanity CMS (Studio is a separate package)

The web app reads content via `next-sanity`; editors use the standalone Studio in `studio/`
(kept on React 18, independent of the app's React 19 — no dependency conflict).

```bash
# 1. Web app — point it at your project
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx" >> .env.local

# 2. Studio — separate install + run
cd studio
npm install
echo "SANITY_STUDIO_PROJECT_ID=xxxx" > .env
npm run seed       # import the 12 starter resources
npm run dev        # http://localhost:3333  (npm run deploy → <project>.sanity.studio)
```

Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the Resources hub serves bundled local content (`lib/resources.ts`) so everything works out of the box.

## Integrations (all optional, env-gated, with fallbacks)

| Feature | Env | Without it |
| --- | --- | --- |
| Scheduling | `NEXT_PUBLIC_CALENDLY_URL` | Shows a fallback CTA |
| Email notify | `RESEND_API_KEY`, `CONTACT_NOTIFY_EMAIL` | Lead logged server-side |
| CRM | `CRM_WEBHOOK_URL` *or* `HUBSPOT_PORTAL_ID`+`HUBSPOT_FORM_GUID` | Lead logged server-side |
| CMS | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Local content |
| Canonical URLs | `NEXT_PUBLIC_SITE_URL` | Defaults to accountclerks.com |

## Companion docs (`docs/`)
- `docs/BRAND-DESIGN-SYSTEM.md` — colors, type, components, motion
- `docs/SITEMAP-INFORMATION-ARCHITECTURE.md` — sitemap, IA, internal linking
- `docs/HOMEPAGE-WIREFRAME.md` — section-by-section homepage spec
- `docs/SEO-STRATEGY.md` — titles, meta, schema, technical/local/blog SEO

© 2026 ACCOUNTCLERKS — Beyond the Numbers.
