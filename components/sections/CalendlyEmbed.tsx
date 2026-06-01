"use client";

import { useEffect } from "react";

/**
 * Calendly inline embed. Set NEXT_PUBLIC_CALENDLY_URL to your scheduling link.
 * Renders nothing when unset (no placeholder).
 */
export function CalendlyEmbed({ url }: { url?: string }) {
  useEffect(() => {
    if (!url) return;
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, [url]);

  if (!url) return null;

  return (
    <div
      className="calendly-inline-widget min-h-[680px] overflow-hidden rounded-[24px] border border-[var(--hair-light)]"
      data-url={`${url}?hide_gdpr_banner=1&primary_color=2f8c63`}
      style={{ minWidth: 320 }}
    />
  );
}
