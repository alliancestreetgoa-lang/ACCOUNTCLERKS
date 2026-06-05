import { ImageResponse } from "next/og";
export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderRadius: 7,
        }}
      >
        {/* ACCOUNTCLERKS badge — isometric cube mark */}
        <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 6 L91 30 L50 54 L9 30 Z" fill="#8B4FB0" />
          <path d="M9 30 L50 54 L50 96 L9 72 Z" fill="#4B2175" />
          <path d="M91 30 L91 72 L50 96 L50 54 Z" fill="#C71C77" />
        </svg>
      </div>
    ),
    size
  );
}
