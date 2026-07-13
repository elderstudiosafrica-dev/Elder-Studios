"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

/** Drifting dust / ember motes that fill the volume with atmosphere. */
export default function Particles({
  count,
  reducedMotion,
}: {
  count: number;
  reducedMotion: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
      speeds[i] = 0.05 + Math.random() * 0.18;
    }
    return { positions, speeds };
  }, [count]);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(200,225,230,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!points.current || reducedMotion) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      // gentle upward drift + horizontal sway
      arr[i * 3 + 1] += speeds[i] * delta * 0.6;
      arr[i * 3] += Math.sin(t * 0.2 + i) * delta * 0.04;
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -8;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    // faint reaction to scroll velocity
    points.current.rotation.y += scrollState.velocity * 0.00002;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.12}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.9}
        color="#dff6f7"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
