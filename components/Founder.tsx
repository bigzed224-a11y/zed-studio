"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import CharReveal from "./CharReveal";
import { useIsMobile, useReducedMotionSafe } from "../lib/scroll";

/**
 * Founder section — a credibility statement about the person behind the
 * studio. Claims are kept in line with the rest of the site (12+ years,
 * 13+ projects shipped, clients worldwide, in-house craft).
 */
const HIGHLIGHTS = [
  {
    meta: "12+ years",
    title: "Experience in tech",
    body: "From a first line of code to production React and Next.js platforms — over a decade of shipping, not just planning.",
  },
  {
    meta: "Design + code",
    title: "One pair of hands",
    body: "Interfaces, brand systems and the engineering behind them — no hand-offs, no gap between design and build.",
  },
  {
    meta: "Worldwide",
    title: "Clients across time zones",
    body: "Founders, artists and brands on different continents, worked with directly — one studio, one point of contact.",
  },
  {
    meta: "13+ shipped",
    title: "Projects taken to launch",
    body: "Websites, identities, art covers and print carried end to end — with the same care on launch day as on day one.",
  },
];

export default function Founder() {
  const reduce = useReducedMotionSafe();
  const mobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const show = reduce || inView;
  const rise = mobile ? 12 : 24;
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const enter = (delay = 0) => ({
    initial: false as const,
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: rise },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, delay: mobile ? 0 : delay, ease },
  });

  return (
    <section
      ref={ref}
      id="founder"
      aria-label="About the founder"
      className="px-6 py-28 md:px-10 md:py-40"
    >
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
        [ The founder ]
      </span>

      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
        <motion.div {...enter()} className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src="/images/founder-closeup.webp"
              alt="Close-up portrait of the founder of Zed Studio"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.08em] text-beige/60">
            Zed — founder &amp; builder
          </p>
        </motion.div>

        <div className="md:col-span-7">
          <CharReveal
            className="text-[clamp(1.8rem,4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-beige"
            text="Twelve years in tech — and he still ships the work himself."
          />

          <motion.p
            {...enter(0.1)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-beige/70"
          >
            Zed started the studio on one belief: whoever designs a product
            should care how it ships. A decade in, he still writes the
            production code, reviews every pixel and sees each project through
            to launch — so nothing gets lost between the idea and what actually
            ships.
          </motion.p>

          <dl className="mt-12 border-t border-line md:mt-16">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                {...enter(0.14 + i * 0.07)}
                className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-gold md:col-span-4 md:pt-1.5">
                  {h.meta}
                </dt>
                <dd className="md:col-span-8">
                  <p className="text-lg font-semibold text-beige">{h.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-beige/70">
                    {h.body}
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
