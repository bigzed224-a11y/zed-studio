"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function CharReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });
  const chars = Array.from(text);

  return (
    <p ref={ref} aria-label={text} className={className}>
      {chars.map((char, i) => {
        const start = (i / chars.length) * 0.85;
        return (
          <Char
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[start, Math.min(start + 0.15, 1)]}
          />
        );
      })}
    </p>
  );
}
