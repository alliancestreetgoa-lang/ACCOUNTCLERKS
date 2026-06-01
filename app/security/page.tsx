import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Security",
  description: "How ACCOUNTCLERKS protects client financial data.",
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      updated="June 1, 2026"
      intro="Handling financial data is a responsibility we take seriously. Here's how we protect it."
      sections={[
        { heading: "Encryption", body: <p>Data is encrypted in transit (TLS 1.2+) and at rest. Sensitive credentials are never stored in plaintext.</p> },
        { heading: "Access controls", body: <p>Access follows least-privilege principles, with role-based permissions, mandatory MFA for staff, and audit logging across systems.</p> },
        { heading: "Vendor security", body: <p>We work with SOC 2-aligned infrastructure and processors, and review the security posture of every provider that touches client data.</p> },
        { heading: "Data segregation & backups", body: <p>Client data is logically segregated, and backups are encrypted and tested so the books can always be recovered.</p> },
        { heading: "Incident response", body: <p>We maintain an incident response plan and will notify affected clients promptly in the event of a confirmed breach, in line with applicable law.</p> },
        { heading: "Reporting a vulnerability", body: <p>Found a security issue? Please email <a className="text-evergreen-600 underline underline-offset-2" href="mailto:security@accountclerks.com">security@accountclerks.com</a>. We appreciate responsible disclosure.</p> },
      ]}
    />
  );
}
