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

    // ── Locomotive → ScrollTrigger proxy ──────────────────────────────────────
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop: () => locoScrollY.current,
      getBoundingClientRect: () => ({
        top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: "transform",
    });
    const sync = () => ScrollTrigger.update();
    window.addEventListener("loco-scroll", sync, { passive: true });

    // ── EFFECT 1: Hero cinematic word scatter on exit ─────────────────────────
    // Each headline word explodes in a different direction as you scroll away.
    const heroTl = gsap.timeline({
      scrollTrigger: {
        scroller,
        trigger: "#hero-section",
        start: "48% top",
        end: "92% top",
        scrub: 1.4,
      },
    });

    const wordExits = [
      { id: "#hw-0", x: -160, y: -60, rotation: -10, delay: 0 },
      { id: "#hw-1", x: 0,    y: -100, rotation: 0,  delay: 0.05 },
      { id: "#hw-2", x: 160,  y: -60, rotation: 10,  delay: 0.1 },
    ];
    wordExits.forEach(({ id, x, y, rotation, delay }) => {
      const el = document.querySelector(id);
      if (el) heroTl.to(el, { x, y, rotation, opacity: 0, ease: "none" }, delay);
    });

    heroTl
      .to("#hero-eyebrow", { y: -30, opacity: 0, ease: "none" }, 0)
      .to("#hero-sub",     { y: -40, opacity: 0, ease: "none" }, 0.08)
      .to("#hero-cta",     { y: -25, opacity: 0, ease: "none" }, 0.14)
      .to("#hero-stats",   { y: -15, opacity: 0, ease: "none" }, 0.2);

    // ── EFFECT 2: Financial dashboard — scrubbed scale + rise ─────────────────
    const dash = document.querySelector("#dashboard-card");
    if (dash) {
      gsap.fromTo(dash,
        { y: 90, scale: 0.94, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            scroller,
            trigger: "#dashboard-card",
            start: "top 92%",
            end: "top 38%",
            scrub: 1.6,
          },
        }
      );
    }

    // ── EFFECT 3: Section content — staggered clip-path lift ─────────────────
    // Targets the .wrap inside each non-hero section for a premium slide-in.
    document.querySelectorAll<HTMLElement>("section:not(#hero-section) > .wrap").forEach((wrap) => {
      gsap.fromTo(
        wrap,
        { y: 55, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            scroller,
            trigger: wrap.parentElement as Element,
            start: "top 87%",
            end: "top 52%",
            scrub: 1.1,
          },
        }
      );
    });

    // ── EFFECT 4: Testimonial cards — scale in with scrub ────────────────────
    document.querySelectorAll<HTMLElement>(".testimonial-card").forEach((card) => {
      gsap.fromTo(card,
        { scale: 0.87, opacity: 0 },
        {
          scale: 1, opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            scroller,
            trigger: card,
            start: "top 88%",
            end: "top 52%",
            scrub: 1.3,
          },
        }
      );
    });

    // ── EFFECT 5: Growth Journey stage numbers — staggered depth float ────────
    document.querySelectorAll<HTMLElement>(".gj-number").forEach((num, i) => {
      gsap.from(num, {
        x: i % 2 === 0 ? -40 : 40,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          scroller,
          trigger: num.closest("article") as Element,
          start: "top 85%",
          end: "top 55%",
          scrub: 1.2,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("loco-scroll", sync);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
