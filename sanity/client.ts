import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only client for fetching published content.
 * `useCdn` serves cached, fast responses from Sanity's edge CDN.
 */
export const sanityClient = createClient({
  projectId: projectId || "your-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
