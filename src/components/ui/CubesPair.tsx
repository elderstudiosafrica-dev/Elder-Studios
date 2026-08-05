"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The two hand-drawn cube outlines used as decorative accents.
 *
 * The source art shipped as one flat PNG, so the cubes could only ever move as
 * a single block. It's been split into `cube-a` / `cube-b` and re-assembled
 * here at the same relative positions, which lets each cube carry its own
 * motion:
 *
 *   - scroll parallax  — each cube drifts *with* the scroll but slower than the
 *     page, and by a different amount, so they read as sitting behind the
 *     photos rather than pasted on top of them.
 *   - idle float       — a slow bob + tilt (see `cube-float*` in globals.css)
 *     on differing durations, so the pair never falls into visible lockstep.
 *
 * Parallax lives on the outer wrapper and the float on the inner one, so the
 * two transforms compose instead of fighting over the same property.
 */

/** Geometry of the original 844×465 artwork, as % of the frame. */
const CUBES = [
  { src: "/cube-a.png", left: 6.64, top: 12.26, width: 44.19 },
  { src: "/cube-b.png", left: 58.53, top: 4.3, width: 39.69 },
] as const;

export default function CubesPair({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // 0 → 1 across the whole time the element is passing through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different travel per cube — that mismatch is what sells the depth.
  const yA = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const yB = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const rotA = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const rotB = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const motions = [
    { y: yA, rotate: rotA, float: "animate-[cube-float_13s_ease-in-out_infinite]" },
    {
      y: yB,
      rotate: rotB,
      float: "animate-[cube-float-alt_17s_ease-in-out_infinite_-4s]",
    },
  ];

  return (
    // Outer div takes the caller's positioning; the inner one owns the frame the
    // cubes are placed inside. Keeping them separate stops the caller's
    // `absolute` and this component's `relative` from colliding.
    <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className="relative aspect-844/465 w-full">
        {CUBES.map((cube, i) => (
          <motion.div
            key={cube.src}
            className="absolute"
            style={{
              left: `${cube.left}%`,
              top: `${cube.top}%`,
              width: `${cube.width}%`,
              ...(reduced ? null : { y: motions[i].y, rotate: motions[i].rotate }),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cube.src} alt="" className={`w-full ${motions[i].float}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
