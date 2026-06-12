"use client";

import { useState } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";

const PICKS = [
  { label: "Compliance", service: "Bookkeeping" },
  { label: "Growth", service: "Outsourced finance / CFO" },
  { label: "Bookkeeping", service: "Bookkeeping" },
];

export function ContactSection() {
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const selectedService = PICKS.find((p) => p.label === selectedLabel)?.service;

  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {PICKS.map((p) => (
          <button
            key={p.label}
            onClick={() => setSelectedLabel((prev) => (prev === p.label ? "" : p.label))}
            className={`rounded-full px-6 py-2.5 text-[0.95rem] font-semibold transition-all duration-200 ${
              selectedLabel === p.label
                ? "border border-transparent bg-gradient-to-r from-evergreen-500 to-cyan-500 text-white shadow-[0_6px_20px_rgba(107,46,147,.4)]"
                : "glass-pill text-evergreen-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={process.env.NEXT_PUBLIC_CALENDLY_URL ? "mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2" : "mx-auto mt-10 max-w-xl"}>
        <ContactForm key={selectedLabel} defaultService={selectedService} />
        {process.env.NEXT_PUBLIC_CALENDLY_URL && (
          <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL} />
        )}
      </div>
    </>
  );
}
