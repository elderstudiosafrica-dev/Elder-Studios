"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { useMemo } from "react";

/**
 * Cinematic post-processing — the layer that makes it feel like a horror game
 * rather than a webpage. Bloom for the glowing edges/embers, vignette + film
 * grain + a whisper of chromatic aberration for unease.
 */
export default function Effects({ heavy }: { heavy: boolean }) {
  const caOffset = useMemo(() => new Vector2(0.0004, 0.0004), []);

  if (!heavy) {
    // Lightweight stack for low-tier devices: just bloom + vignette.
    return (
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.85} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={1.05}
        luminanceThreshold={0.32}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={caOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.35} />
      <Vignette eskil={false} offset={0.25} darkness={0.95} />
    </EffectComposer>
  );
}
