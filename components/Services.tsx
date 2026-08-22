"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import TextAnimate from "./TextAnimate";
import TechBackground from "./TechBackground";

type Service = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  cardImage: string;
};

const services: Service[] = [
  {
    id: "logo",
    title: "Logo Design",
    description:
      "Distinctive logos that capture your brand's personality in one mark.",
    includes: ["Brand research", "Multiple concepts", "Final vector files"],
    cardImage: "/images/service-cards/service-card-2.webp",
  },
  {
    id: "web",
    title: "Website Design",
    description:
      "Modern, responsive websites built to convert visitors into customers.",
    includes: ["Responsive design", "SEO optimization", "Custom development"],
    cardImage: "/images/service-cards/service-card-0.webp",
  },
  {
    id: "business-card",
    title: "Business Card Design",
    description:
      "Clean, memorable business cards that make the right first impression.",
    includes: ["Print-ready files", "Multiple formats", "Brand consistency"],
    cardImage: "/images/service-cards/service-card-4.webp",
  },
  {
    id: "art-cover",
    title: "Art Cover Design",
    description:
      "Bold album, single, and release art that stands out on any platform.",
    includes: ["Album art", "Single covers", "Release artwork"],
    cardImage: "/images/service-cards/service-card-5.webp",
  },
  {
    id: "social",
    title: "Social Media Graphics",
    description:
      "On-brand posts and stories for Instagram, TikTok, and beyond.",
    includes: ["Post templates", "Story design", "Campaign visuals"],
    cardImage: "/images/service-cards/service-card-6.webp",
  },
  {
    id: "custom",
    title: "Custom Projects",
    description:
      "Bespoke design solutions tailored to your unique creative vision.",
    includes: ["Unique concepts", "Tailored approach", "Full creative freedom"],
    cardImage: "/images/service-cards/service-card-3.webp",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [4, -4]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-4, 4]),
    { stiffness: 300, damping: 30 }
  );

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className="group h-full"
      style={{ perspective: 1000 }}
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <motion.article
        className="flex h-full flex-col overflow-hidden border border-border bg-surface transition-all duration-700 hover:border-border-hover"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.cardImage}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-medium tracking-tight text-text transition-colors duration-300 group-hover:text-gold">
            {service.title}
          </h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-text-secondary">
            {service.description}
          </p>
          <ul className="mt-5 space-y-2 border-t border-border pt-5">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs font-medium text-text-muted transition-colors duration-300 group-hover:text-text-secondary"
              >
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-py">
      <TechBackground variant="green">
      <div className="section-container">
        <Reveal className="mb-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <TextAnimate type="micro-scale-fade">
                <span className="num-label mb-4 block">What We Create</span>
              </TextAnimate>
              <h2
                className="font-display font-light tracking-tight text-text"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <TextAnimate type="mask-reveal-up" as="span">
                  <>
                    Services built for
                    <br />
                    <span className="italic text-text-secondary">
                      modern brands.
                    </span>
                  </>
                </TextAnimate>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              From corporate branding to artistic expression, we deliver
              designs that captivate and convert.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
      </TechBackground>
    </section>
  );
}
