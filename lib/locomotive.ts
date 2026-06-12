import { motionValue } from "framer-motion";

/**
 * Page scroll progress (0–1), written by SmoothScroll from Locomotive's scroll
 * event and read by the top progress bar. Locomotive freezes native scroll, so
 * `useScroll()` on the window can't see progress — this bridges the two.
 */
export const locoProgress = motionValue(0);

/** Raw scroll Y in px — kept in sync by SmoothScroll for GSAP ScrollTrigger proxy. */
export const locoScrollY = { current: 0 };
