"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "../lib/scroll";

export default function MaskRise({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const show = reduce || inView;
  const chars = Array.from(text);

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={false}
          animate={show ? { y: 0 } : { y: "115%" }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.8,
                  delay: delay + i * 0.025,
                  ease: [0.44, 0, 0.56, 1],
                }
          }
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
