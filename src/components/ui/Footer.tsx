/* eslint-disable @next/next/no-img-element */
import { nav } from "@/lib/content";
import Crest from "./Crest";
import Social from "./Social";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 flex flex-col items-center gap-8 overflow-hidden bg-gradient-to-b from-[#101a20] to-[#05080b] px-6 py-24 text-center md:py-28"
    >
      <Crest className="h-20 w-20 text-mist" />

      <ul className="mt-12 flex items-center gap-16">
        {nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="font-brand text-base font-black uppercase tracking-[0.12em] text-mist transition-colors hover:text-glow"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <Social className="mt-8" iconClass="h-5 w-5" />

      <img
        src="/cubes-cluster.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none mt-8 w-72"
      />

      <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-fog">
        © {new Date().getFullYear()} Elder Studios. All rights reserved.
      </p>
    </footer>
  );
}
