"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/*
 * Animation specs from the animate-text catalog:
 *
 * soft-blur-in:      per-character, opacity 0→1, y 16→0, blur 12→0, stagger 25ms, duration 900ms
 * mask-reveal-up:    per-line, opacity 0→1, y 30→0, blur 6→0, stagger 90ms, duration 760ms
 * micro-scale-fade:  whole, opacity 0→1, scale 0.96→1, duration 600ms
 * per-word-crossfade: per-word, opacity 0→1, y 8→0, stagger 70ms, duration 700ms
 */

type AnimationType =
  | "soft-blur-in"
  | "mask-reveal-up"
  | "micro-scale-fade"
  | "per-word-crossfade";

type Props = {
  children: ReactNode;
  type?: AnimationType;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

/* ── helpers ─────────────────────────────────────────────────── */

function splitToChars(text: string): string[] {
  return text.split("").map((c) => (c === " " ? "\u00A0" : c));
}

function splitToWords(text: string): string[] {
  return text.split(" ");
}

function splitToLines(children: ReactNode): ReactNode[][] {
  const lines: ReactNode[][] = [];
  let current: ReactNode[] = [];
  const kids = Array.isArray(children) ? children : [children];
  for (const child of kids) {
    if (
      child &&
      typeof child === "object" &&
      "type" in child &&
      (child as { type?: unknown }).type === "br"
    ) {
      if (current.length) lines.push(current);
      current = [];
    } else {
      current.push(child);
    }
  }
  if (current.length) lines.push(current);
  return lines.length ? lines : [[children]];
}

/* ── animation configs ───────────────────────────────────────── */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_CROSS = [0.16, 1, 0.3, 1] as const;
const EASE_MICRO = [0.32, 0.72, 0, 1] as const;

function charVariant(i: number, delay: number) {
  return {
    hidden: { opacity: 0, y: 16, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        delay: delay + i * 0.025,
        ease: EASE_OUT,
      },
    },
  };
}

function lineVariant(i: number, delay: number) {
  return {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.76,
        delay: delay + i * 0.09,
        ease: EASE_OUT,
      },
    },
  };
}

function wordVariant(i: number, delay: number) {
  return {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: delay + i * 0.07,
        ease: EASE_CROSS,
      },
    },
  };
}

const wholeVariant = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: EASE_MICRO,
    },
  },
});

/* ── component ───────────────────────────────────────────────── */

export default function TextAnimate({
  children,
  type = "soft-blur-in",
  className = "",
  delay = 0,
  as: Tag = "span",
}: Props) {
  const reduce = useReducedMotion();

  // Extract text content for splitting
  const text =
    typeof children === "string"
      ? children
      : "";

  /* Reduced motion — just show text */
  if (reduce) {
    return (
      <Tag className={`block ${className}`}>
        {children}
      </Tag>
    );
  }

  /* ── micro-scale-fade (whole element) ── */
  if (type === "micro-scale-fade") {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={wholeVariant(delay)}
      >
        {children}
      </motion.span>
    );
  }

  /* ── mask-reveal-up (per-line) ── */
  if (type === "mask-reveal-up") {
    const lines = splitToLines(children);
    return (
      <Tag className={`block ${className}`}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className="block overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={lineVariant(i, delay)}
          >
            {line.length === 1 ? line[0] : line}
          </motion.span>
        ))}
      </Tag>
    );
  }

  /* ── soft-blur-in (per-character) ── */
  if (type === "soft-blur-in" && text) {
    const chars = splitToChars(text);
    return (
      <Tag className={`block ${className}`}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={charVariant(i, delay)}
          >
            {char}
          </motion.span>
        ))}
      </Tag>
    );
  }

  /* ── per-word-crossfade (per-word) ── */
  if (type === "per-word-crossfade" && text) {
    const words = splitToWords(text);
    return (
      <Tag className={`block ${className}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={wordVariant(i, delay)}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  /* ── fallback: just render children ── */
  return (
    <Tag className={`block ${className}`}>
      {children}
    </Tag>
  );
}
