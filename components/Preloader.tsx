"use client";

import { useEffect, useState } from "react";
import { useLoadedSetter } from "../lib/scroll";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const setLoaded = useLoadedSetter();

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      setLoaded(true);
    }, 1600);
    return () => clearTimeout(t);
  }, [setLoaded]);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        done ? "pointer-events-none -translate-y-full opacity-0" : ""
      }`}
    >
      <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-beige">
        ZED STUDIO
      </span>
    </div>
  );
}
