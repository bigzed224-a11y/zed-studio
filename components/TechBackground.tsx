"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "green" | "gold" | "mixed";
};

/*
 * TechBackground adds animated gradient pulses and optional grid lines
 * to sections that showcase technical capabilities.
 *
 * Variants:
 *  - green: Subtle green gradient pulse (matches logo)
 *  - gold:  Warm gold gradient pulse
 *  - mixed: Both green and gold gradients
 */

export default function TechBackground({
  children,
  className = "",
  variant = "mixed",
}: Props) {
  const reduce = useReducedMotion();

  const gradientGreen =
    "radial-gradient(ellipse at 20% 30%, rgba(95,132,100,0.18) 0%, transparent 50%)";
  const gradientGold =
    "radial-gradient(ellipse at 80% 70%, rgba(201,164,78,0.1) 0%, transparent 50%)";

  let background = gradientGreen;
  if (variant === "gold") background = gradientGold;
  if (variant === "mixed") background = `${gradientGreen}, ${gradientGold}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient pulse */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background }}
        animate={
          reduce
            ? undefined
            : { opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,132,100,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,132,100,0.35) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
