"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";
import { useLoaded } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.44, 0, 0.56, 1];

function Word({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const loaded = useLoaded();
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  return (
    <span
      aria-label={text}
      className={`inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={reduce ? { y: 0 } : { y: "115%" }}
          animate={loaded ? { y: 0 } : reduce ? { y: 0 } : { y: "115%" }}
          transition={{ duration: 0.9, delay: delay + i * 0.03, ease: EASE }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function StatCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const loaded = useLoaded();
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`absolute hidden w-[124px] rounded-md border border-line bg-ink-2/85 p-4 text-xs font-bold uppercase leading-snug text-beige/80 backdrop-blur lg:block ${className}`}
      initial={reduce ? undefined : { opacity: 0, y: -24 }}
      animate={loaded && !reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        src="/video-bg.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="absolute inset-0 flex flex-col justify-between px-6 pb-8 pt-28 md:px-10 md:pt-32">
        <h1
          className="font-bold uppercase leading-[0.9] tracking-[-0.03em] text-beige"
          style={{ fontSize: "clamp(3.2rem, 10.5vw, 12rem)" }}
        >
          <span className="block">
            <Word text="Websites" delay={0.05} />
          </span>
          <span className="block text-right">
            <Word text="&" delay={0.18} className="text-gold" />{" "}
            <Word text="Digital" delay={0.24} />
          </span>
          <span className="block md:pl-[6vw]">
            <Word text="Products" delay={0.32} />
          </span>
        </h1>

        <motion.p
          className="max-w-[300px] text-base leading-relaxed text-beige/80 md:ml-[22%] md:text-lg"
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={loaded && !reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          Hey — we&apos;re Zed Studio. We design and build websites and digital
          products that convert, simplify, and scale.
        </motion.p>

        <motion.div
          className="flex items-center justify-between text-sm text-beige/70"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={loaded && !reduce ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span>Pixel by pixel</span>
          <span className="flex items-center gap-2">
            Scroll
            <motion.span
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </span>
        </motion.div>
      </div>

      <StatCard className="right-10 top-36">Est. 2024 — worldwide</StatCard>
      <StatCard className="bottom-44 right-24">13+ projects shipped</StatCard>
      <StatCard className="bottom-24 right-10">
        <ArrowDown className="h-5 w-5 text-gold" />
      </StatCard>
    </section>
  );
}
