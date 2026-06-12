"use client";

import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide native cursor via both class (CSS) and inline style (bulletproof)
    document.documentElement.classList.add("custom-cursor");
    const styleEl = document.createElement("style");
    styleEl.id = "cursor-hide";
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);

    let mx = -300, my = -300;
    let rx = -300, ry = -300;
    let curSize = 32, targetSize = 32;
    let raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };

    const loop = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      curSize = lerp(curSize, targetSize, 0.13);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      ring.style.width = `${curSize}px`;
      ring.style.height = `${curSize}px`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic]")) {
        targetSize = 64;
        ring.setAttribute("data-hover", "1");
      }
    };
    const onOut = () => {
      targetSize = 32;
      ring.removeAttribute("data-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.getElementById("cursor-hide")?.remove();
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div aria-hidden className="select-none">
      {/* Dot: snaps instantly to mouse */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[7px] w-[7px] rounded-full bg-evergreen-500"
        style={{ willChange: "transform" }}
      />
      {/* Ring: follows with lerp lag, expands on hover */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
        style={{
          width: 32,
          height: 32,
          border: "1.5px solid rgba(107,46,147,0.5)",
          background: "rgba(107,46,147,0.04)",
          willChange: "transform, width, height",
          transition: "border-color 0.25s, background 0.25s",
        }}
      />
    </div>
  );
}
