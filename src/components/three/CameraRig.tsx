"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

/** Camera waypoints the journey travels through as you scroll, 0 → 1. */
const WAYPOINTS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [0, 0.6, 9], look: [0, 0.3, 0] }, // hero
  { pos: [1.4, 0.2, 5.5], look: [0, 0, -3] }, // trailer
  { pos: [-1.6, -0.4, 2], look: [0, -0.4, -5] }, // gallery
  { pos: [0.8, 0.8, -1.5], look: [0, 0, -8] }, // team
  { pos: [0, 1.4, -5], look: [0, 0.6, -12] }, // storytelling / footer
];

function sampleWaypoint(t: number, key: "pos" | "look", out: THREE.Vector3) {
  const segs = WAYPOINTS.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * segs;
  const i = Math.min(Math.floor(scaled), segs - 1);
  const f = scaled - i;
  const a = WAYPOINTS[i][key];
  const b = WAYPOINTS[i + 1][key];
  // smoothstep easing between waypoints
  const e = f * f * (3 - 2 * f);
  out.set(
    a[0] + (b[0] - a[0]) * e,
    a[1] + (b[1] - a[1]) * e,
    a[2] + (b[2] - a[2]) * e
  );
  return out;
}

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _curLook = new THREE.Vector3(0, 0.3, 0);

export default function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera);
  const target = useRef(new THREE.Vector3(0, 0.6, 9));

  useFrame((_, delta) => {
    const t = scrollState.progress;
    sampleWaypoint(t, "pos", _pos);
    sampleWaypoint(t, "look", _look);

    // subtle pointer-driven parallax (disabled for reduced motion)
    if (!reducedMotion) {
      _pos.x += scrollState.pointerX * 0.4;
      _pos.y += -scrollState.pointerY * 0.25;
    }

    // critically-damped follow for buttery motion
    const k = 1 - Math.pow(0.0015, delta);
    target.current.lerp(_pos, k);
    camera.position.copy(target.current);

    _curLook.lerp(_look, k);
    camera.lookAt(_curLook);
  });

  return null;
}
