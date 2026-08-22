"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/*
 * Page entrance: fades in the entire page with a slight upward drift.
 * Combined with per-component animations (soft-blur-in, mask-reveal-up),
 * this creates an orchestrated load sequence:
 *
 *   0.0s  Page fades in
 *   0.1s  Nav slides down
 *   0.2s  Hero label micro-scales
 *   0.3s  Hero headline soft-blurs in (per-character)
 *   1.2s  Hero CTA buttons reveal
 *   1.4s  Hero meta text reveals
 */

export default function PageLoader({ children }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
