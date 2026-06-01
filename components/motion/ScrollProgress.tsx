"use client";

import { motion, useSpring } from "framer-motion";
import { locoProgress } from "@/lib/locomotive";

/** Thin top scroll-progress bar — driven by Locomotive's scroll position. */
export function ScrollProgress() {
  const scaleX = useSpring(locoProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[150] h-[2.5px] origin-left bg-evergreen-500"
    />
  );
}
