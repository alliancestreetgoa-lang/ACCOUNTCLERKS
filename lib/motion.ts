import type { Variants, Transition } from "framer-motion";

/**
 * Shared Framer Motion presets — encode the design-system motion language.
 * Strong custom easing, enter from scale(0.985) (never scale(0)), short durations.
 */

export const easeOut: number[] = [0.23, 1, 0.32, 1];
export const easeInOut: number[] = [0.77, 0, 0.175, 1];

export const springSoft: Transition = { type: "spring", stiffness: 120, damping: 18, mass: 0.6 };
export const springBouncy: Transition = { type: "spring", duration: 0.5, bounce: 0.2 };

/** Fade + rise + subtle scale. Used for scroll reveals. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

/** Container that staggers its children. */
export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Child item for staggered containers. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/** Headline word-by-word reveal. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const viewportOnce = { once: true, margin: "0px 0px -8% 0px" } as const;
