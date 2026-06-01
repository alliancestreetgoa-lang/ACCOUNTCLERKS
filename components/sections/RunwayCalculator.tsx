"use client";

import { useMemo, useState } from "react";
import { AreaChart } from "@/components/charts/Charts";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";

const money = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

function Field({
  label,
  value,
  onChange,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-[0.85rem] font-medium text-neutral-600">{label}</label>
        <span className="font-serif text-[1.15rem] figure">${money(value)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-evergreen-500"
      />
    </div>
  );
}

export function RunwayCalculator() {
  const [cash, setCash] = useState(250_000);
  const [burn, setBurn] = useState(45_000);
  const [revenue, setRevenue] = useState(12_000);

  const net = burn - revenue;
  const profitable = net <= 0;
  const months = profitable ? Infinity : cash / net;

  const data = useMemo(() => {
    const arr: number[] = [];
    for (let m = 0; m <= 18; m++) arr.push(Math.max(0, Math.round(cash - net * m)));
    return arr;
  }, [cash, net]);

  const status = profitable
    ? { label: "Profitable", color: "#29ABE2", note: "You're cash-flow positive — revenue covers burn." }
    : months >= 12
      ? { label: "Healthy", color: "#6B2E93", note: "Comfortable runway. Good time to invest in growth." }
      : months >= 6
        ? { label: "Caution", color: "#D9961F", note: "Plan your next raise or path to profitability now." }
        : { label: "Critical", color: "#C5483B", note: "Short runway — act on cost or revenue this month." };

  const zeroDate = profitable
    ? null
    : new Date(Date.now() + months * 30.44 * 86_400_000).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="rounded-[24px] border border-[var(--hair-light)] bg-canvas p-7 shadow-e1">
        <h3 className="font-serif text-[1.4rem]">Your numbers</h3>
        <p className="mt-1 text-[0.9rem] text-neutral-500">Drag to model your runway. Nothing is stored.</p>
        <div className="mt-7 grid gap-7">
          <Field label="Cash on hand" value={cash} onChange={setCash} max={2_000_000} step={5_000} />
          <Field label="Monthly burn (expenses)" value={burn} onChange={setBurn} max={400_000} step={1_000} />
          <Field label="Monthly revenue" value={revenue} onChange={setRevenue} max={400_000} step={1_000} />
        </div>
        <div className="mt-7 flex items-center justify-between rounded-xl bg-cream px-4 py-3 text-[0.9rem]">
          <span className="text-neutral-600">Net monthly burn</span>
          <span className="font-serif text-[1.2rem] figure" style={{ color: profitable ? "#29ABE2" : "#6B2E93" }}>
            {profitable ? "+" : "−"}${money(Math.abs(net))}
          </span>
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col rounded-[24px] bg-ink p-7 text-[var(--on-ink)] shadow-e3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[0.74rem] uppercase tracking-[0.1em] text-[var(--on-ink-faint)]">Estimated runway</div>
            <div className="mt-1 font-serif text-[3.4rem] leading-none">
              {profitable ? "∞" : <AnimatedCounter value={Math.round(months * 10) / 10} decimals={1} suffix=" mo" />}
            </div>
            {zeroDate && <div className="mt-1 text-[0.9rem] text-[var(--on-ink-mut)]">Cash runs out around {zeroDate}</div>}
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.78rem] font-medium"
            style={{ background: `${status.color}26`, color: status.color }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.color }} />
            {status.label}
          </span>
        </div>

        <div className="mt-5">
          <AreaChart key={`${cash}-${net}`} data={data} width={520} height={150} stroke="#B07FD0" fill="#6B2E93" className="h-[150px] w-full" />
          <div className="mt-1 flex justify-between text-[0.72rem] text-[var(--on-ink-faint)]">
            <span>Today</span>
            <span>+18 months</span>
          </div>
        </div>

        <p className="mt-4 text-[0.92rem] text-[var(--on-ink-mut)]">{status.note}</p>

        <div className="mt-auto pt-6">
          <Button href="/contact" variant="primary" className="w-full">Get a real forecast — Talk To An Expert</Button>
        </div>
      </div>
    </div>
  );
}
