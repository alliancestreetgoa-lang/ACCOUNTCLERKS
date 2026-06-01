"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/lib/motion";

/**
 * Privacy-first consent banner. Non-essential analytics stay OFF until the
 * user explicitly accepts. Choice is remembered in localStorage.
 */
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ac-consent")) setShow(true);
  }, []);

  const choose = (value: "granted" | "declined") => {
    localStorage.setItem("ac-consent", value);
    if (value === "granted") window.dispatchEvent(new Event("ac-consent-granted"));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="fixed inset-x-4 bottom-4 z-[160] mx-auto max-w-2xl rounded-2xl border border-[var(--hair-light)] bg-canvas/95 p-5 shadow-e3 backdrop-blur-md sm:flex sm:items-center sm:gap-5"
        >
          <p className="text-[0.92rem] text-neutral-600">
            We use privacy-friendly analytics to improve the site. Optional cookies stay off unless you accept.{" "}
            <Link href="/privacy" className="font-medium text-evergreen-600 underline underline-offset-2">
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
            <Button onClick={() => choose("declined")} variant="secondary" size="sm">Decline</Button>
            <Button onClick={() => choose("granted")} variant="primary" size="sm">Accept</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
