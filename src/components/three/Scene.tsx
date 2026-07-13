"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";
import CameraRig from "./CameraRig";
import Particles from "./Particles";
import FloatingShards from "./FloatingShards";
import HeroFigure from "./HeroFigure";
import type { Quality } from "@/lib/useQuality";

/** Fog colour shifts as the camera journeys between sections. */
const FOG_STOPS = [
  new THREE.Color("#05080b"), // hero — near black forest
  new THREE.Color("#08161b"), // trailer — deep teal
  new THREE.Color("#0a1a16"), // gallery — cold green-black
  new THREE.Color("#0c1117"), // team
  new THREE.Color("#05080b"), // storytelling / footer
];

function lerpColor(t: number, out: THREE.Color) {
  const segs = FOG_STOPS.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * segs;
  const i = Math.min(Math.floor(scaled), segs - 1);
  const f = scaled - i;
  out.copy(FOG_STOPS[i]).lerp(FOG_STOPS[i + 1], f);
  return out;
}

export default function Scene({ quality }: { quality: Quality }) {
  const fog = useRef(new THREE.FogExp2("#05080b", 0.038));
  const keyLight = useRef<THREE.PointLight>(null);
  const _c = useRef(new THREE.Color());

  useFrame((state) => {
    lerpColor(scrollState.progress, _c.current);
    fog.current.color.copy(_c.current);
    // subtle flicker on the key light, like distant firelight
    if (keyLight.current) {
      const t = state.clock.elapsedTime;
      keyLight.current.intensity = 8 + Math.sin(t * 7.3) * 0.6 + Math.sin(t * 3.1) * 0.4;
    }
  });

  return (
    <>
      <primitive object={fog.current} attach="fog" />
      <color attach="background" args={["#05080b"]} />

      <ambientLight intensity={0.25} color="#5b7a82" />
      <pointLight
        ref={keyLight}
        position={[3, 2.5, 4]}
        intensity={8}
        color="#e0a06a"
        distance={20}
        decay={1.6}
      />
      <pointLight position={[-5, 1, -6]} intensity={6} color="#3f8f9a" distance={22} decay={1.6} />
      <directionalLight position={[0, 6, 2]} intensity={0.4} color="#8fb8c0" />

      <HeroFigure reducedMotion={quality.reducedMotion} />
      <FloatingShards reducedMotion={quality.reducedMotion} />
      <Particles count={quality.particles} reducedMotion={quality.reducedMotion} />

      {/* faint ground that dissolves into fog */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, -4]}>
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshStandardMaterial color="#070d10" roughness={1} metalness={0} />
      </mesh>

      <CameraRig reducedMotion={quality.reducedMotion} />
    </>
  );
}
