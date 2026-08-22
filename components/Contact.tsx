"use client";

import { ArrowUpRight, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import TechBackground from "./TechBackground";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const reduce = useReducedMotion();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section id="contact" className="section-py">
      <TechBackground variant="green">
      <div className="section-container">
        <Reveal className="mb-16">
          <p className="num-label mb-4">Get in Touch</p>
          <h2
            className="max-w-3xl font-display font-light leading-[1.05] tracking-tight text-text"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Let&apos;s build something
            <br />
            <span className="italic text-text-secondary">
              great together.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <div>
              {status === "success" ? (
                <motion.div
                  initial={
                    reduce ? undefined : { opacity: 0, scale: 0.97 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 border border-border bg-surface p-12 text-center"
                >
                  <CheckCircle className="h-10 w-10 text-gold" />
                  <h3 className="font-display text-2xl font-medium text-text">
                    Message sent.
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Thank you for reaching out. We will be in touch soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-3 text-sm font-medium text-gold underline underline-offset-4 hover:text-text"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 border border-border bg-surface p-8"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="num-label mb-1.5 block"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full border border-border bg-bg px-4 py-3 text-sm font-medium text-text placeholder:text-text-muted outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="num-label mb-1.5 block"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-border bg-bg px-4 py-3 text-sm font-medium text-text placeholder:text-text-muted outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="num-label mb-1.5 block"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project..."
                      className="w-full resize-none border border-border bg-bg px-4 py-3 text-sm font-medium text-text placeholder:text-text-muted outline-none transition-colors focus:border-gold"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center justify-center gap-2 bg-gold px-6 py-3.5 text-sm font-bold text-bg transition-all duration-300 hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <Mail className="h-4 w-4" />,
                  label: "Email",
                  value: "zedcode1@yahoo.com",
                  href: "mailto:zedcode1@yahoo.com",
                },
                {
                  icon: <InstagramIcon className="h-4 w-4" />,
                  label: "Instagram",
                  value: "@zedstudio0",
                  href: "https://www.instagram.com/zedstudio0?igsi=OXZiM2wzamVlYzE4",
                },
                {
                  icon: <TikTokIcon className="h-4 w-4" />,
                  label: "TikTok",
                  value: "@zed.studio3",
                  href: "https://www.tiktok.com/@zed.studio3?is_from_webapp=1&sender_device=pc",
                },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-4 border border-border bg-surface p-5 text-text transition-all duration-500 hover:-translate-y-0.5 hover:border-border-hover"
                  initial={
                    reduce ? undefined : { opacity: 0, y: 16 }
                  }
                  whileInView={
                    reduce ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-bg text-gold">
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="num-label">{link.label}</p>
                    <p className="mt-0.5 truncate text-sm font-medium group-hover:text-gold transition-colors duration-300">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </motion.a>
              ))}

              <div className="mt-2 border-t border-border pt-5">
                <p className="text-center font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-text-muted">
                  Payments accepted: Cash App · Apple Pay · Zelle · Venmo
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      </TechBackground>
    </section>
  );
}
