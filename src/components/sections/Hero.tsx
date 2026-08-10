"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { game } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import heroBackground from "../../../public/hero-bg.jpg";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="games"
      className="relative min-h-screen overflow-hidden bg-[#080604]"
    >
      <div className="absolute inset-0">
        <Image
          src={heroBackground}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Kept light across the top two thirds so the key art actually reads —
            it is already a dark, moody render and does not need help. The
            weight is all in the last third, where it has to reach solid #030303
            to meet the Trailer section without a seam. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,3,3,0.15) 0%, rgba(3,3,3,0.12) 40%, rgba(3,3,3,0.3) 62%, rgba(3,3,3,0.72) 80%, rgba(3,3,3,0.95) 90%, #030303 96%, #030303 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-8 pb-48 pt-80 md:px-28 md:pb-56 md:pt-[29rem]">
        <div className="max-w-[42rem]">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-veiled text-7xl leading-[0.78] text-mist/85 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] sm:text-8xl md:text-[7.4rem]"
          >
            {game.title}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-2xl uppercase leading-[0.92] text-mist-dim sm:mt-7 sm:text-3xl md:text-[3.25rem]"
          >
            {game.tagline}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7"
          >
            <MagneticButton
              href="#trailer"
              className="group inline-flex items-center gap-4 font-display text-xl uppercase leading-none text-mist-dim sm:gap-5 sm:text-2xl md:text-[2.45rem]"
            >
              <span className="border-b border-glow/60 pb-2 transition-colors group-hover:border-glow">
                Learn More
              </span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
