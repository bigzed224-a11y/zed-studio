"use client";

import { ArrowUp, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { useSmoothScroll } from "@/lib/use-smooth-scroll";

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

const socialLinks = [
  {
    icon: <InstagramIcon className="h-4 w-4" />,
    label: "Instagram",
    href: "https://www.instagram.com/zedstudio0?igsi=OXZiM2wzamVlYzE4",
  },
  {
    icon: <TikTokIcon className="h-4 w-4" />,
    label: "TikTok",
    href: "https://www.tiktok.com/@zed.studio3?is_from_webapp=1&sender_device=pc",
  },
];

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const scrollTo = useSmoothScroll();

  return (
    <footer className="border-t border-border bg-bg">
      {/* CTA Section */}
      <div className="section-py">
        <div className="section-container text-center">
          <Reveal>
            <h2
              className="font-display font-light tracking-tight text-text"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Ready to elevate
              <br />
              <span className="italic text-gold">your brand?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="btn-editorial bg-gold text-bg hover:bg-gold-hover"
              >
                Let&apos;s Talk
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:flex-row sm:px-10">
          {/* Logo + Copyright */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <span className="font-display text-xl font-semibold tracking-tight text-text">
              Zed Studio
            </span>
            <p className="font-mono text-[10px] text-text-muted">
              © {new Date().getFullYear()} Zed Studio · All rights reserved.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social + Back to top */}
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-border text-text-muted transition-all duration-300 hover:border-gold hover:text-gold"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#top");
              }}
              className="group flex items-center gap-2 border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Back to top
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
