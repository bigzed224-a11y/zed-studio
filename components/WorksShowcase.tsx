"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReducedMotionSafe, useSiteScroll } from "../lib/scroll";

/* ================================================================== */
/* PROJECT DATA — the single place to edit portfolio content.          */
/*                                                                     */
/* To add a project: copy an entry, fill in title/category/client,     */
/* point `cover` (and `media` + `poster` for videos) at a file in      */
/* /public/images/work2 or /public/videos. Videos play muted+inline    */
/* only while visible; images lazy-load. `feature` promotes a project  */
/* into the pinned 3D scroll showcase — omit it for archive-grid only. */
/* ================================================================== */

export type Project = {
  slug: string;
  title: string;
  type: string; // "Website" | "Brand Identity" | "Flyer" | ...
  client: string;
  year: string;
  mediaType: "image" | "video";
  cover: string; // poster/thumbnail (required — first paint for both kinds)
  media?: string; // video src (mediaType: "video")
  aspect: string; // css aspect-ratio, keeps true proportions, no stretching
  alt: string;
  href?: string; // real case-study URL — falls back to #contact CTA
  feature?: {
    phase: [number, number]; // [enter, exit] in normalized showcase progress
    from: { x: number; y: number; z: number; r: number; s: number };
    to: { x: number; y: number; z: number; r: number; s: number };
  };
};

