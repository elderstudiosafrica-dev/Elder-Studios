"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

/**
 * Button/link that gently pulls toward the cursor — a small premium touch.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={offset}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  return href ? (
    <a href={href} className="inline-block">
      {inner}
    </a>
  ) : (
    inner
  );
}
