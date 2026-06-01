/**
 * Sanity environment configuration.
 * Set these in `.env.local` (see `.env.local.example`).
 * When `projectId` is absent, the app gracefully falls back to local content.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** Optional read token (only needed for drafts / preview). */
export const readToken = process.env.SANITY_API_READ_TOKEN || "";

/** True when a real Sanity project is wired up. */
export const isSanityConfigured = projectId.length > 0;

/** Studio requires a valid-format projectId at import time; use a placeholder when unset. */
export const studioProjectId = projectId || "your-project-id";
