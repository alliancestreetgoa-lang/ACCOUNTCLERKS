import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// GitHub Pages serves a project repo at /<repo>. Apply basePath in production builds.
const basePath = process.env.NODE_ENV === "production" ? "/ACCOUNTCLERKS" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static HTML export for GitHub Pages
  trailingSlash: true, // emit /route/index.html so Pages serves nested routes
  images: { unoptimized: true }, // no server image optimization on Pages
  basePath,
  assetPrefix: basePath || undefined,
  // Expose basePath to the client for plain <a>/<img> that Next doesn't auto-prefix.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
