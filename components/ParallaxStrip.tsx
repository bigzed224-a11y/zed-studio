"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useReducedMotionSafe } from "../lib/scroll";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

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
