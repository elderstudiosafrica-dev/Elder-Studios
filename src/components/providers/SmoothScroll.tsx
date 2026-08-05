"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerScroller, scrollState } from "@/lib/scrollStore";

/**
 * Momentum smooth-scroll (Lenis) for the whole document. Also feeds normalized
 * scroll progress + velocity into the shared scrollState so the 3D camera can
 * react to scroll every frame.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduced ? 0 : 1.1,
      smoothWheel: !reduced,
      lerp: 0.1,
    });

    registerScroller(lenis);

    lenis.on("scroll", ({ scroll, limit, velocity }) => {
      scrollState.progress = limit > 0 ? scroll / limit : 0;
      scrollState.velocity = velocity;
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Track pointer for subtle camera parallax.
    const onPointer = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      registerScroller(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
