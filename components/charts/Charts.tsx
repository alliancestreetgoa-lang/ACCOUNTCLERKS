"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useId } from "react";
import { easeOut, easeInOut } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

function buildSmoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

/* ------------------------------------------------------------------ */
/* AreaChart — line + gradient fill, draws on scroll-in               */
/* ------------------------------------------------------------------ */

export function AreaChart({
  data,
  width = 520,
  height = 200,
  stroke = "#6B2E93",
  fill = "#B07FD0",
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");

  const pad = 6;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts: [number, number][] = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (width - pad * 2),
    height - pad - ((v - min) / range) * (height - pad * 2),
  ]);
  const line = buildSmoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1][0]},${height} L ${pts[0][0]},${height} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Trend chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={fill} stopOpacity="0.35" />
          <stop offset="1" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#g-${gid})`}
        initial={{ opacity: 0 }}
        animate={inView || reduce ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={inView || reduce ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: easeOut }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* BarChart — bars grow up on scroll-in                               */
/* ------------------------------------------------------------------ */

export function BarChart({
  data,
  height = 180,
  color = "#6B2E93",
  trackColor = "rgba(20,22,15,0.06)",
  className,
}: {
  data: { label?: string; value: number }[];
  height?: number;
  color?: string;
  trackColor?: string;
  className?: string;
}) {
  // default color set on the destructured param below
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value)) || 1;

  return (
    <div ref={ref} className={className} style={{ display: "flex", alignItems: "flex-end", gap: 8, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
          <div style={{ background: trackColor, borderRadius: "6px 6px 0 0", height: "100%", display: "flex", alignItems: "flex-end" }}>
            <motion.div
              style={{ width: "100%", background: color, borderRadius: "6px 6px 0 0" }}
              initial={{ height: reduce ? `${(d.value / max) * 100}%` : 0 }}
              animate={inView || reduce ? { height: `${(d.value / max) * 100}%` } : {}}
              transition={{ duration: 0.7, delay: i * 0.05, ease: easeOut }}
            />
          </div>
          {d.label && <span style={{ fontSize: 11, color: "#8C9189", marginTop: 8, textAlign: "center" }}>{d.label}</span>}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DonutGauge — arc sweeps in                                         */
/* ------------------------------------------------------------------ */

export function DonutGauge({
  value,
  size = 132,
  stroke = 12,
  color = "#6B2E93",
  trackColor = "rgba(243,239,229,0.12)",
  label,
}: {
  value: number; // 0..100
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg ref={ref} width={size} height={size} role="img" aria-label={label ?? `${value}%`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: reduce ? offset : c }}
          animate={inView || reduce ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.1, ease: easeInOut }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div className="figure" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: size * 0.22 }}>{value}%</div>
          {label && <div style={{ fontSize: 11, color: "var(--on-ink-mut)" }}>{label}</div>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sparkline — small inline trend                                     */
/* ------------------------------------------------------------------ */

export function Sparkline({
  data,
  width = 120,
  height = 36,
  stroke = "#B07FD0",
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * height,
  ]);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={className} aria-hidden>
      <motion.path
        d={buildSmoothPath(pts)}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: easeOut }}
      />
    </svg>
  );
}
