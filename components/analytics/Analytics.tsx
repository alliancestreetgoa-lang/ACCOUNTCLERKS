"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Privacy-first analytics loader.
 * - Plausible (cookieless, no PII) loads always when configured.
 * - Google Analytics (uses cookies) loads ONLY after explicit consent.
 */
export function Analytics() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("ac-consent") === "granted") setConsented(true);
    const onGrant = () => setConsented(true);
    window.addEventListener("ac-consent-granted", onGrant);
    return () => window.removeEventListener("ac-consent-granted", onGrant);
  }, []);

  return (
    <>
      {plausible && (
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
      {ga && consented && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
