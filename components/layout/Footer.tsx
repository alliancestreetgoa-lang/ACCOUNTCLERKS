import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Logo3D } from "@/components/ui/Logo3D";

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
    <footer className="border-t py-[clamp(48px,6vh,72px)] text-neutral-500" style={{borderColor:'rgba(107,46,147,.20)'}}>
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo3D height={46} className="mb-4" />
            <p className="mb-5 max-w-[30ch] text-[0.9rem]">
              Strategic finance and accounting, run on software that closes the month for you.
            </p>
            <Button href="/contact" variant="primary" size="sm">
              Talk To An Expert
            </Button>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 flex items-center gap-1.5 text-[0.76rem] font-medium uppercase tracking-[0.1em] text-neutral-400">
                <Badge className="h-3.5 w-3.5" />
                {col.title}
              </h4>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} className="block py-1.5 text-[0.9rem] transition-colors hover:text-evergreen-600">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-[0.82rem] text-neutral-400">
          <span className="flex items-center gap-2">
            <Badge className="h-4 w-4" />
            © 2026 ACCOUNTCLERKS — Beyond the Numbers.
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="transition-colors hover:text-evergreen-600">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-evergreen-600">Terms</Link>
            <Link href="/security" className="transition-colors hover:text-evergreen-600">Security</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
