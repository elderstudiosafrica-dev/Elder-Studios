/**
 * Module-level scroll state shared between Lenis (DOM) and R3F (useFrame).
 * Kept outside React so the 3D camera can read scroll every frame without
 * triggering re-renders.
 */
export const scrollState = {
  /** Normalized scroll progress across the whole page, 0 → 1. */
  progress: 0,
  /** Raw scroll velocity from Lenis (used for subtle motion-reactive effects). */
  velocity: 0,
  /** Pointer position in normalized device coords, -1 → 1. */
  pointerX: 0,
  pointerY: 0,
};
