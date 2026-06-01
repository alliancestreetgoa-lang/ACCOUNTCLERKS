import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

/** Brand-styled Portable Text — headings, lists, quotes, links. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 text-[1.08rem] leading-[1.75] text-neutral-700">{children}</p>,
    h2: ({ children }) => <h2 className="mt-12 font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight tracking-[-0.015em]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-9 font-serif text-[1.4rem] leading-snug">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-evergreen-500 pl-5 font-serif text-[1.35rem] leading-snug text-neutral-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 grid gap-2.5">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 grid list-decimal gap-2.5 pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[1.05rem] text-neutral-700">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-evergreen-500" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-[1.05rem] text-neutral-700">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <Link
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="text-evergreen-600 underline decoration-evergreen-300 underline-offset-2 transition-colors hover:text-evergreen-700"
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableBody({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />;
}
