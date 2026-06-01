import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

/**
 * Standalone Sanity Studio (React 18) — decoupled from the Next.js 15 app.
 *   npm install          # inside studio/
 *   npm run dev          # http://localhost:3333
 *   npm run deploy       # host at <project>.sanity.studio
 *   npm run seed         # import starter content
 *
 * Set SANITY_STUDIO_PROJECT_ID + SANITY_STUDIO_DATASET in studio/.env.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "accountclerks",
  title: "ACCOUNTCLERKS Content",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
