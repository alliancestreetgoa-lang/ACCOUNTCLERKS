import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { getResources } from "@/lib/resources";
import { siteUrl } from "@/lib/site";


const STATIC_ROUTES = [
  "",
  "/services",
  "/financial-management",
  "/who-we-work-with",
  "/growth-journey",
  "/about",
  "/resources",
  "/tools/runway-calculator",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const resources = await getResources();
  const resourceEntries: MetadataRoute.Sitemap = resources
    .filter((r) => !/^https?:\/\//.test(r.href)) // skip external links
    .map((r) => ({
      url: `${siteUrl}${r.href}`,
      lastModified: new Date(r.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticEntries, ...resourceEntries];
}
