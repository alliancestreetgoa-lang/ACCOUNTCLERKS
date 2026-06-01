# ACCOUNTCLERKS — Homepage Wireframe
### Complete Section-by-Section Specification
**Tagline:** *Beyond the Numbers* · **Version:** 1.0
**Companions:** `BRAND-DESIGN-SYSTEM.md` (tokens/motion) · `SITEMAP-INFORMATION-ARCHITECTURE.md` (links/funnel)

> 11 sections, paced dark↔light so the scroll feels composed. Every section: **Headline · Subheadline · Layout · Animations · User interactions · Mobile · Desktop · Conversion goal.** Motion follows the design-system tokens; reveals never animate from `scale(0)`, only `transform`/`opacity`, all UI under 300ms, fully `prefers-reduced-motion` aware.

---

## Global frame

**Surface pacing (top → bottom)**
```
1 Hero ─ INK  │ 2 Services ─ cream │ 3 Financial Mgmt ─ INK │ 4 Growth ─ paper
5 Who We Work With ─ cream │ 6 How We Work ─ paper │ 7 Knowledge Hub ─ cream
8 About ─ INK │ 9 Meet the Team ─ paper │ 10 Testimonials ─ cream │ 11 Final CTA ─ INK
```
**Grid:** 12-col, 1200px max, 24px gutter (desktop) · 4-col, 16–20px margin (mobile).
**Shared motion tokens:** `--ease-out: cubic-bezier(.23,1,.32,1)`, press `scale(.97)`/150ms, reveal `opacity 0→1 + translateY(18px) + scale(.985→1)`/640–720ms, stagger 60ms.
**Persistent CTA:** *Talk To An Expert* (evergreen pill) in sticky nav + a sticky mobile bottom CTA after the hero scrolls out.
**Sticky nav:** transparent over Hero → glass `blur(14px)` + hairline on scroll.

---

## 1 · HERO  `INK`

**Headline:** *Finance that goes beyond the numbers.*
**Subheadline:** A dedicated finance team plus software that reconciles in real time — so your books are always closed, audit-ready, and you always know the next move.

**Layout** — Giant statement, **bottom-left copy over a cinematic ink gradient** (deliberately *not* the default text-left/image-right). Right side: a floating glass "live ledger / close" panel.
```
DESKTOP (≥1024)
┌───────────────────────────────────────────────────────────────┐
│ [A] ACCOUNTCLERKS  Services▾ Financial Mgmt▾ …  [Talk To Expert]│ sticky, transparent
│                                                                 │
│                                            ╭──────────────────╮ │
│                                            │ ◷ June · Closed  │ │
│  EYEBROW — Strategic finance, done for you │ $284,910.42      │ │
│  Finance that goes                         │ ∿∿∿ sparkline    │ │
│  beyond the numbers.        (serif H1)     │ ✓ Stripe payout  │ │
│  ── subhead, 2 lines ──                    │ ✓ Payroll run    │ │
│  [ Talk To An Expert ]  [ See how it works ▸]╰────────────────╯ │
│  Closed by the 5th · 480+ clients · 99.8% accuracy              │
└───────────────────────────────────────────────────────────────┘
```
```
MOBILE
┌─────────────────────┐
│ [A] ACCOUNTCLERKS  ☰│
│ EYEBROW             │
│ Finance that goes   │  serif H1, 3 lines
│ beyond the numbers. │
│ subhead (2–3 lines) │
│ [ Talk To An Expert]│  full-width primary
│ [ See how it works ]│  full-width ghost
│ ╭─────────────────╮ │  ledger BELOW copy
│ │ live close panel│ │  (reorder, don't shrink)
│ ╰─────────────────╯ │
│ 5th · 480+ · 99.8%  │
└─────────────────────┘
```

**Animations**
- On load: staggered entrance (eyebrow → H1 → subhead → CTAs → meta), 60–80ms apart, `ease-out`, ~700ms; H1 may use a subtle word-by-word reveal.
- Ledger panel enters from `scale(.985)+opacity` with +60ms delay; sparkline path draws once (`stroke-dashoffset`, ~900ms, then idle).
- Nav glass crossfades in on first scroll (~24px threshold).

**User interactions**
- CTA buttons: `scale(.97)` press; hover darkens primary (`@media hover`).
- "See how it works" → smooth-scrolls to Financial Management (§3).
- Ledger sparkline tooltip on hover (instant after first); panel has subtle parallax drift (±6px, spring) — decorative, disabled under reduced-motion.

