"use client";

import { useEffect, useState } from "react";

export type QualityTier = "high" | "low";

export interface Quality {
  tier: QualityTier;
  /** Whether the user prefers reduced motion. */
  reducedMotion: boolean;
  /** Particle count budget for the current tier. */
  particles: number;
  /** Whether to render the heavier post-processing stack. */
  heavyFx: boolean;
  /** Device pixel ratio cap for the renderer. */
  dpr: [number, number];
}

/**
 * Decide a rendering quality tier from the device. Mobile / low-core / reduced
 * motion devices get a lighter — but still atmospheric — experience.
 */
export function useQuality(): Quality {
  const [quality, setQuality] = useState<Quality>({
    tier: "high",
    reducedMotion: false,
    particles: 1400,
    heavyFx: true,
    dpr: [1, 1.75],
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    const narrow = window.innerWidth < 768;

    const low = coarse || narrow || cores <= 4;

    setQuality(
      low
        ? {
            tier: "low",
            reducedMotion: reduced,
            particles: 450,
            heavyFx: false,
            dpr: [1, 1.25],
          }
        : {
            tier: "high",
            reducedMotion: reduced,
            particles: 1400,
            heavyFx: true,
            dpr: [1, 1.75],
          }
    );
  }, []);

  return quality;
}
