"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import MaskRise from "./MaskRise";
import { useSiteScroll } from "../lib/scroll";

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
  const reduce = useReducedMotion();

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

function CaseCard({
  project,
  index,
  isLast,
}: {
  project: (typeof FEATURED)[number];
  index: number;
  isLast: boolean;
}) {
  const { scrollTo } = useSiteScroll();
  const nextHref = isLast ? "#contact" : `#case-${FEATURED[index + 1].slug}`;

  return (
    <div
      id={`case-${project.slug}`}
      className="sticky top-4 h-[calc(100svh-2rem)] min-h-[560px] px-4 md:px-10"
      style={{ zIndex: index + 1 }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-ink-2 md:flex-row">
        <div className="relative h-[42%] w-full shrink-0 md:h-full md:w-[54%]">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 54vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-10">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/60">
            [ 0{index + 1} / 0{FEATURED.length} ]
          </span>
          <div>
            <p className="text-6xl font-semibold leading-none text-beige/50 md:text-7xl">
              {index + 1}
            </p>
            <h3 className="mt-6 max-w-md text-2xl font-medium leading-snug text-beige md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 text-sm text-beige/70">
              {project.category} — {project.client}, {project.year}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.08em] text-beige/60">
              {project.category}
            </span>
            <button
              onClick={() => scrollTo(nextHref)}
              className="group flex items-center gap-2 text-sm font-medium text-beige/80 transition-colors hover:text-beige"
            >
              {isLast ? "Start yours" : "Next project"}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
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
        {FEATURED.map((project, i) => (
          <CaseCard
            key={project.slug}
            project={project}
            index={i}
            isLast={i === FEATURED.length - 1}
          />
        ))}
        <div className="h-16 md:h-24" />
      </div>
    </section>
  );
}