**Conversion goal:** Reframe category + drive the primary macro CTA (*Talk To An Expert*); secondary = engage scroll via "See how it works."

---

## 2 · SERVICES  `cream`

**Headline:** *Everything below the line, handled by people who read it.*
**Subheadline:** A real finance team owns your books end to end. The software just makes the month-end disappear.

**Layout** — Section intro (top-left) + **pristine gapless bento** of core + advisory services.
```
DESKTOP
EYEBROW — What we do for you
Everything below the line, handled by people who read it.
┌───────────────────┬───────────┐ ┌───────────┬───────────┐
│ Bookkeeping       │ Payroll & │ │ Tax-Ready │ Fractional│
│ [feature · large] │ Contract. │ │ Financials│ CFO       │
└───────────────────┴───────────┘ └───────────┴───────────┘
┌───────────┬───────────┬───────────────────────────────────┐
│ Controller│ Cleanup & │  → View all services              │
│           │ Catch-Up  │                                   │
└───────────┴───────────┴───────────────────────────────────┘
```
```
MOBILE
EYEBROW + headline
┌─────────────────┐
│ Bookkeeping     │  bento → single column,
└─────────────────┘  full-width stacked cards
┌─────────────────┐
│ Payroll …       │
└─────────────────┘  (6 cards total)
→ View all services
```

**Animations**
- Cards reveal on scroll-into-view, staggered 50–60ms across the grid, `ease-out`.
- Hover: card surface shifts `cream → cream-2` (220ms), icon nudges +2px. No layout-affecting properties animated.

**User interactions**
- Whole card is clickable → service detail page; cursor pointer; focus-visible ring.
- Hover reveals a `Learn more ▸` link-arrow that slides 3px.

**Conversion goal:** Self-select an engagement → route to service detail (MOFU qualify). Micro: card click-through.

---

## 3 · FINANCIAL MANAGEMENT  `INK` (flagship)

**Headline:** *Numbers that tell you what to do next.*
**Subheadline:** Forecasting, FP&A, and board-ready reporting — the strategic layer that turns a clean close into a clear decision.

**Layout** — Dark showcase. **Left two-thirds: live dashboard mockup; right third: copy + capability list.** Breaks the bento rhythm with a single immersive product moment.
```
DESKTOP
╭────────────────────────────────╮   EYEBROW — One ledger, every account
│ ACCOUNTCLERKS · Close dashboard │   Numbers that tell you
│ Net income  Runway   Cash       │   what to do next.
│ $71,402▲   14.6mo   $284,910    │   subhead, 2 lines
│ ∿∿ cash-flow area chart         │   ✓ Cash-flow forecasting
│ Recon: Operating ▰▰▰ 100%       │   ✓ FP&A & budgeting
│        Card      ▰▰▰ 100%       │   ✓ Board & investor reporting
╰────────────────────────────────╯   Explore Financial Management ▸
```
```
MOBILE
EYEBROW + headline + subhead
╭─────────────────╮   dashboard ON TOP
│ close dashboard │   (visual leads)
╰─────────────────╯
✓ Cash-flow forecasting
✓ FP&A & budgeting
✓ Board & investor reporting
Explore Financial Management ▸
```

**Animations**
- Dashboard reveals as one unit (`opacity+scale .985`), then internal elements micro-stagger: KPIs count up once (number tween ~800ms, `ease-out`), recon bars fill left→right, chart area draws.
- Capability list items stagger in 60ms.

**User interactions**
- KPI count-up fires once on scroll-in (not on every view); respects reduced-motion (shows final value instantly).
- Dashboard tabs/segments are hover-highlightable (implied interactivity); `Explore` link-arrow animates.

**Conversion goal:** Establish the high-value differentiator; route high-intent buyers to the Financial Management pillar (higher ACV). Micro: pillar click-through.

---

## 4 · GROWTH & EXPANSION  `paper`

**Headline:** *Built to scale with the next stage, not just this one.*
**Subheadline:** From first hire to new entity, your finance function flexes as you grow — fundraising support, multi-entity consolidation, and the reporting your next round expects.

