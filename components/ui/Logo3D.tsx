"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Logo3D — the ACCOUNTCLERKS wordmark rendered as an interactive 3D object.
 * The logo sits on a perspective stage and tilts toward the cursor, with a tight
 * crisp depth shadow (no haze). Fully static under prefers-reduced-motion.
 */
export function Logo3D({
  className,
  imgClassName,
  height = 42,
}: {
  className?: string;
  imgClassName?: string;
  height?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, active: false });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 13, ry: px * 20, active: true });
  };

  const reset = () => setT({ rx: 0, ry: 0, active: false });

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center [perspective:900px]", className)}
      aria-label="ACCOUNTCLERKS home"
    >
      <span
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="relative inline-block [transform-style:preserve-3d] motion-reduce:!transform-none"
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)`,
          transition: t.active
            ? "transform 80ms ease-out"
            : "transform 600ms cubic-bezier(.23,1,.32,1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
          alt="ACCOUNTCLERKS — Beyond the Numbers"
          style={{
            height,
            filter: t.active
              ? `drop-shadow(${-t.ry * 0.3}px ${3 - t.rx * 0.3}px 5px rgba(40,20,70,0.30)) drop-shadow(0 1px 1px rgba(20,16,40,0.22))`
              : "drop-shadow(0 1.5px 2px rgba(20,16,40,0.22)) drop-shadow(0 0.5px 0.5px rgba(40,20,70,0.18))",
            transition: "filter 200ms ease-out",
          }}
          className={cn("w-auto select-none [transform:translateZ(16px)]", imgClassName)}
          draggable={false}
        />
      </span>
    </Link>
  );
}
