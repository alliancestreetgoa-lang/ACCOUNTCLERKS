"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin top scroll-progress bar — sits above the nav. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[150] h-[2.5px] origin-left bg-evergreen-500"
    />
  );
}
