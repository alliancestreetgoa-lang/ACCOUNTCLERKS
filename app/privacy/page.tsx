import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ACCOUNTCLERKS collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 1, 2026"
      intro="ACCOUNTCLERKS respects your privacy. This policy explains what we collect, why, and the choices you have."
      sections={[
        { heading: "Information we collect", body: <p>We collect information you provide directly — such as your name, work email, company, and any details submitted through our contact form or uploaded files — and limited technical data (device, browser, pages viewed) needed to operate and improve the site.</p> },
        { heading: "How we use it", body: <p>To respond to enquiries, prepare quotes, deliver services, and improve our website. We do not sell your personal data.</p> },
        { heading: "Cookies & analytics", body: <p>We use privacy-friendly, cookieless analytics by default. Optional, cookie-based analytics load only after you accept via our consent banner. You can change your choice any time by clearing site data.</p> },
        { heading: "Third-party processors", body: <p>We rely on trusted providers to operate: Sanity (content), Calendly (scheduling), Resend (email), and our CRM. Each processes data only as needed to provide their service.</p> },
        { heading: "Data retention & security", body: <p>We keep personal data only as long as necessary for the purposes above, and protect it with industry-standard safeguards (see our <a className="text-evergreen-600 underline underline-offset-2" href="/security">Security</a> page).</p> },
        { heading: "Your rights", body: <p>Depending on your location, you may request access, correction, deletion, or portability of your data, and object to certain processing. Contact us to exercise these rights.</p> },
        { heading: "Contact", body: <p>Questions? Email <a className="text-evergreen-600 underline underline-offset-2" href="mailto:privacy@accountclerks.com">privacy@accountclerks.com</a>.</p> },
      ]}
    />
  );
}
