import { defineField, defineType } from "sanity";

/**
 * `resource` document — backs the Resources Hub.
 * Mirrors the `Resource` TS interface in `lib/resources.ts`.
 */
export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Guide", value: "guide" },
          { title: "Checklist", value: "checklist" },
          { title: "Video", value: "video" },
          { title: "Download", value: "download" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: {
        list: ["Cash Flow", "Bookkeeping", "Fundraising", "Tax", "SaaS", "E-commerce", "Scaling"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required().max(220) }),
    defineField({ name: "date", title: "Published date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "readTime", title: "Read / watch time", type: "string", description: 'e.g. "6 min"' }),
    defineField({ name: "href", title: "External / custom link", type: "url", description: "Optional — overrides the slug-based path (use for downloads/videos)." }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }], description: "Full content for articles & guides." }),
  ],
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "type", media: "featured" },
  },
});
