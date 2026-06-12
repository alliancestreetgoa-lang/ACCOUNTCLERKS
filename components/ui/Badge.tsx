import { cn } from "@/lib/utils";

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
        {/* Top face — bright violet highlight */}
        <linearGradient id="ac-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A0F0" />
          <stop offset="100%" stopColor="#8B3FD8" />
        </linearGradient>
        {/* Left face — medium purple */}
        <linearGradient id="ac-left" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#7B2AD6" />
          <stop offset="100%" stopColor="#4E1A8A" />
        </linearGradient>
        {/* Right face — deep shadow purple */}
        <linearGradient id="ac-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B1F9E" />
          <stop offset="100%" stopColor="#2E0D5A" />
        </linearGradient>
        {/* Inner top-edge highlight shimmer */}
        <linearGradient id="ac-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Left face */}
      <path d="M9 30 L50 54 L50 96 L9 72 Z" fill="url(#ac-left)" />
      {/* Right face */}
      <path d="M91 30 L91 72 L50 96 L50 54 Z" fill="url(#ac-right)" />
      {/* Top face */}
      <path d="M50 6 L91 30 L50 54 L9 30 Z" fill="url(#ac-top)" />
      {/* Top-edge shimmer */}
      <path d="M50 6 L91 30 L50 54 L9 30 Z" fill="url(#ac-sheen)" />
      {/* Ridge lines for crisp edge definition */}
      <line x1="50" y1="6"  x2="50" y2="54" stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="50" y1="54" x2="50" y2="96" stroke="#000" strokeOpacity="0.10" strokeWidth="1" />
    </svg>
  );
}
