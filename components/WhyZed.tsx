"use client";

import { Lightbulb, Code, Headphones } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import TechBackground from "./TechBackground";

const reasons = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Strategic Design",
    description:
      "We don't just make things look good; we design for user experience. Every pixel serves a purpose.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Flawless Development",
    description:
      "Built on modern frameworks for lightning-fast speed and easy client updates. Performance is non-negotiable.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Dedicated Support",
    description:
      "We treat your business like our own. From first call to launch and beyond, we're with you.",
  },
];

export default function WhyZed() {
  const reduce = useReducedMotion();

  return (
    <section className="section-py">
      <TechBackground variant="mixed">
      <div className="section-container">
        <Reveal className="mb-16">
          <p className="num-label mb-4">Why ZED STUDIO?</p>
          <h2
            className="font-display font-light tracking-tight text-text"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Why work with
            <br />
            <span className="italic text-text-secondary">us.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="group border border-border bg-surface p-8 transition-all duration-500 hover:border-border-hover"
              initial={reduce ? undefined : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-border bg-bg text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-bg">
                {reason.icon}
              </div>
              <h3 className="font-display text-xl font-medium tracking-tight text-text transition-colors duration-300 group-hover:text-gold">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      </TechBackground>
    </section>
  );
}
