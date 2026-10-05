"use client";

import { ArrowUpRight } from "lucide-react";
import { useSiteScroll } from "../lib/scroll";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

export default function FloatingNav() {
  const { scrollTo } = useSiteScroll();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-40 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-lg border border-line bg-ink-2/95 p-2 backdrop-blur">
        {LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="rounded px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-beige/80 transition-colors hover:text-beige md:px-4 md:text-xs"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("#contact")}
          className="ml-1 flex items-center gap-2 rounded bg-beige px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-ink transition-transform duration-200 hover:scale-[1.04] md:px-5 md:text-xs"
        >
          Let&apos;s talk
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
