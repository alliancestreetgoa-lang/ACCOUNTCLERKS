import { groq } from "next-sanity";

/**
 * Fetch all resources, newest first, shaped to match the `Resource` type
 * consumed by the UI. `href` falls back to a slug-derived path.
 */
export const resourcesQuery = groq`
  *[_type == "resource"] | order(date desc) {
    "id": _id,
    type,
    title,
    excerpt,
    topic,
    "date": date,
    readTime,
    "href": coalesce(href, "/resources/" + slug.current),
    featured
  }
`;

/** All published slugs — for generateStaticParams. */
export const resourceSlugsQuery = groq`
  *[_type == "resource" && defined(slug.current)].slug.current
`;

/** A single resource by slug, including Portable Text body. */
export const resourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    "id": _id,
    type,
    title,
    excerpt,
    topic,
    "date": date,
    readTime,
    "href": coalesce(href, "/resources/" + slug.current),
    featured,
    body
  }
`;
