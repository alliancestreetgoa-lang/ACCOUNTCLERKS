import { ImageResponse } from "next/og";
import { getResourceBySlug, getResources, slugOf } from "@/lib/resources";

export const dynamic = "force-static";
export const alt = "ACCOUNTCLERKS resource";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: slugOf(r) }));
}

export default async function ResourceOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  const title = r?.title ?? "Finance, read out loud.";
  const topic = r?.topic ?? "Resources";
  const type = r?.type ? r.type.charAt(0).toUpperCase() + r.type.slice(1) : "Article";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FBFAFC",
          color: "#0E1311",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 46, height: 46, alignItems: "center", justifyContent: "center", borderRadius: 12, background: "#6B2E93", color: "#FBFAFC", fontSize: 26, fontWeight: 700 }}>A</div>
            <div style={{ fontSize: 26, letterSpacing: -0.3 }}>ACCOUNTCLERKS</div>
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 22, color: "#4B2175" }}>
            <span style={{ background: "#F3ECF7", padding: "8px 18px", borderRadius: 999 }}>{type}</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#686D66" }}>
          <div style={{ width: 40, height: 3, background: "#D81B7E" }} />
          {topic} · Beyond the Numbers
        </div>
      </div>
    ),
    size
  );
}
