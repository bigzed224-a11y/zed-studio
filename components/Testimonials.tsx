"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile, useReducedMotionSafe } from "../lib/scroll";

/**
 * Credibility statement — not a testimonial carousel.
 *
 * The studio has no real client quotes yet, so instead of placeholder quotes
 * (never ship those) this section states where the studio stands. Swap in
 * real, verbatim feedback when it exists.
 */
export default function Testimonials() {
  const reduce = useReducedMotionSafe();
  const mobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const show = reduce || inView;
  const rise = mobile ? 14 : 28;
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <section
      ref={ref}
      aria-label="Studio statement"
      className="px-6 py-28 md:px-10 md:py-40"
    >
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
        [ What clients say ]
      </span>

      <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-10">
        <motion.h2
          initial={false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: rise }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.8, ease, delay: mobile ? 0 : 0.05 }
          }
          className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-beige md:col-span-7"
        >
          Good work speaks through the experience.
        </motion.h2>

        <motion.p
          initial={false}
          animate={
            show
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: Math.round(rise / 2) }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.8, delay: mobile ? 0.08 : 0.18, ease }
          }
          className="text-base leading-relaxed text-beige/70 md:col-span-5 md:self-end md:text-lg"
        >
          We&rsquo;re building a studio focused on thoughtful design, strong
          technology, and digital experiences people remember.
        </motion.p>
      </div>
    </section>
  );
}
