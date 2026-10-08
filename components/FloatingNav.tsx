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
      <div className="flex items-center gap-0.5 rounded-lg border border-line bg-ink-2/95 p-1.5 backdrop-blur min-[420px]:gap-1 min-[420px]:p-2">
        {LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="rounded px-1.5 py-3 text-[10px] font-semibold uppercase tracking-tight text-beige/80 transition-colors hover:text-beige min-[360px]:px-2 min-[360px]:text-[11px] min-[360px]:tracking-wide min-[420px]:px-3 md:px-4 md:text-xs md:tracking-wide"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("#contact")}
          className="ml-0.5 flex items-center gap-1.5 whitespace-nowrap rounded bg-beige px-2 py-3 text-[10px] font-extrabold uppercase tracking-tight text-ink transition-transform duration-200 hover:scale-[1.04] min-[360px]:px-3 min-[360px]:text-[11px] min-[360px]:tracking-wide min-[420px]:ml-1 min-[420px]:gap-2 min-[420px]:px-4 md:px-5 md:text-xs"
        >
          Let&apos;s talk
          <ArrowUpRight
            className="hidden h-4 w-4 shrink-0 min-[420px]:block"
            strokeWidth={2.5}
          />
        </button>
      </div>
    </nav>
  );
}
