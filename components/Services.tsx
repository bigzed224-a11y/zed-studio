"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    name: "Logo Design",
    desc: "Distinctive marks that capture a brand's personality in a single symbol.",
  },
  {
    name: "Website Design & Development",
    desc: "Modern, responsive sites built on React and Next.js — designed to convert visitors into customers.",
  },
  {
    name: "Brand Identity",
    desc: "Complete visual systems: color, type and voice that make a brand impossible to ignore.",
  },
  {
    name: "Business Cards & Print",
    desc: "Clean, memorable print that makes the right first impression.",
  },
  {
    name: "Art Covers",
    desc: "Bold album, single and release art that stands out on any platform.",
  },
  {
    name: "Social Media & Custom Projects",
    desc: "On-brand content and bespoke design tailored to your creative vision.",
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="px-6 py-28 md:px-10 md:py-40">
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
        [ What we do best ]
      </span>

      <div className="mt-12 border-b border-line">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.name}
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group flex flex-col gap-3 border-t border-line py-8 transition-colors duration-300 hover:bg-ink-2 md:flex-row md:items-center md:justify-between md:gap-10 md:py-10"
          >
            <div className="flex items-baseline gap-4 md:gap-6">
              <span className="text-xs font-medium text-beige/40">
                0{i + 1}
              </span>
              <h3 className="text-[clamp(1.4rem,3vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-beige transition-colors duration-300 group-hover:text-gold">
                {service.name}
              </h3>
            </div>
            <div className="flex items-center gap-4 md:w-[380px] md:shrink-0">
              <p className="text-sm leading-relaxed text-beige/70">
                {service.desc}
              </p>
              <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-beige/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-beige md:block" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
