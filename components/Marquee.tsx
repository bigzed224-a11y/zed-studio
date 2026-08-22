"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  items: string[];
  speed?: number;
  reverse?: boolean;
};

export default function Marquee({ items, speed = 35, reverse = false }: Props) {
  const duplicated = [...items, ...items];
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden border-y border-border py-6">
      <motion.div
        className="flex whitespace-nowrap"
        animate={
          reduce
            ? undefined
            : { x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-8 font-display text-lg font-light italic tracking-wide text-text-muted/40"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
