"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsMobile, useReducedMotionSafe } from "../lib/scroll";

/**
 * Performance-first <video>:
 * - the <video> element (and with it the eager poster fetch) is only mounted
 *   once the slot comes within 600px of the viewport — nothing downloads or
 *   decodes before that (`preload="none"` on top)
 * - plays only while in view (IntersectionObserver), pauses when out
 * - never autoplays on mobile or under prefers-reduced-motion — a tap starts
 *   playback instead (first paint is unchanged: the poster frame)
 * - muted + playsInline + loop; `playSignal` (showcase) mirrors visibility
 * - `eager` opts out of the near-swap (hero background: LCP poster must be
 *   in the server HTML)
 */
export default function SmartVideo({
  src,
  poster,
  alt = "",
  className,
  ariaHidden,
  playSignal,
  eager,
}: {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  ariaHidden?: boolean;
  /** optional MotionValue 0..1 — play while > .5 (featured showcase cards) */
  playSignal?: MotionValue<number>;
  /** render the video immediately (no near-viewport swap) */
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(eager ?? false);
  const [booted, setBooted] = useState(false);
  const mobile = useIsMobile();
  const reduce = useReducedMotionSafe();

  // Playback decisions wait for hydration so `mobile` is trustworthy —
  // otherwise the first (pre-flip) render could start an mp4 fetch on phones.
  useEffect(() => {
    setBooted(true);
  }, []);

  // Mount the video (and poster fetch) only when the slot approaches the
  // viewport; sticky — once mounted it stays (no teardown/re-decode on
  // scroll-back). `eager` slots (hero) start mounted.
  useEffect(() => {
    if (eager) return;
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: "600px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [eager]);

  // In-view playback (archive tiles, hero background)
  useEffect(() => {
    const el = ref.current;
    if (!el || playSignal || !booted) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !mobile && !reduce) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [booted, mobile, reduce, playSignal, near]);

  // Featured showcase: driven by the shared scroll progress MotionValue
  useEffect(() => {
    if (!playSignal || !booted) return;
    return playSignal.on("change", (v) => {
      const el = ref.current;
      if (!el) return;
      if (v > 0.5 && !mobile && !reduce) {
        if (el.paused) el.play().catch(() => {});
      } else if (!el.paused) {
        el.pause();
      }
    });
  }, [booted, playSignal, mobile, reduce]);

  // No autoplay on mobile / reduced motion — tap starts playback
  const onTap = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <div ref={hostRef} className={className} aria-hidden={ariaHidden || undefined}>
      {(eager || near) && (
        <video
          ref={ref}
          className={className}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={ariaHidden ? undefined : alt}
          role={ariaHidden ? undefined : "img"}
          onClick={onTap}
        />
      )}
    </div>
  );
}
