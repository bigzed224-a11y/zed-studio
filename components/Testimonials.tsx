"use client";

import { motion, useReducedMotion } from "framer-motion";

const QUOTES = [
  {
    quote:
      "Placeholder — swap with real client feedback about the process and communication.",
    name: "Client Name",
    project: "Project type · Year",
  },
  {
    quote:
      "Placeholder — swap with real client feedback about the result and how it performed.",
    name: "Client Name",
    project: "Project type · Year",
  },
  {
    quote:
      "Placeholder — swap with real client feedback about working together again.",
    name: "Client Name",
    project: "Project type · Year",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="flex items-end justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
          [ What clients say ]
        </span>
        <span className="hidden text-xs text-beige/60 md:block">
          Replace with real feedback
        </span>
      </div>

      <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
        {QUOTES.map((item, i) => (
          <motion.figure
            key={i}
            initial={reduce ? undefined : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-between gap-10 rounded-md border border-line bg-ink-2 p-8 md:p-10"
          >
            <div>
              <span aria-hidden className="text-4xl font-semibold leading-none text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-4 text-lg leading-relaxed text-beige/90">
                {item.quote}
              </blockquote>
            </div>
            <figcaption>
              <p className="text-sm font-semibold text-beige">{item.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.08em] text-beige/60">
                {item.project}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