**Layout** — **Horizontal stage timeline / stepped path** (narrative spine: *journey*). Three milestones with a connecting rule; alternating up/down captions for editorial rhythm.
```
DESKTOP
EYEBROW — Growth & expansion        Built to scale with the next stage.
   ●───────────────●───────────────●───────────────●
 Seed            Series A         Scale          Multi-entity
 "Clean from   "Investor-ready  "Fractional    "Consolidation
  day one"      reporting"       controller"     & rev-rec"
   [card]          [card]          [card]          [card]
                              [ Talk To An Expert ]
```
```
MOBILE
EYEBROW + headline + subhead
● Seed — clean from day one        vertical timeline,
│                                  milestone cards stack
● Series A — investor-ready
│
● Scale — fractional controller
│
● Multi-entity — consolidation
[ Talk To An Expert ]
```

**Animations**
- Connecting line draws as the section enters (`clip-path inset` or `stroke-dashoffset`, ~900ms, `ease-in-out`).
- Milestone nodes pop in sequence (60–80ms stagger) as the line passes each — synced to feel like progression.
- Pinned-scroll option (desktop): horizontal scrub through stages on long scroll (progressive enhancement; degrades to static + reveal).

**User interactions**
- Hover a milestone → its card lifts (`translateY(-4px)`) + line segment highlights evergreen.
- On scrub variant: scroll controls horizontal position; keyboard arrows step stages (accessible fallback).

**Conversion goal:** Show longevity/fit for scaling companies; reduce "we'll outgrow them" objection. Micro: engagement with stages → CTA.

---

## 5 · WHO WE WORK WITH  `cream`

**Headline:** *Different books. Same clean close.*
**Subheadline:** We speak your industry's numbers — from SaaS metrics to e-commerce margin to multi-provider payroll.

**Layout** — Intro (centered) + a 5-up industry tile row over a 3-up stage row. Image-led tiles (color-blocked swatches per industry).
```
DESKTOP
            Different books. Same clean close.
[ SaaS ][ E-commerce ][ Pro Services ][ Healthcare ][ Agencies ]
            ── By stage ──
   [ Startups ]      [ Scaling ]      [ Established ]
```
```
MOBILE
headline + subhead (centered)
┌──────────┬──────────┐   industries 2-up grid
│ SaaS     │ E-comm   │
├──────────┼──────────┤
│ Pro Svc  │Healthcare│
├──────────┴──────────┤
│ Agencies            │
└─────────────────────┘
[Startups][Scaling][Established]  stage chips, horizontal scroll
```

**User interactions**
- Tiles clickable → industry/stage page; hover lifts tile + reveals industry label/CTA over the swatch.
- Optional: hovering a tile tints the section background subtly toward that industry's accent (palette-locked).

**Animations**
- Tiles reveal in a diagonal stagger (masonry energy), 50ms steps.
- Hover: `translateY(-4px)` + swatch gradient shifts; image crop subtle scale (1.0→1.03) under `@media hover` only.

**Conversion goal:** Instant relevance ("they get *my* business") → route to tailored audience page + matching case study. Micro: tile click-through.

---

## 6 · HOW WE WORK  `paper`

**Headline:** *We close your books, then tell you what to do about them.*
**Subheadline:** A simple, repeatable rhythm: connect, reconcile, report, recommend — every month, on time.

**Layout** — **4-step process**, left-rail vertical numerals (oversized, structural — the one "second-read" numeral motif) + step content; sticky-pinned on desktop.
```
DESKTOP (pinned left rail, scrolling steps)
We close your books, then tell you what to do about them.
01 │ Connect    — Link banks, cards, processors once.
02 │ Reconcile  — Daily matching by your dedicated clerk.
03 │ Report     — Closed by the 5th, audit-ready.
04 │ Recommend  — The monthly read: what changed, what's next.
                                   [ See our approach ▸ ]
```
```
MOBILE
headline + subhead
01  Connect — link accounts once
02  Reconcile — daily, by your clerk
03  Report — closed by the 5th
04  Recommend — what changed, what's next
[ See our approach ▸ ]
```

**Animations**
- Desktop: left rail pins; active step's numeral scales/colors evergreen as it enters view (pinned narrative energy). Content cross-fades with subtle blur to mask the swap (`filter: blur(2px)` during transition).
- Mobile: steps reveal sequentially with 60ms stagger; numerals fade up.

**User interactions**
- Scroll drives the active step (pinned). Numerals are clickable anchors that smooth-scroll/advance. Reduced-motion: rail un-pins, all steps static.

**Conversion goal:** De-risk via transparency of method ("not a black box") → push to What We Do / Approach + CTA. Micro: approach click-through.

