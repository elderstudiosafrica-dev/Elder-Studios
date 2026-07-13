"use client";

import { Float } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * The hand-drawn wireframe cubes/dice that drift through the design, rebuilt as
 * real floating 3D objects. A mix of thin-edged cubes and faint solid shards.
 */
export default function FloatingShards({ reducedMotion }: { reducedMotion: boolean }) {
  const cubes = useMemo(() => {
    const rng = mulberry32(1337);
    return Array.from({ length: 9 }, () => ({
      position: [
        (rng() - 0.5) * 16,
        (rng() - 0.5) * 9,
        (rng() - 0.5) * 18 - 4,
      ] as [number, number, number],
      rotation: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI] as [
        number,
        number,
        number,
      ],
      scale: 0.4 + rng() * 0.9,
      speed: 0.6 + rng() * 1.2,
      float: 0.4 + rng() * 0.8,
    }));
  }, []);

  return (
    <group>
      {cubes.map((c, i) => (
        <Float
          key={i}
          speed={reducedMotion ? 0 : c.speed}
          rotationIntensity={reducedMotion ? 0 : c.float}
          floatIntensity={reducedMotion ? 0 : c.float}
          position={c.position}
        >
          <WireCube rotation={c.rotation} scale={c.scale} />
        </Float>
      ))}
    </group>
  );
}

function WireCube({
  rotation,
  scale,
}: {
  rotation: [number, number, number];
  scale: number;
}) {
  const geo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  return (
    <group rotation={rotation} scale={scale}>
      {/* faint glass-like body */}
      <mesh geometry={geo}>
        <meshStandardMaterial
          color="#0c171c"
          transparent
          opacity={0.18}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {/* glowing hand-drawn edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#9fe6e6" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

/** Tiny seeded RNG so the layout is stable between renders. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
