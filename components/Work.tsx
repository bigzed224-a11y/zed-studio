"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import TextAnimate from "./TextAnimate";
import TechBackground from "./TechBackground";

const categories = [
  "All",
  "Logo",
  "Book Cover",
  "Business Card",
  "Portrait",
  "Art Cover",
  "Social Media",
  "Invitation",
];

type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  cover: string;
};

const projects: Project[] = [
  {
    slug: "harper-russo",
    title: "Freedom Expression",
    category: "Art Cover",
    client: "Harper Russo",
    year: "2024",
    cover: "/images/work/harper-russo-cover.webp",
  },
  {
    slug: "daniel-portrait",
    title: "About Me — Fashion Model",
    category: "Portrait",
    client: "Daniel Gallego",
    year: "2024",
    cover: "/images/work/daniel-portrait-cover.webp",
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
    slug: "business-card",
    title: "Black & Gold Card",
    category: "Business Card",
    client: "Premium Brand",
    year: "2024",
    cover: "/images/work/business-card-0.webp",
  },
  {
    slug: "real-estate-logo",
    title: "Golden Properties",
    category: "Logo",
    client: "Golden Properties",
    year: "2024",
    cover: "/images/work/real-estate-logo.webp",
  },
  {
    slug: "wedding-invitation",
    title: "Luxury Wedding Suite",
    category: "Invitation",
    client: "Private Client",
    year: "2024",
    cover: "/images/work/wedding-invitation.webp",
  },
  {
    slug: "moth-emblem",
    title: "Golden Moth Emblem",
    category: "Logo",
    client: "Brand Identity",
    year: "2024",
    cover: "/images/work/moth-emblem-cover.webp",
  },
  {
    slug: "digital-agency",
    title: "Digital Agency Identity",
    category: "Social Media",
    client: "Tech Startup",
    year: "2024",
    cover: "/images/work/digital-agency-cover.webp",
  },
  {
    slug: "monogram",
    title: "Luxury Monogram Identity",
    category: "Logo",
    client: "Private Brand",
    year: "2024",
    cover: "/images/work/monogram-cover.webp",
  },
  {
    slug: "save-the-date",
    title: "Save The Date Suite",
    category: "Invitation",
    client: "Private Client",
    year: "2024",
    cover: "/images/work/wedding-save-the-date-cover.webp",
  },
  {
    slug: "business-card-1",
    title: "Minimalist Gold Card",
    category: "Business Card",
    client: "Boutique Agency",
    year: "2024",
    cover: "/images/work/business-card-1.webp",
  },
  {
    slug: "ob-brand",
    title: "OB Brand Identity",
    category: "Logo",
    client: "OB Studios",
    year: "2024",
    cover: "/images/work/ob-brand-logo-cover.webp",
  },
  {
    slug: "fashion-flyer",
    title: "Pop Star Collection Flyer",
    category: "Social Media",
    client: "Fashion Brand",
    year: "2024",
    cover: "/images/work/fashion-flyer-cover.jpg",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduce ? undefined : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="relative overflow-hidden border border-border bg-surface transition-all duration-700 hover:border-border-hover">
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-warm">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-bg/60 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-3.5 w-3.5 text-text" />
          </div>
          <span className="absolute left-4 top-4 border border-border bg-bg/70 px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-text-muted backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        <div className="px-5 pb-5 pt-4">
          <h3 className="font-display text-lg font-medium tracking-tight text-text transition-colors duration-300 group-hover:text-gold">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            {project.client} — {project.year}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="section-py">
      <TechBackground variant="mixed">
      <div className="section-container">
        <Reveal className="mb-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <TextAnimate type="micro-scale-fade">
                <span className="num-label mb-4 block">Selected Work</span>
              </TextAnimate>
              <h2
                className="font-display font-light tracking-tight text-text"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <TextAnimate type="mask-reveal-up" as="span">
                  <>
                    Projects that
                    <br />
                    <span className="italic text-text-secondary">
                      speak for themselves.
                    </span>
                  </>
                </TextAnimate>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              A curated selection of recent work across branding, print, and
              digital design.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`border px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-400 ${
                  active === cat
                    ? "border-gold bg-gold text-bg"
                    : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      </TechBackground>
    </section>
  );
}
