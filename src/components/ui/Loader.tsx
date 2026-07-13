"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Crest from "./Crest";

const SEEN_KEY = "elder-intro-seen";

/**
 * Cinematic intro — the site "boots up" like a game. Shown only on the first
 * visit of a session (stored in sessionStorage); reloads/navigations skip it.
 */
export default function Loader() {
  // "pending" until we've checked sessionStorage (renders nothing → no flash
  // of the overlay on repeat visits).
  const [phase, setPhase] = useState<"pending" | "playing" | "done">("pending");
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    if (seen) {
      setPhase("done");
      return;
    }

    setPhase("playing");
    document.documentElement.classList.add("lenis-stopped");

    const total = reduced ? 400 : 2200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      setProgress(1 - Math.pow(1 - p, 3)); // ease-out, feels weighty
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        setPhase("done");
        document.documentElement.classList.remove("lenis-stopped");
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <Crest className="h-20 w-20 drop-shadow-[0_0_18px_rgba(127,212,212,0.4)]" />
            <span className="mt-5 font-display text-2xl tracking-[0.35em] text-mist">
              ELDER STUDIOS
            </span>
          </motion.div>

          <div className="mt-10 h-px w-48 overflow-hidden bg-fog/30">
            <motion.div className="h-full bg-glow" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="mt-3 font-hand text-lg text-mist-dim">
            {Math.round(progress * 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
