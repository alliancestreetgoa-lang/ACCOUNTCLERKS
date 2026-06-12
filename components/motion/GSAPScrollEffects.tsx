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

    // --- Locomotive → ScrollTrigger proxy ---
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop: () => locoScrollY.current,
      getBoundingClientRect: () => ({
        top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: "transform",
    });

    // Keep ScrollTrigger in sync with every Locomotive tick
    const onLocoScroll = () => ScrollTrigger.update();
    window.addEventListener("loco-scroll", onLocoScroll, { passive: true });

    // --- Effect 1: Hero content scrubs up + fades as you leave the hero ---
    const heroContent = document.querySelector("#hero-content");
    if (heroContent) {
      gsap.to(heroContent, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          scroller,
          trigger: "#hero-section",
          start: "55% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    // --- Effect 2: Dashboard card scrubs upward into position ---
    const dashCard = document.querySelector("#dashboard-card");
    if (dashCard) {
      gsap.from(dashCard, {
        y: 70,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          scroller,
          trigger: "#dashboard-card",
          start: "top 90%",
          end: "top 45%",
          scrub: 1.4,
        },
      });
    }

    // --- Effect 3: Section h2 headings — word-by-word scrub reveal ---
    document.querySelectorAll<HTMLElement>("section h2").forEach((h2) => {
      // Split into word spans
      const original = h2.innerHTML;
      const words = h2.textContent?.trim().split(/\s+/) ?? [];
      if (words.length < 2) return;

      h2.innerHTML = words
        .map((w) => `<span class="gsap-word" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block">${w}</span></span>`)
        .join(" ");

      const spans = h2.querySelectorAll<HTMLElement>(".gsap-word > span");

      gsap.from(spans, {
        y: "105%",
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          scroller,
          trigger: h2,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onComplete() {
          // Restore plain HTML to keep copy-paste and SEO intact
          h2.innerHTML = original;
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("loco-scroll", onLocoScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
