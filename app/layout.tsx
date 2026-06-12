import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { AOSInit } from "@/components/motion/AOSInit";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", weight: ["300", "400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ACCOUNTCLERKS — Strategic Finance & Accounting Partner",
    template: "%s | ACCOUNTCLERKS",
  },
  description:
    "Strategic finance support that helps businesses gain clarity, maintain profitability, and grow with confidence.",
  applicationName: "ACCOUNTCLERKS",
  openGraph: {
    type: "website",
    siteName: "ACCOUNTCLERKS",
    title: "ACCOUNTCLERKS — Beyond the Numbers",
    description:
      "Strategic finance support that helps businesses gain clarity, maintain profitability, and grow with confidence.",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@accountclerks",
    creator: "@accountclerks",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0E1311",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="grain font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <LoadingScreen />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-evergreen-500 focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <AOSInit />
        <Navbar />
        <SmoothScroll>
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
