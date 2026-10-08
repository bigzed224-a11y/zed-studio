"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useSiteScroll } from "../lib/scroll";

const LINKS = [
  { label: "Work", target: "#projects" },
  { label: "Services", target: "#services" },
  { label: "Studio", target: "#about" },
  { label: "Contact", target: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zedstudio0" },
  { label: "TikTok", href: "https://www.tiktok.com/@zed.studio3" },
];

export default function Footer() {
  const { scrollTo } = useSiteScroll();

  return (
    <footer className="relative overflow-hidden px-6 pt-24 md:px-10">
      <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-8">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg">
            <Image
              src="/images/zed-logo.webp"
              alt="Zed Studio"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm text-beige/70">
            <a
              href="mailto:bigzed224@gmail.com"
              className="w-fit break-all transition-colors hover:text-beige"
            >
              bigzed224@gmail.com
            </a>
            <div className="flex gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-beige"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav className="flex flex-col items-start gap-3 md:items-end">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.target)}
              className="text-sm font-semibold text-beige/70 transition-colors hover:text-beige"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-line pt-6 text-xs text-beige/60">
        <span>© {new Date().getFullYear()} Zed Studio</span>
        <button
          onClick={() => scrollTo("#top")}
          className="transition-colors hover:text-beige"
        >
          Back to top ↑
        </button>
      </div>

      <div aria-hidden className="footer-wordmark pointer-events-none mt-10 select-none">
        <span className="font-semibold text-beige/10">ZED STUDIO</span>
      </div>
    </footer>
  );
}
