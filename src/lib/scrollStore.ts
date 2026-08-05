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

type Scroller = { start: () => void; stop: () => void };

let scroller: Scroller | null = null;

/**
 * SmoothScroll hands its Lenis instance over here on mount. Lenis runs its own
 * virtual scroll loop, so setting `overflow: hidden` on an ancestor is not
 * enough to freeze the page behind a modal — the instance itself has to be
 * stopped, and it is otherwise not reachable from other components.
 */
export function registerScroller(instance: Scroller | null) {
  scroller = instance;
}

/** Freeze/unfreeze page scrolling, e.g. while the mobile menu is open. */
export function setScrollLocked(locked: boolean) {
  if (locked) scroller?.stop();
  else scroller?.start();
}
