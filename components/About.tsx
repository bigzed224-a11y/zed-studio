import Image from "next/image";
import CharReveal from "./CharReveal";

const TICKER = [
  {
    src: "/images/work/daniel-portrait-cover.webp",
    alt: "Fashion model portrait",
  },
  {
    src: "/images/work/wedding-save-the-date-cover.webp",
    alt: "Save the date suite",
  },
  {
    src: "/images/work/ob-brand-logo-cover.webp",
    alt: "OB brand identity",
  },
  {
    src: "/images/work/business-card-1.webp",
    alt: "Minimalist gold business card",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-40">
      <CharReveal
        className="max-w-5xl text-[clamp(1.8rem,4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-beige"
        text="We're Zed Studio — a design and development practice building brands and digital products people remember."
      />

      <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-10">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70 md:col-span-3">
          [ The studio ]
        </span>

        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src="/images/work/daniel-portrait-cover.webp"
              alt="Zed Studio — fashion portrait work"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 md:col-span-4">
          <p className="text-lg leading-relaxed text-beige/80">
            Zed Studio started with one goal: make brands impossible to ignore.
            Today we design logos, covers, print and full websites for clients
            worldwide.
          </p>
          <p className="text-lg leading-relaxed text-beige/80">
            From the first sketch to the shipped product, everything is crafted
            in-house — pixel by pixel.
          </p>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/60">
              [ What we do best ]
            </span>
            <p className="mt-4 text-sm leading-relaxed text-beige/70">
              Web Development, UI/UX, Brand Identity, Logo Design, Art Covers,
              Print, Social Content — React, Next.js, TypeScript, Tailwind,
              Node.js, Figma.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 overflow-hidden md:mt-32">
        <div className="flex w-max animate-marquee gap-8">
          {[...TICKER, ...TICKER].map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative h-40 w-40 shrink-0 overflow-hidden rounded-md md:h-56 md:w-56"
            >
              <Image
                src={item.src}
                alt={i < TICKER.length ? item.alt : ""}
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
