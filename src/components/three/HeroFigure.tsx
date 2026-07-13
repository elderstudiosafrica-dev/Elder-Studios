"use client";

import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

/**
 * Placeholder focal object standing in for the VEILED character render.
 * An ethereal, slowly breathing form — swap for <Character /> once the studio
 * sends the .glb model (see src/components/three/Character.tsx.example).
 */
export default function HeroFigure({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reducedMotion) {
      group.current.position.y = -0.2 + Math.sin(t * 0.6) * 0.12;
      group.current.rotation.y = Math.sin(t * 0.15) * 0.3 + scrollState.pointerX * 0.3;
    }
  });

  return (
    <group ref={group} position={[2.4, -0.2, -0.5]} scale={1.25}>
      <mesh>
        <icosahedronGeometry args={[1.05, 6]} />
        <MeshDistortMaterial
          color="#22454f"
          emissive="#46a6b0"
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.5}
          distort={reducedMotion ? 0 : 0.32}
          speed={1.4}
        />
      </mesh>
      {/* glowing wireframe halo */}
      <mesh scale={1.4}>
        <icosahedronGeometry args={[1.05, 3]} />
        <meshBasicMaterial color="#9fe6e6" wireframe transparent opacity={0.25} />
      </mesh>
      {/* local glow light */}
      <pointLight color="#7fd4d4" intensity={6} distance={9} decay={1.4} />
    </group>
  );
}
