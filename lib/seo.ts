import { siteUrl } from "./site";

/** JSON-LD builders — keep all structured data in one typed place. */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteUrl}/#organization`,
    name: "ACCOUNTCLERKS",
    description: "Strategic finance and accounting partner for growing companies.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og/default.png`,
    slogan: "Beyond the Numbers",
    sameAs: [
      "https://www.linkedin.com/company/accountclerks",
      "https://twitter.com/accountclerks",
    ],
    areaServed: "Worldwide",
    knowsAbout: [
      "Bookkeeping",
      "Management Accounts",
      "Outsourced Finance",
      "Cash Flow Forecasting",
      "FP&A",
      "Fractional CFO",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "ACCOUNTCLERKS",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/resources?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${siteUrl}${opts.path}`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
  };
}

export function articleSchema(opts: { title: string; description: string; path: string; date: string; author?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    mainEntityOfPage: `${siteUrl}${opts.path}`,
    author: { "@type": opts.author ? "Person" : "Organization", name: opts.author ?? "ACCOUNTCLERKS" },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Talk to a Finance Expert | ACCOUNTCLERKS",
    url: `${siteUrl}/contact`,
    about: { "@id": `${siteUrl}/#organization` },
  };
}
