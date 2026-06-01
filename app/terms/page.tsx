import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the ACCOUNTCLERKS website and services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 1, 2026"
      intro="These terms govern your use of the ACCOUNTCLERKS website. Engagement-specific terms are set out in your service agreement."
      sections={[
        { heading: "Acceptance", body: <p>By accessing this site you agree to these terms. If you do not agree, please do not use the site.</p> },
        { heading: "Use of the site", body: <p>You may use the site for lawful purposes only. You agree not to disrupt the site, attempt unauthorized access, or misuse any content.</p> },
        { heading: "Services & engagement", body: <p>Information here is for general guidance and is not financial, tax, or legal advice. Services are provided only under a signed engagement agreement, which governs scope, fees, and deliverables.</p> },
        { heading: "Intellectual property", body: <p>All content, branding, and software on this site are owned by ACCOUNTCLERKS or its licensors and may not be reproduced without permission.</p> },
        { heading: "Limitation of liability", body: <p>The site is provided “as is.” To the fullest extent permitted by law, ACCOUNTCLERKS is not liable for indirect or consequential losses arising from use of the site.</p> },
        { heading: "Changes", body: <p>We may update these terms from time to time. Continued use after changes constitutes acceptance.</p> },
        { heading: "Contact", body: <p>Questions about these terms? Email <a className="text-evergreen-600 underline underline-offset-2" href="mailto:legal@accountclerks.com">legal@accountclerks.com</a>.</p> },
      ]}
    />
  );
}
