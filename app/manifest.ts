import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACCOUNTCLERKS — Beyond the Numbers",
    short_name: "ACCOUNTCLERKS",
    description: "Strategic finance and accounting partner for growing companies.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1311",
    theme_color: "#0E1311",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
