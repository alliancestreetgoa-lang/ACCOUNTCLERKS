"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { locoProgress, locoScrollY } from "@/lib/locomotive";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Locomotive Scroll provider. Wraps the scrollable content in a
 * [data-scroll-container] and runs Locomotive for smooth scrolling + parallax
 * (data-scroll-speed). Fixed UI (navbar, progress bar, loader, consent) lives
 * OUTSIDE this container in the layout so it isn't transformed.
 *
 * Reveals are driven independently of Locomotive: a rAF burst triggered by
 * universal scroll inputs (wheel/scroll/touch/resize) checks `.reveal` elements
 * via getBoundingClientRect (which reflects native scroll AND transforms). This
 * stays reliable whether Locomotive is smoothing, in native mode, or absent.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const root = document.documentElement;
    root.classList.add("js-reveal"); // CSS hides `.reveal` only once this is set
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Reveal detection (Locomotive-independent) ----
    let pending: HTMLElement[] = [];
    const collect = () =>
      (pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-inview)")));
    const checkReveals = () => {
      if (!pending.length) return;
      const h = window.innerHeight;
      pending = pending.filter((node) => {
        const r = node.getBoundingClientRect();
        if (r.top < h * 0.9 && r.bottom > 0) {
          node.classList.add("is-inview");
          return false;
        }
        return true;
      });
    };

    let rafId = 0;
    let lastInput = 0;
    const tick = () => {
      checkReveals();
      // Keep checking for a tail after the last input — covers smooth-scroll lerp.
      if (pending.length && performance.now() - lastInput < 700) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };
    const kick = () => {
      lastInput = performance.now();
      if (!rafId && pending.length) rafId = requestAnimationFrame(tick);
    };

    collect();
    if (reduce) {
      pending.forEach((n) => n.classList.add("is-inview"));
      pending = [];
    } else {
      kick(); // initial reveal of anything above the fold
    }

    // Universal scroll inputs — fire in every scroll mode.
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("wheel", kick, opts);
    window.addEventListener("scroll", kick, opts);
    window.addEventListener("touchmove", kick, opts);
    window.addEventListener("keyup", kick, opts);

    // ---- Locomotive smooth scroll ----
    let loco: any;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return; // different page → navigate
      if (!url.hash || url.hash === "#") return;
      const target = document.querySelector(url.hash) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      if (loco) loco.scrollTo(target);
      else target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", url.hash);
      kick();
    };

    const onResize = () => {
      loco?.update();
      collect();
      kick();
    };
    const onLoad = () => {
      loco?.update();
      collect();
      kick();
    };

    document.addEventListener("click", onAnchorClick);
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      if (cancelled || !containerRef.current) return;

      loco = new LocomotiveScroll({
        el: containerRef.current,
        smooth: !reduce,
        lerp: 0.085,
        multiplier: 1,
        reloadOnContextChange: true,
        smartphone: { smooth: false },
        tablet: { smooth: false, breakpoint: 1024 },
      });

      loco.on("scroll", (args: any) => {
        const y = args?.scroll?.y ?? 0;
        const limit =
          args?.limit?.y || document.documentElement.scrollHeight - window.innerHeight || 1;
        locoProgress.set(clamp(y / limit));
        locoScrollY.current = y;
        window.dispatchEvent(new CustomEvent("loco-scroll", { detail: { y } }));
        kick();
      });

      const settle = () => {
        loco?.update();
        collect();
        kick();
      };
      timers.push(setTimeout(settle, 200));
      timers.push(setTimeout(settle, 800));
      timers.push(setTimeout(settle, 1500));
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("wheel", kick);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("touchmove", kick);
      window.removeEventListener("keyup", kick);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      timers.forEach(clearTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      loco?.destroy();
    };
  }, [pathname]);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}
