"use client";

import Lenis from "lenis";
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
