/** Canonical site origin, used for sitemap, robots, RSS, and OG URLs. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://accountclerks.com").replace(/\/$/, "");

/** Base path for GitHub Pages project hosting (e.g. "/ACCOUNTCLERKS"). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix an internal asset/href that Next does NOT auto-prefix (plain <a>/<img>). */
export function withBase(path: string): string {
  if (/^https?:\/\/|^#|^mailto:/.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Escape a string for safe inclusion in XML. */
export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
