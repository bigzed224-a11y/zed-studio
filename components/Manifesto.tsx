import CharReveal from "./CharReveal";

export default function Manifesto() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-44">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70">
          [ What we do ]
        </span>
        <div className="md:max-w-[62%]">
          <CharReveal
            className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-beige"
            text="Stunning websites and brand identities, crafted for clients who care about every detail."
          />
          <p className="mt-10 max-w-md text-lg leading-relaxed text-beige/70">
            Trusted by founders, artists and brands who refuse to blend in —
            from first sketch to shipped product.
          </p>
        </div>
      </div>
    </section>
  );
}
