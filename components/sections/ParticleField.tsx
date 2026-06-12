"use client";

import { useEffect, useRef } from "react";

/**
 * Reusable brand particle field (drift + twinkle + optional mouse attract/swirl).
 * - `density` scales particle count (1 = hero, ~0.6 for sections).
 * - `interactive` enables cursor attract+swirl.
 * Pauses when off-screen (IntersectionObserver) or tab hidden; reduced-motion safe.
 */
/** Default dark-surface palette (cream + brand colours). */
const DARK_COLORS = [
  [243, 239, 229], [243, 239, 229], [243, 239, 229],
  [176, 127, 208], [176, 127, 208],
  [41, 171, 226],
  [216, 27, 126],
];

/** Vivid palette for light surfaces — no white, all brand colour. */
const LIGHT_COLORS = [
  [107, 46, 147], [107, 46, 147],   // brand purple ×2
  [176, 127, 208], [176, 127, 208], // light purple ×2
  [41, 171, 226], [41, 171, 226],   // cyan blue ×2
  [216, 27, 126],                   // pink ×1
  [150, 60, 200],                   // mid purple ×1
];

export function ParticleField({
  className,
  density = 1,
  interactive = true,
  colorScheme = "dark",
}: {
  className?: string;
  density?: number;
  interactive?: boolean;
  colorScheme?: "dark" | "light";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const COLORS = colorScheme === "light" ? LIGHT_COLORS : DARK_COLORS;
    let w = 0, h = 0, dpr = 1, parts: any[] = [], raf = 0;
    let mx = -9999, my = -9999, visible = true, inView = true;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.max(1, Math.round(r.width * dpr));
      h = canvas.height = Math.max(1, Math.round(r.height * dpr));
    };
    const spawn = () => {
      const col = COLORS[(Math.random() * COLORS.length) | 0];
      const baseA = colorScheme === "light" ? 0.45 : 0.3;
      const rangeA = colorScheme === "light" ? 0.4 : 0.55;
      return {
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * (colorScheme === "light" ? 2.5 : 1.5) + 0.6) * dpr,
        vx: (Math.random() * 0.18 + 0.04) * dpr,
        vy: -(Math.random() * 0.3 + 0.08) * dpr,
        a: Math.random() * rangeA + baseA,
        tw: Math.random() * 6.283, tws: Math.random() * 0.02 + 0.004,
        col,
      };
    };
    const build = () => {
      const base = Math.floor((window.innerWidth * window.innerHeight) / 11000);
      const count = Math.min(190, Math.max(20, Math.floor(base * density)));
      parts = Array.from({ length: count }, spawn);
    };
    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (animate) {
          p.x += p.vx; p.y += p.vy; p.tw += p.tws;
          if (interactive && mx > -9999) {
            const dx = p.x - mx, dy = p.y - my;
            const rad = 150 * dpr;
            const d2 = dx * dx + dy * dy;
            if (d2 < rad * rad) {
              const d = Math.sqrt(d2) || 1;
              if (d > 14 * dpr) {
                const t = 1 - d / rad;
                const f = t * 1.7 * dpr;
                const s = t * 1.3 * dpr;
                p.x += -(dx / d) * f - (dy / d) * s;
                p.y += -(dy / d) * f + (dx / d) * s;
              }
            }
          }
          if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
          if (p.y > h + 6) p.y = -6;
          if (p.x > w + 6) p.x = -6;
          if (p.x < -6) p.x = w + 6;
        }
        const a = animate ? p.a * (0.7 + 0.3 * Math.sin(p.tw)) : p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${a.toFixed(3)})`;
        ctx.fill();
      }
    };
    const loop = () => { draw(true); raf = requestAnimationFrame(loop); };
    const running = () => !reduce && visible && inView;
    const sync = () => {
      cancelAnimationFrame(raf);
      if (reduce) { draw(false); return; }
      if (running()) loop(); else draw(true);
    };

    size(); build(); sync();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        mx = my = -9999; return;
      }
      mx = (e.clientX - r.left) * dpr;
      my = (e.clientY - r.top) * dpr;
    };
    if (interactive && !reduce && fine) window.addEventListener("pointermove", onMove, { passive: true });

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { size(); build(); sync(); }, 200); };
    window.addEventListener("resize", onResize);
    const onVis = () => { visible = !document.hidden; sync(); };
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }, { rootMargin: "120px" });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, interactive, colorScheme]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
