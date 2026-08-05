"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/content";
import { setScrollLocked } from "@/lib/scrollStore";
import Crest from "./Crest";
import Social from "./Social";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Freeze the page behind the menu, close on Escape, and keep focus inside the
  // panel while it's open. Lenis has to be stopped explicitly — see scrollStore.
  useEffect(() => {
    if (!open) return;
    // Captured now so the cleanup doesn't read a ref that may have moved on.
    const toggle = toggleRef.current;
    setScrollLocked(true);
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLocked(false);
      // Send focus back to the control that opened the menu.
      toggle?.focus();
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-0 z-50 bg-transparent"
    >
      {/* Padding and gaps ramp up gradually. Jumping straight to px-28 at md
          left only 544px for the wordmark, links and socials at a 768px
          viewport, which overflowed the document by ~21px. */}
      <nav className="mx-auto flex max-w-[1680px] items-center justify-between px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-20 xl:px-28 xl:py-12">
        {/* z-50 keeps the wordmark above the menu overlay (z-40) when it opens. */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="relative z-50 flex items-center gap-3 sm:gap-4 md:gap-5"
          aria-label="Elder Studios home"
        >
          <Crest className="h-11 w-9 text-mist sm:h-14 sm:w-11 md:h-16 md:w-12" />
          <span className="font-brand text-xl font-black leading-[0.95] tracking-[0.08em] text-mist sm:text-2xl md:text-[2.05rem]">
            ELDER
            <br />
            STUDIOS
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex lg:gap-14 xl:gap-20">
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

        {/* Socials only appear once there's room for them beside the links —
            below lg they'd crowd the bar. They remain in the footer regardless. */}
        <Social className="hidden lg:flex" iconClass="h-5 w-5" />

        {/* Hamburger — the only nav affordance below md. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-mist md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            {/* Two bars that rotate into an X. The middle bar just fades. */}
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center overscroll-contain bg-ink/97 px-10 backdrop-blur-sm outline-none md:hidden"
          >
            <ul className="flex flex-col gap-9">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-brand text-4xl font-black uppercase tracking-[0.1em] text-mist"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <Social className="mt-16 -ml-3" iconClass="h-6 w-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
