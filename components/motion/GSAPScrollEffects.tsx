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
        top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: "transform",
    });

    const sync = () => ScrollTrigger.update();
    window.addEventListener("loco-scroll", sync, { passive: true });

    // Hero cinematic word scatter on exit.
    // These elements are already VISIBLE (Framer Motion revealed them on mount).
    // GSAP only scrubs them OUT as the user scrolls away — no opacity:0 at mount.
    const heroTl = gsap.timeline({
      scrollTrigger: {
        scroller,
        trigger: "#hero-section",
        start: "50% top",
        end: "90% top",
        scrub: 1.2,
      },
    });

    const exits = [
      { id: "#hw-0", x: -160, y: -60, rotation: -10 },
      { id: "#hw-1", x: 0,    y: -100, rotation: 0 },
      { id: "#hw-2", x: 160,  y: -60, rotation: 10 },
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

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("loco-scroll", sync);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
