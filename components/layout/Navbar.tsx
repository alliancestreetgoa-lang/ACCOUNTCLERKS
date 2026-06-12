"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo3D } from "@/components/ui/Logo3D";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

const LINKS = [
  { label: "Our Services", href: "/#services" },
  { label: "The Financials", href: "/#financial-management" },
  { label: "What we Do", href: "/#who-we-work-with" },
  { label: "Growth Journey", href: "/#growth-journey" },
  { label: "Resources", href: "/#resources" },
  { label: "About", href: "/#about" },
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
        "fixed inset-x-0 top-0 z-[100] border-b border-neutral-200/70 bg-white/90 backdrop-blur-md backdrop-saturate-150 transition-shadow duration-200",
        scrolled ? "shadow-[0_4px_20px_-12px_rgba(20,22,15,0.25)]" : ""
      )}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <Logo3D height={42} />

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.9rem] font-medium text-neutral-600 transition-colors hover:text-evergreen-600"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Button href="/#contact" variant="primary" size="sm">
              Start Now
            </Button>
          </span>
          <button
            className="grid h-9 w-9 place-items-center lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-[1.5px] w-5 bg-neutral-900 transition-colors">
              <span className={cn("absolute left-0 block h-[1.5px] w-5 bg-neutral-900 transition-transform", open ? "top-0 rotate-45" : "-top-1.5")} />
              <span className={cn("absolute left-0 block h-[1.5px] w-5 bg-neutral-900 transition-transform", open ? "top-0 -rotate-45" : "top-1.5")} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-neutral-200/70 bg-white lg:hidden"
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
                Start Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
