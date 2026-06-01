import { getResources } from "@/lib/resources";
import { siteUrl, escapeXml } from "@/lib/site";

export const revalidate = 600;

export async function GET() {
  const resources = await getResources();
  const updated = resources[0]?.date ? new Date(resources[0].date).toUTCString() : new Date().toUTCString();

  const items = resources
    .map((r) => {
      const link = /^https?:\/\//.test(r.href) ? r.href : `${siteUrl}${r.href}`;
      return `    <item>
      <title>${escapeXml(r.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(r.excerpt)}</description>
      <category>${escapeXml(r.topic)}</category>
      <pubDate>${new Date(r.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ACCOUNTCLERKS — Resources</title>
    <link>${siteUrl}/resources</link>
    <atom:link href="${siteUrl}/resources/feed.xml" rel="self" type="application/rss+xml" />
    <description>Plain-spoken finance guides, articles, checklists, and tools.</description>
    <language>en</language>
    <lastBuildDate>${updated}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
