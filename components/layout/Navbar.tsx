"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Financial Management", href: "/#financial-management" },
  { label: "Who We Work With", href: "/#who-we-work-with" },
  { label: "Growth Journey", href: "/#growth-journey" },
  { label: "About", href: "/#about" },
  { label: "Resources", href: "/#resources" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-[var(--hair-light)] bg-canvas/80 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent"
      )}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <Link href="/" className="inline-flex items-center" aria-label="ACCOUNTCLERKS home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="ACCOUNTCLERKS — Beyond the Numbers"
            className="h-[34px] w-auto rounded-lg bg-white px-2.5 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,.12)]"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-[0.9rem] font-medium transition-colors",
                scrolled ? "text-neutral-500 hover:text-neutral-900" : "text-[var(--on-ink-mut)] hover:text-[var(--on-ink)]"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Button href="/#contact" variant="primary" size="sm">
              Talk To An Expert
            </Button>
          </span>
          <button
            className="grid h-9 w-9 place-items-center lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={cn("relative block h-[1.5px] w-5 transition-colors", scrolled || open ? "bg-neutral-900" : "bg-[var(--on-ink)]")}>
              <span className={cn("absolute left-0 block h-[1.5px] w-5 transition-transform", open ? "top-0 rotate-45 bg-neutral-900" : "-top-1.5 bg-current")} />
              <span className={cn("absolute left-0 block h-[1.5px] w-5 transition-transform", open ? "top-0 -rotate-45 bg-neutral-900" : "top-1.5 bg-current")} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-[var(--hair-light)] bg-canvas lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
          >
            <div className="wrap flex flex-col py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border-b border-[var(--hair-light)] py-3 text-neutral-700 last:border-0"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Button href="/#contact" variant="primary" className="mt-4 w-full">
                Talk To An Expert
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
