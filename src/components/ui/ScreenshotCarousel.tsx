"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ImageFrame from "./ImageFrame";

type Shot = { src: string; alt: string };

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40; // accumulated horizontal wheel delta (px) before advancing
const GESTURE_GAP_MS = 150; // no wheel activity for this long = the swipe gesture has ended
const AUTOPLAY_RESUME_MS = 1200; // resume autoplay this long after the user stops interacting

// Slide direction: +1 travels to the next slide (incoming from the right),
// -1 travels to the previous slide (incoming from the left).
const slideVariants = {
  enter: (direction: 1 | -1) => ({ x: `${direction * 100}%`, opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: 1 | -1) => ({ x: `${direction * -100}%`, opacity: 0 }),
};

export default function ScreenshotCarousel({
  screenshots,
  className = "",
}: {
  screenshots: Shot[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayResumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gestureEndRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeAccum = useRef(0);
  const gestureTriggered = useRef(false);

  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const restartAutoplay = () => {
    pauseAutoplay();
    autoplayRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % screenshots.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restartAutoplay();
    return () => {
      pauseAutoplay();
      if (autoplayResumeRef.current) clearTimeout(autoplayResumeRef.current);
      if (gestureEndRef.current) clearTimeout(gestureEndRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenshots.length]);

  const goSlide = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + screenshots.length) % screenshots.length);
  };

  // Discrete manual actions (arrow/dot clicks) restart autoplay right away.
  const goManual = (dir: 1 | -1) => {
    goSlide(dir);
    restartAutoplay();
  };

  const goToManual = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    restartAutoplay();
  };

  // Trackpad horizontal swipe changes the slide; vertical scroll is left
  // completely alone so the page still scrolls normally. A single continuous
  // swipe only ever advances one slide, no matter how long or fast it is —
  // once it fires, further deltaX is ignored until the wheel has been quiet
  // for GESTURE_GAP_MS (i.e. the gesture actually ended). Autoplay pauses for
  // the whole interaction and resumes once it's been idle for a bit.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();

      pauseAutoplay();
      if (autoplayResumeRef.current) clearTimeout(autoplayResumeRef.current);
      autoplayResumeRef.current = setTimeout(restartAutoplay, AUTOPLAY_RESUME_MS);

      if (gestureEndRef.current) clearTimeout(gestureEndRef.current);
      gestureEndRef.current = setTimeout(() => {
        gestureTriggered.current = false;
        swipeAccum.current = 0;
      }, GESTURE_GAP_MS);

      if (gestureTriggered.current) return;

      swipeAccum.current += e.deltaX;
      if (Math.abs(swipeAccum.current) > SWIPE_THRESHOLD) {
        goSlide(swipeAccum.current > 0 ? 1 : -1);
        gestureTriggered.current = true;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenshots.length]);

  const shot = screenshots[index];

  return (
    <div ref={containerRef} className={`relative mx-auto w-full ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/5">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={shot.src}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ImageFrame
              src={shot.src}
              alt={shot.alt}
              label={`Screenshot ${index + 1}`}
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => goManual(-1)}
        aria-label="Previous screenshot"
        className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-mist backdrop-blur-sm transition-colors hover:text-glow hover:[animation-play-state:paused] md:-left-6 animate-[arrow-bounce-left_1.6s_ease-in-out_infinite]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => goManual(1)}
        aria-label="Next screenshot"
        className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-mist backdrop-blur-sm transition-colors hover:text-glow hover:[animation-play-state:paused] md:-right-6 animate-[arrow-bounce-right_1.6s_ease-in-out_infinite]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="mt-6 flex items-center justify-center gap-3">
        {screenshots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => goToManual(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            className={`h-2 cursor-pointer rounded-full transition-all ${
              i === index ? "w-6 bg-glow" : "w-2 bg-mist-dim/40 hover:bg-mist-dim"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