---

## 7 · KNOWLEDGE HUB  `cream`

**Headline:** *Finance, read out loud.*
**Subheadline:** Plain-spoken guides, benchmarks, and tools from a team that does this every day.

**Layout** — One featured guide (large, left) + 2–3 latest insights (right) + a tools/calculator strip. Newsletter inline.
```
DESKTOP
EYEBROW — Knowledge Hub            Finance, read out loud.
┌──────────────────────────┐ ┌───────────────────────┐
│ FEATURED GUIDE            │ │ · Runway, explained   │
│ "The founder's guide to   │ │ · SaaS COGS done right│
│  cash-flow forecasting"   │ │ · 5 close-week wins   │
│ [ Read the guide ▸ ]      │ └───────────────────────┘
└──────────────────────────┘  Tools: [Runway calc][Burn calc]
[ Subscribe to the monthly read → email ____ ]
```
```
MOBILE
EYEBROW + headline + subhead
┌─────────────────┐  featured guide card
│ FEATURED GUIDE  │
└─────────────────┘
· Runway, explained        latest list
· SaaS COGS done right
· 5 close-week wins
[Runway calc][Burn calc]   tools, horiz scroll
[ Subscribe — email ____ ]
```

**Animations**
- Cards fade-up stagger; featured card slightly leads.
- Newsletter input: focus expands border to evergreen + subtle glow (border-color/box-shadow only).

**User interactions**
- Cards clickable → article/guide; tools → calculators (interactive on their pages).
- Newsletter: inline validation, success state swaps button label to a check (no layout shift); double-opt-in.

**Conversion goal:** E-E-A-T + TOFU capture (newsletter, tool use) — soft, not pushy. Micro: subscribe / article click.

---

## 8 · ABOUT US  `INK`

**Headline:** *The clerk who reads the book.*
**Subheadline:** We kept the discipline of the original record-keeper and dropped the dust. Today the clerk doesn't just keep the book — they read it, and help you write the next chapter.

**Layout** — **Editorial brand moment** on dark: large serif statement (off-grid editorial offset), short story paragraph, values as a thin horizontal list, link to full story. Image: abstract data-as-art / paper-rule texture.
```
DESKTOP
EYEBROW — About us
The clerk who reads
the book.                    [ abstract data-art / brass rule ]
── story paragraph, 3 lines ──
Precision · Say the real thing · Own the outcome · Earn trust
[ Read our story ▸ ]
```
```
MOBILE
EYEBROW + serif statement
[ abstract data-art panel ]
story paragraph (3–4 lines)
Values (wrapped list)
[ Read our story ▸ ]
```

**Animations**
- Serif headline reveals line-by-line with `ease-out`; brass rule draws horizontally.
- Values list items fade in left→right, 50ms steps.

**User interactions**
- "Read our story" link-arrow → /about/story/. Minimal interaction (this is a reflective beat — calm by design).

**Conversion goal:** Humanize + reinforce positioning (BOFU trust). Micro: story click-through; primes the team + testimonials below.

---

## 9 · MEET THE TEAM  `paper`

**Headline:** *Real people own your books.*
**Subheadline:** Not a faceless queue — a dedicated clerk and an advisor who know your business by name.

**Layout** — Intro (top-left) + a 4–5 card team row (portrait, name, role, credential). Calm grid, generous whitespace.
```
DESKTOP
EYEBROW — Meet the team        Real people own your books.
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ ◌    │ │ ◌    │ │ ◌    │ │ ◌    │ │ ◌    │
│ Name │ │ Name │ │ Name │ │ Name │ │ Name │
│ Role │ │ Role │ │ Role │ │ Role │ │ Role │
│ CPA  │ │ FP&A │ │ Tax  │ │ Lead │ │ CFO  │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
                                  [ See the full team ▸ ]
```
```
MOBILE
EYEBROW + headline + subhead
┌──────┬──────┐   team 2-up grid,
│ ◌Name│ ◌Name│   or horizontal swipe carousel
│ Role │ Role │
└──────┴──────┘
[ See the full team ▸ ]
```

**Animations**
- Cards reveal in a gentle stagger (60ms); portraits fade from a slight desaturation to full (editorial grade).
- Hover: portrait subtle scale (1.0→1.03) + name underline grows (`@media hover`).

**User interactions**
- Card → team member bio (links to authored insights for E-E-A-T). Mobile: swipeable carousel with momentum + snap.

