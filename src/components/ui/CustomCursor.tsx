"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Soft glowing custom cursor (desktop only). Grows over interactive elements.
 * Disabled entirely on touch devices and for reduced-motion users.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let dx = rx;
    let dy = ry;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      const interactive = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor='hover']"
      );
      if (ring.current) {
        ring.current.style.width = interactive ? "56px" : "30px";
        ring.current.style.height = interactive ? "56px" : "30px";
        ring.current.style.opacity = interactive ? "0.9" : "0.5";
      }
    };

    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-glow"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/70 transition-[width,height,opacity] duration-200 ease-out"
        style={{ marginLeft: "-15px", marginTop: "-15px" }}
      />
    </>
  );
}
