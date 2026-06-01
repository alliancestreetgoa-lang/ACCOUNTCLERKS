import Link from "next/link";
import { Button } from "@/components/ui/Button";

const COLS = [
  {
    title: "Services",
    links: [
      ["Finance & Accounting", "/services#finance-accounting"],
      ["Management Accounts", "/services#management-accounts"],
      ["Outsourced Finance", "/services#outsourced-finance"],
      ["Financial Management", "/financial-management"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Our Story", "/about"],
      ["Meet the Team", "/about#team"],
      ["Who We Work With", "/who-we-work-with"],
      ["Growth Journey", "/growth-journey"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Articles", "/resources?type=articles"],
      ["Guides", "/resources?type=guides"],
      ["Runway Calculator", "/tools/runway-calculator"],
      ["Checklists", "/resources?type=checklists"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#070806] py-[clamp(48px,6vh,72px)] text-[var(--on-ink-mut)]">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center" aria-label="ACCOUNTCLERKS home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`} alt="ACCOUNTCLERKS — Beyond the Numbers" className="h-[40px] w-auto rounded-lg bg-white px-3 py-2" />
            </Link>
            <p className="mb-5 max-w-[30ch] text-[0.9rem]">
              Strategic finance and accounting, run on software that closes the month for you.
            </p>
            <Button href="/contact" variant="primary" size="sm">
              Talk To An Expert
            </Button>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[0.76rem] font-medium uppercase tracking-[0.1em] text-[var(--on-ink-faint)]">
                {col.title}
              </h4>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} className="block py-1.5 text-[0.9rem] transition-colors hover:text-[var(--on-ink)]">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--hair-dark)] pt-6 text-[0.82rem] text-[var(--on-ink-faint)]">
          <span>© 2026 ACCOUNTCLERKS — Beyond the Numbers.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="transition-colors hover:text-[var(--on-ink)]">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--on-ink)]">Terms</Link>
            <Link href="/security" className="transition-colors hover:text-[var(--on-ink)]">Security</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
