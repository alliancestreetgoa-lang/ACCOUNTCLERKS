/** Canonical site origin, used for sitemap, robots, RSS, and OG URLs. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://accountclerks.com").replace(/\/$/, "");

/** Escape a string for safe inclusion in XML. */
export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
