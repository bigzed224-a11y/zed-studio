"use client";

import Image from "next/image";
import { useSiteScroll } from "../lib/scroll";

export default function TopBar() {
  const { scrollTo } = useSiteScroll();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-ink/90 via-ink/60 to-transparent px-6 py-5 md:px-10">
      <button
        onClick={() => scrollTo("#top")}
        data-logo-anchor
        className="flex items-center gap-3"
        aria-label="Back to top"
      >
        <Image
          src="/images/zed-logo-main.png"
          alt="Zed Studio logo"
          width={40}
          height={40}
          className="rounded-md"
          priority
        />
        <span className="text-sm font-extrabold uppercase tracking-tight text-beige">
          Zed Studio<span className="text-gold">®</span>
        </span>
      </button>
      <a
        href="mailto:bigzed224@gmail.com"
        className="hidden text-sm text-beige/70 transition-colors hover:text-beige md:block"
      >
        bigzed224@gmail.com
      </a>
    </header>
  );
}
