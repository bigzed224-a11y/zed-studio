"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MaskRise from "./MaskRise";
import WorksShowcase from "./WorksShowcase";
import { useReducedMotionSafe } from "../lib/scroll";

const GRID_ROWS: { src: string; alt: string; className: string }[][] = [
  [
    {
      src: "/images/work/daniel-portrait-cover.webp",
      alt: "Fashion model portrait — About Me",
      className: "md:col-span-4",
    },
    {
      src: "/images/work/business-card-0.webp",
      alt: "Black and gold business card",
      className: "md:col-span-4 md:col-start-8 md:translate-y-24",
    },
  ],
  [
    {
      src: "/images/work/wedding-invitation.webp",
      alt: "Luxury wedding invitation suite",
      className: "md:col-span-3 md:col-start-2 md:-translate-y-8",
    },
    {
      src: "/images/work/moth-emblem-cover.webp",
      alt: "Golden moth emblem logo",
      className: "md:col-span-4 md:col-start-7 md:translate-y-12",
    },
  ],
  [
    {
      src: "/images/work/fashion-flyer-cover.jpg",
      alt: "Pop star collection flyer",
      className: "md:col-span-3 md:col-start-3 md:-translate-y-6",
    },
    {
      src: "/images/work/digital-agency-cover.webp",
      alt: "Digital agency social identity",
      className: "md:col-span-4 md:col-start-8 md:translate-y-6",
    },
  ],
];

const FEATURED = [
  {
    slug: "harper-russo",
    title: "Freedom Expression",
    category: "Art Cover",
    client: "Harper Russo",
    year: "2024",
    cover: "/images/work/harper-russo-cover.webp",
  },
  {
    slug: "red-apple",
    title: "Red Apple",
    category: "Book Cover",
    client: "Jonathan Patterson",
    year: "2024",
    cover: "/images/work/red-apple-cover.webp",
  },
  {
    slug: "real-estate-logo",
    title: "Golden Properties",
    category: "Logo & Branding",
    client: "Golden Properties",
    year: "2024",
    cover: "/images/work/real-estate-logo.webp",
  },
];

function GridImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative aspect-square overflow-hidden rounded-md ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pt-10 md:pt-20">
      <div className="flex flex-col gap-6 px-6 md:gap-10 md:px-10">
        {GRID_ROWS.map((row, r) => (
          <div
            key={r}
            className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
          >
            {row.map((item) => (
              <GridImage key={item.src} {...item} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-28 flex flex-col gap-6 px-6 md:mt-40 md:flex-row md:items-end md:justify-between md:px-10">
        <h2
          className="font-bold uppercase leading-[0.9] tracking-[-0.03em] text-beige"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 9rem)" }}
        >
          <span className="block">
            <MaskRise text="Featured" />
          </span>
          <span className="block">
            <MaskRise text="Projects." delay={0.12} />
          </span>
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
          [ Case studies ]
        </span>
      </div>

      <div className="mt-16 md:mt-24">
        {FEATURED.map((project) => (
          <div
            key={project.slug}
            id={`case-${project.slug}`}
            className="h-px scroll-mt-24"
            aria-hidden
          />
        ))}
      </div>

      <WorksShowcase />
    </section>
  );
}
