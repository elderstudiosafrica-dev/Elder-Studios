"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { aboutPhotos } from "@/lib/content";

/**
 * Three interlocking event photos, rotating through the full four-photo set.
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

const VISIBLE_PHOTOS = 3;
const AUTOPLAY_MS = 4000;
const FADE_MS = 900;
const PANEL_POSITION = [
  "",
  "-ml-[104px] mt-[30px] md:-ml-[300px] md:mt-24",
  "-ml-[69px] md:-ml-[196px]",
];

export default function RotatingPhotos() {
  const [start, setStart] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
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
        () => setStart((current) => (current + 1) % aboutPhotos.length),
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
      {Array.from({ length: VISIBLE_PHOTOS }, (_, slot) => (
        <div
          key={slot}
          className={`relative h-44 w-[14.5rem] shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] md:h-[30rem] md:w-[41.25rem] ${PANEL_POSITION[slot]}`}
        >
          {aboutPhotos.map((photo, photoIndex) => {
            const active = photoIndex === (start + slot) % aboutPhotos.length;

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                aria-hidden={!active}
                loading="lazy"
                className={`absolute inset-0 h-full w-full transition-opacity ${
                  active ? "opacity-100" : "opacity-0"
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
