import { cn } from "@/lib/utils";

/**
 * ACCOUNTCLERKS badge — the isometric cube mark lifted from the logo.
 * A standalone, scalable SVG so the brand symbol can be reused everywhere
 * (nav, footer, loading curtain, favicon, section accents) instead of only
 * living inside the full wordmark PNG.
 *
 * Three brand-colored faces:
 *   top   — purple (the brand's primary evergreen/purple)
 *   left  — deep purple shadow side
 *   right — magenta → cyan, echoing the logo's pink/blue facets
 */
export function Badge({
  className,
  title = "ACCOUNTCLERKS",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={cn("h-7 w-7", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ac-badge-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B07FD0" />
          <stop offset="1" stopColor="#6B2E93" />
        </linearGradient>
        <linearGradient id="ac-badge-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5A2683" />
          <stop offset="1" stopColor="#3A1659" />
        </linearGradient>
        <linearGradient id="ac-badge-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D81B7E" />
          <stop offset="1" stopColor="#29ABE2" />
        </linearGradient>
      </defs>
      {/* top face */}
      <path d="M50 6 L91 30 L50 54 L9 30 Z" fill="url(#ac-badge-top)" />
      {/* left face */}
      <path d="M9 30 L50 54 L50 96 L9 72 Z" fill="url(#ac-badge-left)" />
      {/* right face */}
      <path d="M91 30 L91 72 L50 96 L50 54 Z" fill="url(#ac-badge-right)" />
      {/* top edge sheen */}
      <path d="M50 6 L91 30 L50 54 L9 30 Z" fill="#fff" opacity="0.10" />
    </svg>
  );
}
