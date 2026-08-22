"use client";

import { useCallback } from "react";

const NAV_HEIGHT = 80; // px — accounts for fixed nav

export function useSmoothScroll() {
  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, []);

  return scrollTo;
}
