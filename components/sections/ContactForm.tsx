"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { easeOut } from "@/lib/motion";

type FormState = {
  name: string;
  email: string;
  company: string;
  revenue: string;
  service: string;
  timeline: string;
  current: string;
  message: string;
};

const EMPTY: FormState = {
  name: "", email: "", company: "", revenue: "", service: "", timeline: "", current: "", message: "",
};

const REVENUE = ["Pre-revenue", "Under $2M", "$2M–$20M", "$20M+"];
const SERVICES = ["Bookkeeping", "Management accounts", "Outsourced finance / CFO", "Financial management", "Not sure yet"];
const TIMELINE = ["Immediately", "This quarter", "Just exploring"];

const STEPS = ["About you", "Your business", "What you need"];

/** Lead score (0–100) from qualification answers — surfaced to the CRM. */
function leadScore(f: FormState): number {
  let s = 0;
  if (f.revenue === "$2M–$20M") s += 30;
  if (f.revenue === "$20M+") s += 40;
  if (f.revenue === "Under $2M") s += 18;
  if (f.timeline === "Immediately") s += 30;
  if (f.timeline === "This quarter") s += 18;
  if (f.service && f.service !== "Not sure yet") s += 15;
  if (f.company) s += 10;
  return Math.min(100, s);
}

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const stepValid = (() => {
    if (step === 0) return form.name.trim() && /\S+@\S+\.\S+/.test(form.email);
    if (step === 1) return form.revenue && form.service;
    return true;
  })();

  async function submit() {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("leadScore", String(leadScore(form)));
      if (file) fd.append("file", file);

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "Something went wrong.");
      setStatus("done");
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(e.message ?? "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="flex flex-col items-center rounded-[28px] border border-[var(--hair-light)] bg-canvas p-10 text-center shadow-e2"
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-evergreen-50 text-evergreen-600">
          <Icon.check size={28} />
        </div>
        <h3 className="mt-5 font-serif text-[1.7rem]">We've got it.</h3>
        <p className="mt-2 max-w-[42ch] text-neutral-500">
          Thanks {form.name.split(" ")[0]}. A finance expert will reach out within one business day — or grab a time now on the right.
        </p>
        <Button href="/resources" variant="secondary" className="mt-6">Read the resources while you wait</Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[var(--hair-light)] bg-canvas p-7 shadow-e2 sm:p-9">
      {/* Progress */}
      <div className="mb-7 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`grid h-7 w-7 place-items-center rounded-full text-[0.78rem] font-medium transition-colors ${i <= step ? "bg-evergreen-500 text-canvas" : "bg-neutral-100 text-neutral-400"}`}>
                {i < step ? "✓" : i + 1}
              </span>
              <span className={`hidden text-[0.82rem] font-medium sm:block ${i <= step ? "text-neutral-900" : "text-neutral-400"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && <span className={`h-px flex-1 transition-colors ${i < step ? "bg-evergreen-500" : "bg-neutral-200"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          {step === 0 && (
            <div className="grid gap-4">
              <Text label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Jane Founder" />
              <Text label="Work email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="jane@company.com" />
              <Text label="Company" value={form.company} onChange={(v) => set("company", v)} placeholder="Company Inc." />
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6">
              <Choice label="Annual revenue" options={REVENUE} value={form.revenue} onChange={(v) => set("revenue", v)} />
              <Choice label="What do you need?" options={SERVICES} value={form.service} onChange={(v) => set("service", v)} />
              <Choice label="Timeline" options={TIMELINE} value={form.timeline} onChange={(v) => set("timeline", v)} />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <Text label="Current bookkeeping setup (optional)" value={form.current} onChange={(v) => set("current", v)} placeholder="e.g. QuickBooks + a part-time bookkeeper" />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="msg" className="text-[0.82rem] font-medium text-neutral-600">Anything else? (optional)</label>
                <textarea id="msg" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} className="rounded-md border border-neutral-200 bg-canvas px-3 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-evergreen-500" />
              </div>

              {/* File upload */}
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files?.[0] ?? null); }}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 transition-colors hover:border-evergreen-500"
              >
                <Icon.download size={20} className="text-evergreen-600" />
                <div className="text-[0.9rem]">
                  {file ? <span className="font-medium text-neutral-900">{file.name}</span> : <span className="text-neutral-500">Attach recent financials (optional) — PDF, XLSX, CSV</span>}
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.xlsx,.xls,.csv,.png,.jpg" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {errorMsg && <p className="mt-4 text-[0.9rem] text-signal-error">{errorMsg}</p>}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`text-[0.9rem] font-medium text-neutral-500 transition-opacity ${step === 0 ? "pointer-events-none opacity-0" : "hover:text-neutral-900"}`}
        >
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => stepValid && setStep((s) => s + 1)} variant="primary" className={!stepValid ? "pointer-events-none opacity-50" : ""}>
            Continue
          </Button>
        ) : (
          <Button onClick={submit} variant="primary" className={status === "submitting" ? "pointer-events-none opacity-70" : ""}>
            {status === "submitting" ? "Sending…" : "Book my walkthrough"}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---- field primitives ---- */
function Text({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.82rem] font-medium text-neutral-600">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-12 rounded-md border border-neutral-200 bg-canvas px-3 text-[0.95rem] outline-none transition-colors focus:border-evergreen-500" />
    </div>
  );
}

function Choice({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2.5 text-[0.82rem] font-medium text-neutral-600">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-[0.88rem] font-medium transition-[background-color,border-color,color] duration-200 ${
              value === o ? "border-transparent bg-neutral-900 text-canvas" : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
