"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { aboutPhotos } from "@/lib/content";

/**
 * Three interlocking event photo panels. aboutPhotos is grouped into batches
 * of three (one photo per panel); the whole batch crossfades to the next
 * batch together, so every photo appears exactly once per full rotation
 * instead of sliding through one slot at a time.
 *
 * The source PNGs already contain matching transparent diagonal masks, so
 * their boxes only need a consistent overlap to form a continuous ribbon.
 *
 * The center panel is dropped below the outer two, matching the original
 * composition. The panel boxes are wider than the source aspect ratio so the
 * edited square masks create the broad horizontal ribbon used in the design.
 * Because each mask slopes left as it descends, that vertical offset changes
 * the overlap needed on either side of the center panel; the unequal pull-ins
 * below keep both diagonal seams narrow and even.
 */

const PANELS_PER_BATCH = 3;
const AUTOPLAY_MS = 4000;
const FADE_MS = 1400;
const PANEL_POSITION = [
  "",
  "-ml-[104px] mt-[30px] md:-ml-[300px] md:mt-24",
  "-ml-[80px] md:-ml-[226px]",
];

const batches = Array.from(
  { length: Math.ceil(aboutPhotos.length / PANELS_PER_BATCH) },
  (_, i) => aboutPhotos.slice(i * PANELS_PER_BATCH, i * PANELS_PER_BATCH + PANELS_PER_BATCH),
);

export default function RotatingPhotos() {
  const [batchIndex, setBatchIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || batches.length <= 1) return;
    const el = rootRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const startRotation = () => {
      stop();
      timer = setInterval(
        () => setBatchIndex((current) => (current + 1) % batches.length),
        AUTOPLAY_MS,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startRotation() : stop()),
      { rootMargin: "10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="flex items-start justify-end">
      {PANEL_POSITION.map((posClass, slot) => (
        <div
          key={slot}
          className={`relative h-44 w-[14.5rem] shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] md:h-[30rem] md:w-[41.25rem] ${posClass}`}
        >
          {batches.map((batch, i) => {
            const photo = batch[slot];
            if (!photo) return null;
            const active = i === batchIndex;

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                aria-hidden={!active}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                }`}
                style={{ transitionDuration: `${FADE_MS}ms` }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
