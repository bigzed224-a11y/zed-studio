"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useIsMobile, useReducedMotionSafe } from "../lib/scroll";
import { useRef } from "react";

export default function ParallaxStrip({
  src,
  alt,
  height = "72vh",
}: {
  src: string;
  alt: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // ±12% drift on desktop, halved below 768px; zero under reduced motion.
  // `mobile` flips in an effect (post-hydration), and the transform closure
  // is refreshed on every render — so SSR and first client render agree.
  const y = useTransform(scrollYProgress, (v) => {
    if (reduce) return "0%";
    const k = mobile ? 0.5 : 1;
    return `${(-12 + 24 * v) * k}%`;
  });

  return (
    <div
      ref={ref}
      className="relative my-10 overflow-hidden md:my-16"
      style={{ height }}
      aria-label={alt}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