export const PROJECTS: Project[] = [
  /* ---------- Website walkthroughs (video) ---------- */
  {
    slug: "website-agency-purple",
    title: "Purple Agency Site",
    type: "Website",
    client: "Gravety Agency",
    year: "2026",
    mediaType: "video",
    cover: "/images/work2/poster-website-agency-purple.jpg",
    media: "/videos/website-agency-purple.mp4",
    aspect: "16/9",
    alt: "Screen recording of a bold purple agency homepage with oversized typography.",
    feature: {
      phase: [0.0, 0.2],
      from: { x: -30, y: -10, z: -900, r: -10, s: 0.72 },
      to: { x: 28, y: 8, z: 320, r: 5, s: 1.12 },
    },
  },
  {
    slug: "book-cover-other-side",
    title: "The Other Side",
    type: "Book Cover",
    client: "Author commission",
    year: "2026",
    mediaType: "image",
    cover: "/images/work2/book-cover-other-side.jpg",
    aspect: "2/3",
    alt: "Book cover titled The Other Side: a keyhole opening onto a sunrise landscape.",
    feature: {
      phase: [0.09, 0.3],
      from: { x: 31, y: 12, z: -1100, r: 9, s: 0.68 },
      to: { x: -29, y: -8, z: 280, r: -6, s: 1.08 },
    },
  },
  {
    slug: "website-agri-farm",
    title: "AgriGrow Farm Site",
    type: "Website",
    client: "AgriGrow",
    year: "2026",
    mediaType: "video",
    cover: "/images/work2/poster-website-agri-farm.jpg",
    media: "/videos/website-agri-farm.mp4",
    aspect: "16/9",
    alt: "Screen recording of a cream-and-red agriculture site with a rotating badge.",
    feature: {
      phase: [0.18, 0.39],
      from: { x: -28, y: 14, z: -800, r: -7, s: 0.78 },
      to: { x: 27, y: -10, z: 340, r: 4, s: 1.14 },
    },
  },
  {
    slug: "wedding-save-date",
    title: "Hassan & Swaba",
    type: "Wedding Invitation",
    client: "Dongze Production",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/wedding-save-date-hassan-swaba.jpg",
    aspect: "3/4",
    alt: "Gold-and-black floral save-the-date card for Hassan and Swaba.",
    feature: {
      phase: [0.28, 0.49],
      from: { x: 29, y: -12, z: -1000, r: 11, s: 0.7 },
      to: { x: -26, y: 10, z: 300, r: -5, s: 1.1 },
    },
  },
  {
    slug: "website-portfolio-dark",
    title: "Dark Portfolio Site",
    type: "Website",
    client: "Personal brand",
    year: "2026",
    mediaType: "video",
    cover: "/images/work2/poster-website-portfolio-dark.jpg",
    media: "/videos/website-portfolio-dark.mp4",
    aspect: "16/9",
    alt: "Screen recording of a dark portfolio site with an orange gradient gallery.",
    feature: {
      phase: [0.38, 0.59],
      from: { x: -30, y: 12, z: -850, r: -9, s: 0.74 },
      to: { x: 29, y: -9, z: 360, r: 6, s: 1.16 },
    },
  },
  {
    slug: "moth-emblem-motion",
    title: "De Golden Mother",
    type: "Brand Motion",
    client: "De Golden Mother",
    year: "2025",
    mediaType: "video",
    cover: "/images/work2/poster-moth-emblem-motion.jpg",
    media: "/videos/moth-emblem-motion.mp4",
    aspect: "1/1",
    alt: "Animated golden moth emblem reveal for De Golden Mother.",
    feature: {
      phase: [0.48, 0.69],
      from: { x: 30, y: -11, z: -1050, r: 10, s: 0.7 },
      to: { x: -28, y: 8, z: 320, r: -4, s: 1.1 },
    },
  },
  {
    slug: "website-satellite-edolus",
    title: "Edolus Orbital Site",
    type: "Website",
    client: "Edolus",
    year: "2026",
    mediaType: "video",
    cover: "/images/work2/poster-website-satellite-edolus.jpg",
    media: "/videos/website-satellite-edolus.mp4",
    aspect: "16/9",
    alt: "Screen recording of a dark Edolus satellite-tech landing page.",
    feature: {
      phase: [0.58, 0.79],
      from: { x: -29, y: 10, z: -900, r: -8, s: 0.72 },
      to: { x: 28, y: -8, z: 340, r: 5, s: 1.14 },
    },
  },
  {
    slug: "food-delivery-social",
    title: "Burger Delivery Ad",
    type: "Social Motion",
    client: "Zed Studio",
    year: "2026",
    mediaType: "video",
    cover: "/images/work2/poster-food-delivery-social.jpg",
    media: "/videos/food-delivery-social.mp4",
    aspect: "1/1",
    alt: "Animated burger delivery social post with phone mockup.",
    feature: {
      phase: [0.68, 0.89],
      from: { x: 30, y: 12, z: -950, r: 9, s: 0.7 },
      to: { x: -27, y: -9, z: 300, r: -6, s: 1.1 },
    },
  },
  {
    slug: "poster-luna-vexx",
    title: "Luna Vexx Editorial",
    type: "Poster Design",
    client: "GFX Tutorials",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/poster-luna-vexx.jpg",
    aspect: "3/4",
    alt: "Dark editorial poster: Luna Vexx, portrait in a red jacket.",
    feature: {
      phase: [0.78, 0.96],
      from: { x: -30, y: -10, z: -880, r: -9, s: 0.72 },
      to: { x: 29, y: 8, z: 340, r: 4, s: 1.12 },
    },
  },

  /* ---------- Archive-only work ---------- */
  {
    slug: "wedding-invite-frank-alice",
    title: "Frank & Alice Wedding",
    type: "Wedding Invitation",
    client: "Chicagold Events",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/wedding-invite-frank-alice.jpg",
    aspect: "3/4",
    alt: "Ethereal wedding invitation with a dancing couple.",
  },
  {
    slug: "wedding-ceremony-michael",
    title: "Michael Johnson Ceremony",
    type: "Wedding Invitation",
    client: "Green Meadow Event Hall",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/wedding-ceremony-michael-johnson.jpg",
    aspect: "2/3",
    alt: "Black and gold wedding ceremony invitation with folded-corner detail.",
  },
  {
    slug: "book-cover-origin",
    title: "Origin",
    type: "Poster Design",
    client: "Ama Duvernay",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/book-cover-origin-puzzle.jpg",
    aspect: "2/3",
    alt: "Puzzle-piece poster titled Origin for an ambassador feature.",
  },
  {
    slug: "poster-built-brick",
    title: "Built Brick by Brick",
    type: "Poster Design",
    client: "Personal",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/poster-built-brick-by-brick.jpg",
    aspect: "9/16",
    alt: "Monochrome portrait poster: a face dissolving into bricks.",
  },
  {
    slug: "poster-color-veil",
    title: "Color Veil",
    type: "Poster Design",
    client: "Personal",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/poster-color-veil.jpg",
    aspect: "9/16",
    alt: "Vertical poster of a segmented female portrait, Color Veil.",
  },
  {
    slug: "poster-beyond-vis-eality",
    title: "Beyond Vis-Eality",
    type: "Poster Design",
    client: "Personal",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/poster-beyond-vis-eality.jpg",
    aspect: "9/16",
    alt: "Red and blue glitch typographic poster, Beyond Vis-Eality.",
  },
  {
    slug: "poster-glitch-portrait",
    title: "Glitch Portrait",
    type: "Poster Design",
    client: "Personal",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/poster-glitch-portrait.jpg",
    aspect: "3/4",
    alt: "Portrait sliced into floating vertical glitch strips.",
  },
  {
    slug: "poster-double-exposure",
    title: "Double Exposure",
    type: "Poster Design",
    client: "Personal",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/poster-double-exposure-man.jpg",
    aspect: "9/16",
    alt: "Dark double-exposure poster of a man inside a photo editor.",
  },
  {
    slug: "flyer-auto-repair",
    title: "Marem Auto Repair",
    type: "Flyer",
    client: "Marem Auto Group",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/flyer-auto-repair-marem.jpg",
    aspect: "1/1",
    alt: "Yellow and black auto-repair service flyer set.",
  },
  {
    slug: "business-card-jane",
    title: "Jane Smith Card",
    type: "Business Card",
    client: "Jane Smith",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/business-card-jane-smith.jpg",
    aspect: "1/1",
    alt: "Gold and black business card set with sweeping curve.",
  },
  {
    slug: "business-card-crm",
    title: "CRM Consulting Card",
    type: "Business Card",
    client: "Mohd. Laeeq",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/business-card-crm-consulting.jpg",
    aspect: "1/1",
    alt: "Two-tone gold business cards with round-corner and wave variants.",
  },
  {
    slug: "logo-lady-nature",
    title: "Lady Nature",
    type: "Logo Design",
    client: "Yousingne Beauty",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/logo-lady-nature.jpg",
    aspect: "1/1",
    alt: "Botanical female-profile logo reading Lady Nature.",
  },
  {
    slug: "logo-nature-emblem",
    title: "Nature Emblem",
    type: "Logo Design",
    client: "Private",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/logo-nature-emblem-green.jpg",
    aspect: "1/1",
    alt: "Engraved green-and-gold circular nature emblem.",
  },
  {
    slug: "logo-abstract-shield",
    title: "Shield Monogram",
    type: "Logo Design",
    client: "Private",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/logo-abstract-shield-gold.jpg",
    aspect: "1/1",
    alt: "Gold and steel abstract shield monogram in 3D relief.",
  },
  {
    slug: "logo-takeaway-foods",
    title: "Takeaway Foods",
    type: "Logo Design",
    client: "Takeaway Foods",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/logo-takeaway-foods.jpg",
    aspect: "1/1",
    alt: "Chef-hat and cutlery takeaway foods restaurant logo.",
  },
  {
    slug: "logo-coffee-cup",
    title: "Coffee Badge",
    type: "Logo Design",
    client: "Café brand",
    year: "2024",
    mediaType: "image",
    cover: "/images/work2/logo-coffee-cup-cream.jpg",
    aspect: "1/1",
    alt: "Cream circular coffee-cup café badge.",
  },
  {
    slug: "flyer-honey-goldenhive",
    title: "GoldenHive Honey",
    type: "Flyer",
    client: "GoldenHive",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/flyer-honey-goldenhive.jpg",
    aspect: "9/16",
    alt: "Honey jar product flyer with hexagon pattern, GoldenHive.",
  },
  {
    slug: "flyer-chocolate-noire",
    title: "Noiré Dark Chocolate",
    type: "Flyer",
    client: "Noiré",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/flyer-chocolate-noire.jpg",
    aspect: "3/4",
    alt: "Premium dark chocolate bar flyer for Noiré 70% cocoa.",
  },
  {
    slug: "flyer-chocolate-shake",
    title: "Chocolatier Shake",
    type: "Flyer",
    client: "Chocolatier Café",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/flyer-chocolate-shake-chocolatier.jpg",
    aspect: "3/4",
    alt: "Chocolate shake promo flyer with 15% off badge.",
  },
  {
    slug: "flyer-shawarma-zeniva",
    title: "Zeniva Shawarma",
    type: "Flyer",
    client: "Zeniva Kitchen",
    year: "2025",
    mediaType: "image",
    cover: "/images/work2/flyer-shawarma-zeniva.jpg",
    aspect: "3/4",
    alt: "Bold orange shawarma promo flyer for Zeniva Kitchen.",
  },
];

