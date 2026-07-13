"use client";

import { motion } from "motion/react";
import { nav } from "@/lib/content";
import Crest from "./Crest";
import Social from "./Social";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-0 z-50 bg-transparent"
    >
      <nav className="mx-auto flex max-w-[1680px] items-center justify-between px-8 py-8 md:px-28 md:py-12">
        <a href="#top" className="flex items-center gap-4 md:gap-5" aria-label="Elder Studios home">
          <Crest className="h-14 w-11 text-mist md:h-16 md:w-12" />
          <span className="font-brand text-2xl font-black leading-[0.95] tracking-[0.08em] text-mist md:text-[2.05rem]">
            ELDER
            <br />
            STUDIOS
          </span>
        </a>

        <ul className="hidden items-center gap-14 md:flex xl:gap-20">
          {nav.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`group relative font-brand text-lg font-black uppercase tracking-[0.12em] transition-colors hover:text-mist xl:text-[1.35rem] ${
                  index === 0 ? "text-mist" : "text-mist/65"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-glow transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <Social className="hidden sm:flex" iconClass="h-5 w-5" />
      </nav>
    </motion.header>
  );
}
