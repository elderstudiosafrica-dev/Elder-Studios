"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { aboutPhotoBatches } from "@/lib/content";

/**
 * The three interlocking event photos, cycling through the batches in
 * `aboutPhotoBatches` — all three panels swapping together on a crossfade.
 *
 * Every image in a batch is stacked inside its panel and rendered from the
 * start, with the inactive ones at opacity 0. That costs one decode per photo
 * up front (they're small WebPs) and buys a crossfade that can never show a
 * half-loaded image or a flash of empty panel.
 *
 * The panel geometry — uniform height, the middle one dropped, and the two
 * pull-ins — lives in Storytelling.tsx and is tuned against the exact alpha
 * edges of this artwork. Each slot's images all share one silhouette, so
 * swapping them cannot disturb it.
 */

const AUTOPLAY_MS = 4000;
const FADE_MS = 1000;

/**
 * Per-panel classes, left to right.
 *
 * The three silhouettes share a 60° slant but have different aspect ratios, so
 * sizing them by *width* (the obvious thing) gives three different heights and a
 * row that steps upward to the right. The design has all three the same height,
 * tops and bottoms flush, with the middle panel dropped below the line — hence
 * a uniform `h-105` plus a per-panel `aspect-*` matching that panel's artwork,
 * and `items-start` on the row to align the outer two. That height is the
 * largest at which the row still fits the container at 1440 without bleeding
 * off the left edge.
 *
 * The two pull-ins are unequal and oddly specific because the seam between two
 * panels is not the gap between their boxes: each image carries a different
 * amount of transparent padding around its parallelogram, and dropping the
 * middle panel by `mt-24` slides its slanted edges sideways by 0.577·96 ≈ 55px
 * on top of that. These values were solved against the actual alpha edges of
 * the artwork (fitted lines, not the image boxes) to leave a ~4px hairline on
 * both seams. They are only valid for h-105 + mt-24 with this art — if any of
 * those change, re-solve rather than nudging. Every term in the gap expression
 * is linear in the panel height, so the set scales together: these are the
 * original h-88 values (318 / 203 / 80) scaled by 420/352.
 *
 * The mobile values are that same solution scaled by 152/352 ≈ 0.431. Every
 * term in the gap expression is linear in the panel height, so scaling the
 * height, both pull-ins and the middle panel's drop by one factor keeps the
 * seams proportional (~1.7px) instead of needing a second solve. At that size
 * the row is ~470px, so it deliberately bleeds off the left edge rather than
 * being squeezed to fit — the same treatment the design gives it on desktop.
 */
const PANEL = [
  "aspect-900/518",
  "-ml-[137px] mt-[34px] aspect-900/579 md:-ml-[380px] md:mt-24",
  "-ml-[88px] aspect-900/700 md:-ml-[242px]",
];

export default function RotatingPhotos() {
  const [batch, setBatch] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Rotate only while the section is actually on screen. Nothing here is
  // visible when it isn't, so there's no reason to keep swapping.
  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const start = () => {
      stop();
      timer = setInterval(
        () => setBatch((b) => (b + 1) % aboutPhotoBatches.length),
        AUTOPLAY_MS,
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "10% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="flex items-start justify-end">
      {PANEL.map((panelClass, slot) => (
        <div
          key={slot}
          className={`relative h-38 shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] md:h-105 ${panelClass}`}
        >
          {aboutPhotoBatches.map((photos, b) => {
            const active = b === batch;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photos[slot].src}
                src={photos[slot].src}
                alt={photos[slot].alt}
                aria-hidden={!active}
                className={`absolute inset-0 h-full w-full transition-opacity ${
                  active ? "opacity-100" : "opacity-0"
                } ${active && !reduced ? "animate-[photo-drift_12s_ease-out_forwards]" : ""}`}
                style={{ transitionDuration: `${FADE_MS}ms` }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
