"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { locoProgress, locoScrollY } from "@/lib/locomotive";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let loco: any;
    let cancelled = false;

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;
      const target = document.querySelector(url.hash) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      if (loco) loco.scrollTo(target);
      else target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", url.hash);
    };

    document.addEventListener("click", onAnchorClick);
    window.addEventListener("resize", () => loco?.update());

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
        const limit = args?.limit?.y || document.documentElement.scrollHeight - window.innerHeight || 1;
        locoProgress.set(clamp(y / limit));
        locoScrollY.current = y;
        window.dispatchEvent(new CustomEvent("loco-scroll", { detail: { y } }));
      });

      timers.push(setTimeout(() => loco?.update(), 300));
      timers.push(setTimeout(() => loco?.update(), 1000));
    })();

    return () => {
      cancelled = true;
      document.removeEventListener("click", onAnchorClick);
      timers.forEach(clearTimeout);
      loco?.destroy();
    };
  }, [pathname]);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}
