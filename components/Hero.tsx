"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import TextAnimate from "./TextAnimate";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Video background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/images/zed-logo.webp"
        >
          <source src="/video-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/70" />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,12,12,0.2) 0%, rgba(12,12,12,0.5) 40%, rgba(12,12,12,0.85) 100%)",
        }}
      />

      <div className="section-container relative z-10 w-full py-24 sm:py-32">
        {/* Logo — centered, prominent */}
        <motion.div
          className="flex justify-center mb-16"
          style={{ scale: logoScale, opacity: logoOpacity }}
          initial={reduce ? undefined : { opacity: 0, scale: 0.85 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/zed-logo-main.png"
            alt="Zed Studio"
            width={260}
            height={260}
            className="h-auto w-auto max-h-[260px] mix-blend-screen drop-shadow-[0_0_60px_rgba(184,149,106,0.15)]"
            priority
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main headline */}
          <motion.div
            style={{ y: headingY, opacity: headingOpacity }}
            className="lg:col-span-8"
          >
            {/* micro-scale-fade for label */}
            <div className="mb-8">
              <TextAnimate type="micro-scale-fade">
                <span className="num-label mb-8 inline-block border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  ZED STUDIO — Web Development & Design Agency
                </span>
              </TextAnimate>
            </div>

            {/* soft-blur-in per-character for headline */}
            <h1
              className="font-display font-light leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              <TextAnimate type="soft-blur-in" as="span" delay={0.3}>
                We Build Websites
              </TextAnimate>
              <br />
              <TextAnimate type="soft-blur-in" as="span" delay={0.7}>
                & Digital Products{" "}
                <span className="italic text-gold">That Convert.</span>
              </TextAnimate>
            </h1>
          </motion.div>

          {/* Right-side meta */}
          <motion.div
            style={{ y: metaY }}
            className="lg:col-span-4 lg:flex lg:flex-col lg:justify-end lg:pl-8"
          >
            <Reveal delay={1.3}>
              <p className="mb-8 text-[0.9375rem] leading-relaxed text-white/70 max-w-sm">
                We design and develop high-performance websites, web apps,
                and digital experiences. From brand identity to full-stack
                development — we bring your vision to life.
              </p>
            </Reveal>

            <Reveal delay={1.5}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="btn-editorial bg-gold text-bg hover:bg-gold-hover"
                >
                  View Our Work
                  <ArrowDownRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="btn-editorial border border-white/30 text-white hover:border-gold hover:text-gold"
                >
                  Book a Discovery Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={1.7}>
              <div className="mt-12 border-t border-white/10 pt-6">
                <TextAnimate type="micro-scale-fade" delay={1.9}>
                  <span className="num-label">Based globally</span>
                </TextAnimate>
                <p className="mt-1 text-sm text-white/60">
                  Available for projects worldwide
                </p>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
