"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locoScrollY } from "@/lib/locomotive";

gsap.registerPlugin(ScrollTrigger);

export function GSAPScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const scroller = document.querySelector("[data-scroll-container]") as HTMLElement;
    if (!scroller) return;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop: () => locoScrollY.current,
      getBoundingClientRect: () => ({
        top: 0, left: 0, width: window.innerWidth, height: window.innerHeight,
      }),
      pinType: "transform",
    });

    const sync = () => ScrollTrigger.update();
    window.addEventListener("loco-scroll", sync, { passive: true });

    // ── 1. Hero cinematic exit scatter ─────────────────────────────────────
    // Elements are already VISIBLE (Framer Motion revealed on mount).
    // GSAP scrubs them OUT as user scrolls away — no opacity:0 at page load.
    const heroTl = gsap.timeline({
      scrollTrigger: {
        scroller, trigger: "#hero-section",
        start: "50% top", end: "90% top", scrub: 1.2,
      },
    });
    const exits = [
      { id: "#hw-0", x: -160, y: -60, rotation: -10 },
      { id: "#hw-1", x: 0,    y: -100, rotation: 0  },
      { id: "#hw-2", x: 160,  y: -60,  rotation: 10 },
    ];
    exits.forEach(({ id, x, y, rotation }, i) => {
      const el = document.querySelector(id);
      if (el) heroTl.to(el, { x, y, rotation, opacity: 0, ease: "none" }, i * 0.05);
    });
    heroTl
      .to("#hero-eyebrow", { y: -30, opacity: 0, ease: "none" }, 0)
      .to("#hero-sub",     { y: -40, opacity: 0, ease: "none" }, 0.05)
      .to("#hero-cta",     { y: -20, opacity: 0, ease: "none" }, 0.1)
      .to("#hero-stats",   { y: -10, opacity: 0, ease: "none" }, 0.15);

    // ── 2. Dashboard card vertical parallax ─────────────────────────────────
    // Rises 60px as user scrolls through the section — always visible (opacity 1).
    const dash = document.querySelector("#dashboard-card");
    if (dash) {
      gsap.to(dash, {
        y: -60, ease: "none",
        scrollTrigger: {
          scroller, trigger: "#financial-management",
          start: "top bottom", end: "bottom top", scrub: 1.5,
        },
      });
    }

    // ── 3. Section headings: slide from x:-24 to x:0 as they enter center ──
    // fromTo on x only — opacity is untouched, content always readable.
    document.querySelectorAll<HTMLElement>(".gsap-heading").forEach((el) => {
      gsap.fromTo(el,
        { x: -24 },
        {
          x: 0, ease: "none",
          scrollTrigger: {
            scroller, trigger: el,
            start: "top 88%", end: "top 42%", scrub: 0.8,
          },
        }
      );
    });

    // ── 4. Growth Journey stages: alternating depth parallax ─────────────────
    // Odd/even stages move at different rates — creates visual depth layers.
    document.querySelectorAll<HTMLElement>(".gj-stage").forEach((article, i) => {
      gsap.to(article, {
        y: i % 2 === 0 ? -32 : -18, ease: "none",
        scrollTrigger: {
          scroller, trigger: article,
          start: "top bottom", end: "bottom top", scrub: 1.2,
        },
      });
    });

    // ── 5. Who-we-work-with section: IndustryExplorer rise ───────────────────
    const industry = document.querySelector("#who-we-work-with .wrap");
    if (industry) {
      gsap.to(industry, {
        y: -24, ease: "none",
        scrollTrigger: {
          scroller, trigger: "#who-we-work-with",
          start: "top bottom", end: "bottom top", scrub: 1,
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("loco-scroll", sync);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