const FEATURED = PROJECTS.filter((p) => p.feature);
const ROOM_VH = 460; // a touch longer: 9 featured items now travel the room

/* ------------------------------------------------------------------ */
/* Video element: muted + playsInline + loop, preload=metadata, poster */
/* first paint. Playback is driven by the showcase opacity MotionValue */
/* (featured) or an IntersectionObserver (archive grid). No autoplay   */
/* with sound anywhere, nothing loads aggressively.                     */
/* ------------------------------------------------------------------ */
function ShowVideo({
  src,
  poster,
  alt,
  className,
  playSignal, // optional MotionValue 0..1 — play while > .5
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  playSignal?: MotionValue<number>;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playSignal) return;
    const unsub = playSignal.on("change", (v) => {
      const el = ref.current;
      if (!el) return;
      if (v > 0.5) {
        if (el.paused) el.play().catch(() => {});
      } else if (!el.paused) el.pause();
    });
    return unsub;
  }, [playSignal]);

  // Featured cards are always effectively "in view" while on stage; the
  // playSignal drives them. Fallback IO for archive usage below mirrors this.
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={alt}
      role="img"
    />
  );
}

function ArchiveVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label={alt}
        role="img"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured floating card (pinned 3D showcase) — pure MotionValue math */
/* ------------------------------------------------------------------ */
function WorkCard({
  project,
  progress,
  index,
}: {
  project: Project;
  progress: MotionValue<number>;
  index: number;
}) {
  const feat = project.feature!;
  const [enter, exit] = feat.phase;
  const local = useTransform(
    progress,
    [enter, enter + 0.05, exit - 0.06, exit],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const localClamped = useTransform(local, (v) => Math.min(v, 1));

  const x = useTransform(
    localClamped,
    (v) => `${feat.from.x + (feat.to.x - feat.from.x) * v}vw`,
  );
  const y = useTransform(
    localClamped,
    (v) => `${feat.from.y + (feat.to.y - feat.from.y) * v}vh`,
  );
  const z = useTransform(
    localClamped,
    (v) => `${feat.from.z + (feat.to.z - feat.from.z) * v}px`,
  );
  const rotate = useTransform(
    localClamped,
    (v) => `${feat.from.r + (feat.to.r - feat.from.r) * v}deg`,
  );
  const scale = useTransform(
    localClamped,
    (v) => feat.from.s + (feat.to.s - feat.from.s) * v,
  );

  return (
    <motion.article
      className="works-card"
      style={{ x, y, z, rotate, scale, opacity: local, ["--ar" as string]: project.aspect }}
    >
      <div className="works-card-inner">
        {project.mediaType === "video" && project.media ? (
          <ShowVideo
            src={project.media}
            poster={project.cover}
            alt={project.alt}
            playSignal={localClamped}
            className="works-card-media"
          />
        ) : (
          <Image
            src={project.cover}
            alt={project.alt}
            fill
            sizes="(max-width: 768px) 78vw, 34vw"
            className="works-card-media"
          />
        )}
        <div className="works-card-info">
          <span className="works-card-idx">
            {String(index + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")} · {project.type}
          </span>
          <h3>{project.title}</h3>
          <p>
            {project.client} · {project.year}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function WorksShowcase() {
  const roomRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollTo } = useSiteScroll();

  const { scrollYProgress } = useScroll({
    target: roomRef,
    offset: ["start start", "end end"],
  });

  // Hold the shared progress just below 1: framer's WAAPI fast-path finishes
  // (and then blanks) scroll-linked style animations the instant raw progress
  // hits 1 — which happens exactly when the pinned stage releases, wiping the
  // ending overlay/View-all. All transforms below have already clamped to
  // their end value by 0.99, so the ending holds instead of collapsing.
  const progress = useTransform(scrollYProgress, (v) => Math.min(v, 0.99));

  const titleOpacity = useTransform(progress, [0, 0.06, 0.82, 0.92], [0, 1, 1, 0]);
  const titleScale = useTransform(progress, [0, 0.12, 0.92], [0.86, 1, 1.06]);

  const overlayOpacity = useTransform(progress, [0.84, 0.98], [0, 0.9]);
  const viewAllOpacity = useTransform(progress, [0.88, 0.96], [0, 1]);
  const viewAllY = useTransform(progress, [0.88, 0.96], [24, 0]);

  const ARCHIVE = PROJECTS;

  return (
    <section id="works" aria-label="Our works" className="works-section">
      {/* Pinned scroll room */}
      <div
        ref={roomRef}
        className="works-room"
        style={reduce ? undefined : { height: `${ROOM_VH}vh` }}
      >
        <div className="works-stage">
          <motion.h2
            className="works-title"
            style={reduce ? undefined : { opacity: titleOpacity, scale: titleScale }}
          >
            Our
            <br />
            Works
          </motion.h2>

          {!reduce && (
            <div className="works-gallery" aria-hidden>
              {FEATURED.map((project, i) => (
                <WorkCard
                  key={project.slug}
                  project={project}
                  progress={progress}
                  index={i}
                />
              ))}
            </div>
          )}

          {!reduce && (
            <>
              <motion.div
                className="works-overlay"
                style={{ opacity: overlayOpacity }}
                aria-hidden
              />
              <motion.div
                className="works-viewall"
                style={reduce ? undefined : { opacity: viewAllOpacity, y: viewAllY }}
              >
                <p className="works-viewall-kicker">[ Featured work ]</p>
                <ul className="works-list">
                  {FEATURED.map((w) => (
                    <li key={w.slug}>
                      <a href={w.href ?? "#contact"}>{w.title}</a>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => scrollTo("#contact")}
                  className="works-viewall-cta"
                >
                  Start yours <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Accessible headline for the archive (screen readers get the full list below) */}
      <div className="works-archive-head">
        <h3>Work archive</h3>
        <p>
          {PROJECTS.length} selected projects — websites, brand identities, print & motion.
        </p>
      </div>

      {/* Editorial archive grid — every project, images + videos, semantic DOM */}
      <nav aria-label="All works" className="works-archive">
        <ul>
          {ARCHIVE.map((p, i) => (
            <li key={p.slug} className={`works-tile ${i % 7 === 3 ? "works-tile-tall" : ""}`}>
              <article>
                <div className="works-tile-media" style={{ aspectRatio: p.aspect }}>
                  {p.mediaType === "video" && p.media ? (
                    <ArchiveVideo src={p.media} poster={p.cover} alt={p.alt} />
                  ) : (
                    <Image
                      src={p.cover}
                      alt={p.alt}
                      width={720}
                      height={
                        // keep intrinsic ratios for grid tiles; Next pads the rest
                        Math.round(720 * (Number(p.aspect.split("/")[1]) / Number(p.aspect.split("/")[0])) || 540)
                      }
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                      className="works-tile-img"
                    />
                  )}
                </div>
                <div className="works-tile-meta">
                  <span className="works-tile-type">{p.type}</span>
                  <h4>{p.title}</h4>
                  <p>
                    {p.client} · {p.year}
                  </p>
                </div>
                <a
                  href={p.href ?? "#contact"}
                  className="works-tile-link"
                  aria-label={`Enquire about ${p.title} (${p.type})`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
