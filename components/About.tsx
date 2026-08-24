"use client";

import { Globe } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";
import TechBackground from "./TechBackground";

const skills = [
  "Web Development",
  "Web Applications",
  "UI/UX Design",
  "Brand Identity",
  "Responsive Design",
  "Full-Stack Dev",
];
const tools = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Figma"];
const points = [
  "Custom websites built for performance and conversion",
  "Modern tech stack: React, Next.js, TypeScript",
  "From concept to deployment — we handle everything",
  "Ongoing support and maintenance available",
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="section-py">
      <TechBackground variant="gold">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — text */}
          <Reveal>
            <p className="num-label mb-4">About Zed Studio</p>
            <h2
              className="font-display font-light tracking-tight text-text"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Design meets
              <br />
              <span className="italic text-text-secondary">technology.</span>
            </h2>

            <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-text-secondary">
              <p>
                Zed Studio is a web development and design studio specializing
                in building high-performance websites, web applications, and
                digital products that drive results.
              </p>
              <p>
                We combine modern development with sharp design to create
                fast, responsive, and visually stunning digital experiences.
                From landing pages to full-stack applications — we build
                it all.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                <Globe className="h-3 w-3 text-gold" />
                Remote / Global
              </span>
              <span className="border border-border px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Cash App
              </span>
              <span className="border border-border px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                Apple Pay
              </span>
            </div>

            {/* Brand logo display */}
            <div className="mt-10 border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/zed-logo-main.png"
                  alt="Zed Studio"
                  width={64}
                  height={64}
                  className="h-16 w-auto rounded-full"
                />
                <div>
                  <p className="font-display text-lg font-medium text-text">Zed Studio</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">Design · Development · Branding</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right column — skills card */}
          <Reveal delay={0.1}>
            <motion.div
              className="border border-border bg-surface p-8 sm:p-10"
              initial={reduce ? undefined : { opacity: 0, x: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="num-label mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="border border-border bg-bg px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-300 hover:border-gold hover:text-gold"
                    initial={
                      reduce ? undefined : { opacity: 0, scale: 0.95 }
                    }
                    whileInView={
                      reduce ? undefined : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <h3 className="num-label mb-4 mt-8">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    className="border border-gold/20 bg-gold/5 px-4 py-2 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-bg"
                    initial={
                      reduce ? undefined : { opacity: 0, scale: 0.95 }
                    }
                    whileInView={
                      reduce ? undefined : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.25 + i * 0.04,
                      duration: 0.4,
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <h3 className="num-label mb-5">Why Work With Us</h3>
                <ul className="space-y-3">
                  {points.map((point, i) => (
                    <motion.li
                      key={point}
                      className="flex items-start gap-3 text-sm font-medium text-text-secondary"
                      initial={
                        reduce ? undefined : { opacity: 0, x: 8 }
                      }
                      whileInView={
                        reduce ? undefined : { opacity: 1, x: 0 }
                      }
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4 + i * 0.06,
                        duration: 0.5,
                      }}
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-gold" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
      </TechBackground>
    </section>
  );
}