**Conversion goal:** Trust through faces + credentials (BOFU). Micro: bio/team click-through.

---

## 10 · TESTIMONIALS  `cream`

**Headline:** *The month-end stopped being ours.*
**Subheadline:** Founders, operators, and finance leads on what changed after the handoff.

**Layout** — **Off-grid quote wall**: one large dark lead quote (spans two rows) + two supporting quotes. Logos/names with monogram avatars.
```
DESKTOP
EYEBROW — In their words      The month-end stopped being ours.
┌── lead quote (DARK, 2 rows) ──┐ ┌ "Our CPA asked who did our books." ┐
│ "We handed off two years of   │ │  — Jonah Marlow, Marlow & Co.      │
│  half-done books on a Friday…"│ └────────────────────────────────────┘
│  — Daria Reyes, Hearthwood    │ ┌ "I know our runway on a Monday."   ┐
└───────────────────────────────┘ │  — Priya Tan, Northbeam            ┘
```
```
MOBILE
EYEBROW + headline + subhead
┌───────────────────┐  lead quote (dark) first
│ "We handed off…"  │
│ — Daria Reyes     │
└───────────────────┘
┌───────────────────┐  supporting quotes stack
│ "Our CPA asked…"  │
└───────────────────┘
```

**Animations**
- Quotes fade-up staggered; lead quote leads. Optional slow auto-advance on a logo strip — *static by default* (no mosquito-logo marquee).
- Quote-mark glyph fades in slightly before its text.

**User interactions**
- Static by default. If carousel: pause-on-hover, swipe on mobile, dot controls (real, accessible). Optional `Read the case study ▸` link under a quote → that client's case study.

**Conversion goal:** Social proof / evidence (BOFU de-risk). Micro: case-study click-through.

---

## 11 · FINAL CTA  `INK`

**Headline:** *Close your last messy month-end.*
**Subheadline:** Twenty minutes to walk your books, a fixed monthly quote, and a dedicated clerk reconciling by next week.

**Layout** — Cinematic centered close (mirrors the hero's ink world for bookend cohesion). Single dominant primary action + reassurance line + footer below.
```
DESKTOP
            EYEBROW — Hand off the books this month
            Close your last messy month-end.   (serif, centered)
            subhead, centered
            [ Talk To An Expert ]   [ See pricing ]
            No commitment to book · Switch in under a week
────────────────────────────────────────────────────────────
[A] ACCOUNTCLERKS   Services   Company   Resources    © 2026   (footer)
```
```
MOBILE
EYEBROW + serif headline (centered)
subhead (centered)
[ Talk To An Expert ]   full-width primary
[ See pricing ]         full-width ghost
fineprint line
── footer (stacked columns) ──
```

**Animations**
- Section content fades up on entry (60ms stagger); evergreen radial glow breathes in behind the headline (slow, ~1.2s, decorative).
- Primary CTA: standard press `scale(.97)`; subtle idle shimmer is **avoided** (overused; distracts from the action).

**User interactions**
- Primary → /talk-to-an-expert/; secondary → /pricing/. Mobile sticky bottom CTA merges/hands off here (hide the floating bar once this section is in view to avoid duplication).

**Conversion goal:** The macro conversion — book the call. Single unmistakable action; secondary feeds the same funnel via pricing.

---

## Global interactions & accessibility

- **Reveal system:** one `IntersectionObserver`, `threshold ~0.12`, fires once; elements carry `data-reveal` + `--d` delay. Reduced-motion → everything visible, no transforms.
- **Hover gating:** every hover transform wrapped in `@media (hover: hover) and (pointer: fine)` (no false triggers on touch).
- **Performance:** animate only `transform`/`opacity` (+`box-shadow`/`border-color` for cards); count-ups/draws fire once; lazy-load below-fold imagery; images sized to prevent CLS.
- **Keyboard & focus:** logical tab order top→bottom; visible focus ring (`2px evergreen`, `2px` offset); carousels operable by keyboard; skip-to-content link.
- **Screen readers:** decorative visuals `aria-hidden`; live count-ups have a static accessible value; one `<h1>` (Hero), sections use `<h2>`.
- **Conversion continuity:** *Talk To An Expert* reachable from nav (always), Growth (§4), How We Work-adjacent, and Final CTA — no section is a dead end.

*© 2026 ACCOUNTCLERKS — Beyond the Numbers.*
