"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import {
  useIsMobile,
  useReducedMotionSafe,
  useSiteScroll,
} from "../lib/scroll";

const FLOATERS = [
  {
    src: "/images/work/business-card-1.webp",
    className: "left-[4%] top-[12%] w-32 -rotate-6 opacity-50 md:w-44",
  },
  {
    src: "/images/work/moth-emblem-cover.webp",
    className: "right-[6%] top-[8%] w-36 rotate-3 opacity-50 md:w-48",
  },
  {
    src: "/images/work/wedding-save-the-date-cover.webp",
    className: "bottom-[12%] left-[8%] w-28 rotate-2 opacity-40 md:w-40",
  },
  {
    src: "/images/work/fashion-flyer-cover.jpg",
    className: "bottom-[16%] right-[10%] w-32 -rotate-3 opacity-40 md:w-44",
  },
  {
    src: "/images/work/ob-brand-logo-cover.webp",
    className: "right-[28%] top-[4%] hidden w-24 rotate-6 opacity-30 lg:block md:w-32",
  },
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { scrollTo } = useSiteScroll();
  const reduce = useReducedMotionSafe();
  const mobile = useIsMobile();
  const kickerRef = useRef<HTMLSpanElement>(null);
  const kickerInView = useInView(kickerRef, { once: true, amount: 0.5 });
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border-b border-line bg-transparent py-3 text-base text-beige placeholder:text-beige/50 outline-none transition-colors focus:border-beige";

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f) => (
          <div
            key={f.src}
            className={`absolute overflow-hidden rounded-md ${f.className}`}
          >
            <Image src={f.src} alt="" fill sizes="192px" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.span
          ref={kickerRef}
          initial={false}
          animate={
            reduce || kickerInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: mobile ? 8 : 16 }
          }
          transition={reduce ? { duration: 0 } : { duration: 0.6 }}
          className="text-xs font-medium uppercase tracking-[0.08em] text-beige/70"
        >
          [ Start a project ]
        </motion.span>

        <h2 className="mt-8 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-beige">
          Let&apos;s build
          <br />
          something together.
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:bigzed224@gmail.com"
            className="flex items-center gap-2 rounded bg-beige px-6 py-4 text-xs font-extrabold uppercase tracking-wide text-ink transition-transform duration-200 hover:scale-[1.03]"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <button
            onClick={() => scrollTo("#brief")}
            className="rounded border border-line px-6 py-4 text-xs font-bold uppercase tracking-wide text-beige/80 transition-colors hover:border-beige hover:text-beige"
          >
            Send a brief
          </button>
        </div>

        <form
          id="brief"
          onSubmit={onSubmit}
          className="mt-20 flex w-full max-w-xl flex-col gap-8 text-left"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/60">
                Name
              </span>
              <input
                name="name"
                required
                placeholder="Your name"
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/60">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-beige/60">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us about your project…"
              className={`${inputClass} resize-none`}
            />
          </label>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded bg-beige px-6 py-4 text-xs font-extrabold uppercase tracking-wide text-ink transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-beige">
                Message sent — we&apos;ll get back to you within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-beige/70">
                Something went wrong — email us directly at bigzed224@gmail.com.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
