"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

/**
 * Branded first-load curtain. Shows once per session, then wipes up.
 * Skipped entirely under reduced-motion.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("ac-loaded")) return;
    setShow(true);
    const done = () => {
      sessionStorage.setItem("ac-loaded", "1");
      setShow(false);
    };
    const t = setTimeout(done, 1400);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-neutral-900"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: easeOut } }}
        >
          <motion.div
            className="flex items-center gap-3 text-[var(--on-ink)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-evergreen-500 font-sans text-base font-semibold text-canvas">A</span>
            <span className="font-serif text-2xl tracking-[-0.01em]">ACCOUNTCLERKS</span>
          </motion.div>
          <motion.div className="mt-6 h-px w-40 overflow-hidden bg-white/15" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <motion.div className="h-full bg-evergreen-300" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.1, ease: easeOut }} />
          </motion.div>
          <motion.span className="mt-4 text-[0.78rem] uppercase tracking-[0.2em] text-[var(--on-ink-faint)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            Beyond the numbers
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
