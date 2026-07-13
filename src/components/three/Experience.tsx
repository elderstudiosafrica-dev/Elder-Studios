"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import Effects from "./Effects";
import { useQuality } from "@/lib/useQuality";

/**
 * Fixed, full-viewport WebGL backdrop. The DOM content scrolls on top of this
 * while the camera journeys through the 3D world driven by scroll progress.
 */
export default function Experience() {
  const quality = useQuality();

  return (
    <div className="fixed inset-0 -z-10 h-[100dvh] w-full">
      <Canvas
        dpr={quality.dpr}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0.6, 9] }}
      >
        <Suspense fallback={null}>
          <Scene quality={quality} />
          <Effects heavy={quality.heavyFx} />
        </Suspense>
      </Canvas>
      {/* readability scrim so text always sits above the scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />
    </div>
  );
}
