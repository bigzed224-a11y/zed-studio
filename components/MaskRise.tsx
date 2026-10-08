"use client";

import { motion } from "framer-motion";
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
          initial={reduce ? undefined : { y: "115%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.025,
            ease: [0.44, 0, 0.56, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
