"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Fragment, useRef } from "react";

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
      {char}
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

  // Group characters into words so lines can wrap at word boundaries.
  let cursor = 0;
  const words = text.split(" ").map((word) => {
    const start = cursor;
    cursor += word.length + 1; // +1 for the space that follows
    return { word, start };
  });

  return (
    <p ref={ref} aria-label={text} className={className}>
      {words.map(({ word, start }, wi) => (
        <Fragment key={wi}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, ci) => {
              const from = (start + ci) / text.length;
              return (
                <Char
                  key={ci}
                  char={char}
                  progress={scrollYProgress}
                  range={[from * 0.85, Math.min(from * 0.85 + 0.15, 1)]}
                />
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
