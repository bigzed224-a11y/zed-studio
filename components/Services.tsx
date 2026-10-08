"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useIsMobile, useReducedMotionSafe } from "../lib/scroll";

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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ServiceRow({
  service,
  index,
  mobile,
  reduce,
}: {
  service: { name: string; desc: string };
  index: number;
  mobile: boolean;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = reduce || inView;
  const rise = mobile ? 10 : 24;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: rise }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.6, delay: index * 0.05, ease: EASE }
      }
      className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-2 border-t border-line py-7 transition-colors duration-300 hover:bg-ink-2 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_2rem] md:gap-x-8 md:py-8"
    >
      <span className="col-start-1 row-start-1 text-xs font-medium text-beige/60">
        0{index + 1}
      </span>
      <h3 className="col-start-2 col-end-[-1] row-start-1 text-[clamp(1.3rem,3vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-beige transition-colors duration-300 group-hover:text-gold md:col-start-2 md:col-end-3">
        {service.name}
      </h3>
      <p className="col-start-2 row-start-2 max-w-prose text-sm leading-relaxed text-beige/70 md:col-start-3 md:row-start-1 md:max-w-none">
        {service.desc}
      </p>
      <ArrowUpRight
        aria-hidden
        className="col-start-3 row-start-2 h-5 w-5 shrink-0 self-center justify-self-end text-beige/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-beige md:col-start-4 md:row-start-1"
        strokeWidth={1.75}
      />
    </motion.div>
  );
}

export default function Services() {
  const reduce = useReducedMotionSafe();
  const mobile = useIsMobile();

  return (
    <section id="services" className="px-6 py-28 md:px-10 md:py-40">
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
        [ What we do best ]
      </span>

      <div className="mt-10 border-b border-line md:mt-12">
        {SERVICES.map((service, i) => (
          <ServiceRow
            key={service.name}
            service={service}
            index={i}
            mobile={mobile}
            reduce={reduce}
          />
        ))}
      </div>
    </section>
  );
}
