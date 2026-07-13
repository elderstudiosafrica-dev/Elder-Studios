"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { game } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="games"
      className="relative min-h-screen overflow-hidden bg-[#080604]"
    >
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-8 pb-48 pt-80 md:px-28 md:pb-56 md:pt-[29rem]">
        <div className="max-w-[42rem]">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-veiled text-8xl leading-[0.78] text-mist/85 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] md:text-[7.4rem]"
          >
            {game.title}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 font-display text-4xl uppercase leading-[0.92] text-mist-dim md:text-[3.25rem]"
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
              className="group inline-flex items-center gap-5 font-display text-3xl uppercase leading-none text-mist-dim md:text-[2.45rem]"
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
