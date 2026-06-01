import { ImageResponse } from "next/og";
export const dynamic = "force-static";

export const alt = "ACCOUNTCLERKS — Beyond the Numbers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(150deg, #2C1248 0%, #160A24 70%)",
          color: "#F3EFE5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 52, height: 52, alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#6B2E93", color: "#FBFAFC", fontSize: 30, fontWeight: 700 }}>A</div>
          <div style={{ fontSize: 30, letterSpacing: -0.5 }}>ACCOUNTCLERKS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Finance that goes beyond the numbers.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#b8a7cf" }}>
            Strategic finance support — clarity, profitability, confident growth.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#B07FD0", fontSize: 24 }}>
          <div style={{ width: 40, height: 3, background: "#D81B7E" }} />
          Beyond the Numbers
        </div>
      </div>
    ),
    size
  );
}
