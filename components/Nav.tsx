"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSmoothScroll } from "@/lib/use-smooth-scroll";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    scrollTo(href);
    setOpen(false);
  }

  return (
    <>
      <motion.header
        initial={reduce ? undefined : { y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-border bg-bg/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#top");
            }}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/zed-logo-main.png"
              alt="Zed Studio"
              width={40}
              height={40}
              className="h-10 w-auto mix-blend-screen"
            />
          </a>

          {/* Desktop */}
          <nav className="hidden items-center gap-10 md:flex">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="link-underline font-body text-[0.8125rem] font-medium tracking-widest uppercase text-text-secondary transition-colors hover:text-text"
                initial={reduce ? undefined : { opacity: 0, y: -8 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="btn-editorial border border-border text-text hover:border-gold hover:text-gold"
            >
              Enquire
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center border border-border text-text transition-colors hover:border-gold hover:text-gold md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/98 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-display text-4xl font-light tracking-tight text-text transition-colors hover:text-gold"
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="btn-editorial mt-4 border border-gold text-gold hover:bg-gold hover:text-bg"
              >
                Enquire
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
