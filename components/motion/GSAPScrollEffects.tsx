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
    // Hero words are already visible (Framer Motion made them so).
    // GSAP scrubs them OUT as you scroll away — no immediateRender issue.
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
      { id: "#hw-0", x: -160, y: -60, rotation: -10, pos: 0 },
      { id: "#hw-1", x: 0,    y: -100, rotation: 0,  pos: 0.05 },
      { id: "#hw-2", x: 160,  y: -60, rotation: 10,  pos: 0.1 },
    ];
    wordExits.forEach(({ id, x, y, rotation, pos }) => {
      const el = document.querySelector(id);
      if (el) heroTl.to(el, { x, y, rotation, opacity: 0, ease: "none" }, pos);
    });

    heroTl
      .to("#hero-eyebrow", { y: -30, opacity: 0, ease: "none" }, 0)
      .to("#hero-sub",     { y: -40, opacity: 0, ease: "none" }, 0.08)
      .to("#hero-cta",     { y: -25, opacity: 0, ease: "none" }, 0.14)
      .to("#hero-stats",   { y: -15, opacity: 0, ease: "none" }, 0.2);

    // ── EFFECT 2: Financial dashboard card — rise on enter ────────────────────
    // immediateRender: false keeps the element visible until the trigger fires.
    const dash = document.querySelector("#dashboard-card");
    if (dash) {
      gsap.from(dash, {
        y: 80,
        scale: 0.94,
        opacity: 0,
        immediateRender: false,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          scroller,
          trigger: "#dashboard-card",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }

    // ── EFFECT 3: Growth Journey stage numbers — depth slide ──────────────────
    document.querySelectorAll<HTMLElement>(".gj-number").forEach((num, i) => {
      gsap.from(num, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        immediateRender: false,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          scroller,
          trigger: num.closest("article") as Element,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // ── EFFECT 4: Testimonial cards — scale in ────────────────────────────────
    document.querySelectorAll<HTMLElement>(".testimonial-card").forEach((card, i) => {
      gsap.from(card, {
        scale: 0.9,
        opacity: 0,
        immediateRender: false,
        duration: 0.85,
        delay: i * 0.06,
        ease: "power2.out",
        scrollTrigger: {
          scroller,
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
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
