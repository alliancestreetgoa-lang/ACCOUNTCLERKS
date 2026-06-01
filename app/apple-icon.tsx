import { ImageResponse } from "next/og";
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #6B2E93, #4B2175)",
          color: "#FBFAFC",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        A
      </div>
    ),
    size
  );
}
