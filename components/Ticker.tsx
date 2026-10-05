const ITEMS = [
  "Web Development",
  "Brand Identity",
  "UI/UX Design",
  "React & Next.js",
  "Art Covers",
  "Logo Design",
  "Web Applications",
  "Print & Editorial",
];

function Row({ keyPrefix }: { keyPrefix: string }) {
  return (
    <div className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10">
      {ITEMS.map((item) => (
        <span
          key={`${keyPrefix}-${item}`}
          className="flex items-center gap-10 whitespace-nowrap text-2xl font-bold uppercase tracking-tight text-ink md:text-4xl"
        >
          {item}
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <section className="relative z-10 -my-6 select-none">
      <div className="-rotate-2 scale-[1.03]">
        <div className="flex overflow-hidden border-y border-ink/20 bg-sage py-4 md:py-5">
          <Row keyPrefix="a" />
          <Row keyPrefix="b" />
        </div>
        <div className="mt-3 flex overflow-hidden border-y border-line bg-surface py-4 md:py-5">
          <Row keyPrefix="c" />
          <Row keyPrefix="d" />
        </div>
      </div>
    </section>
  );
}
