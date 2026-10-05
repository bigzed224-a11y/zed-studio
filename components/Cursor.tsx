"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;

    let x = -100;
    let y = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) {
        el.style.width = "64px";
        el.style.height = "64px";
        label.style.opacity = "1";
        label.textContent = "View";
        return;
      }
      el.style.width = "";
      el.style.height = "";
      label.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-4 w-4 items-center justify-center rounded-full bg-beige mix-blend-difference transition-[width,height] duration-200 [@media(pointer:fine)]:flex"
    >
      <span
        ref={labelRef}
        className="text-[10px] font-extrabold uppercase tracking-widest text-ink opacity-0"
      />
    </div>
  );
}
