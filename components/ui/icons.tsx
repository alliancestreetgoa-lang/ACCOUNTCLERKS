/**
 * Geometric line-icon set — 24px grid, 1.5px stroke, round caps, currentColor.
 * Matches the icon style in BRAND-DESIGN-SYSTEM.md §11.
 */
type IconProps = { className?: string; size?: number };

const wrap = (size: number, children: React.ReactNode, className?: string) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {children}
  </svg>
);

export const Icon = {
  ledger: ({ className, size = 24 }: IconProps) => wrap(size, <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v16" /></>, className),
  chart: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M3 3v18h18" /><path d="M7 14l3-3 3 2 4-5" /></>, className),
  bars: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M3 21h18" /><rect x="6" y="11" width="3" height="7" /><rect x="11" y="7" width="3" height="11" /><rect x="16" y="13" width="3" height="5" /></>, className),
  users: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="9" cy="8" r="3" /><path d="M15 11a3 3 0 1 0 0-6" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 20c0-2-1-3.5-2.5-4.3" /></>, className),
  doc: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /><path d="M14 3v6h6M8 14h8M8 17h5" /></>, className),
  calculator: ({ className, size = 24 }: IconProps) => wrap(size, <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v4M8 19h4" /></>, className),
  refresh: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M21 12a9 9 0 1 1-6.2-8.6" /><path d="M22 4 12 14l-3-3" /></>, className),
  growth: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></>, className),
  shield: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z" /><path d="M9 12l2 2 4-4" /></>, className),
  globe: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></>, className),
  cart: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.5 13h11l2-9H6" /></>, className),
  store: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" /></>, className),
  car: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11M5 11h14v5H5zM5 16v2M19 16v2" /><circle cx="8" cy="13.5" r="1" /><circle cx="16" cy="13.5" r="1" /></>, className),
  rocket: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 11a8 8 0 0 1 8-8c2 0 3 1 3 3a8 8 0 0 1-8 8l-3-3Z" /><circle cx="14.5" cy="8.5" r="1.2" /></>, className),
  coins: ({ className, size = 24 }: IconProps) => wrap(size, <><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3" /><ellipse cx="15" cy="13" rx="6" ry="3" /><path d="M9 17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></>, className),
  scissors: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 8l12 10M8 16L20 6" /></>, className),
  wallet: ({ className, size = 24 }: IconProps) => wrap(size, <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14h2" /></>, className),
  compass: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" /></>, className),
  play: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3V9Z" /></>, className),
  download: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M12 3v12M7 11l5 4 5-4M5 21h14" /></>, className),
  check: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M20 6 9 17l-5-5" /></>, className),
  search: ({ className, size = 24 }: IconProps) => wrap(size, <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>, className),
  list: ({ className, size = 24 }: IconProps) => wrap(size, <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>, className),
};
