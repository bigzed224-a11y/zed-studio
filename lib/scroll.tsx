"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const ScrollContext = createContext<{ scrollTo: (target: string) => void }>({
  scrollTo: () => {},
});

const LoadedContext = createContext(false);
const LoadedSetterContext = createContext<(loaded: boolean) => void>(() => {});

export function SiteChrome({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (loaded) lenisRef.current?.start();
    else lenisRef.current?.stop();
  }, [loaded]);

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      <LoadedSetterContext.Provider value={setLoaded}>
        <LoadedContext.Provider value={loaded}>
          {children}
        </LoadedContext.Provider>
      </LoadedSetterContext.Provider>
    </ScrollContext.Provider>
  );
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}

export function useSiteScroll() {
  return useContext(ScrollContext);
}

export function useLoaded() {
  return useContext(LoadedContext);
}

export function useLoadedSetter() {
  return useContext(LoadedSetterContext);
}

/**
 * Hydration-safe reduced-motion preference.
 *
 * framer's `useReducedMotion()` reports the OS preference immediately on the
 * client, but SSR cannot know it — so the first client render mismatches the
 * server HTML and React hydration fails. This wrapper always renders the
 * server value (false) first, then applies the real preference after mount.
 */
export function useReducedMotionSafe(): boolean {
  const pref = useReducedMotion();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(!!pref);
  }, [pref]);

  return reduce;
}

/**
 * Hydration-safe "below 768px" query.
 *
 * Same pattern as useReducedMotionSafe: SSR and the first client render both
 * report false (so the markup matches), then the real media query is applied
 * after mount. Use it to pick smaller entrance distances for mobile — never
 * to hide/show layout (CSS breakpoints own layout).
 */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mobile;
}
