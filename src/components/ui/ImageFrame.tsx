"use client";

import { useState } from "react";

/**
 * Image that degrades gracefully: until the real asset is dropped in /public,
 * it shows a moody gradient panel with a label instead of a broken-image icon.
 */
export default function ImageFrame({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
  frameClassName = "bg-ink-2",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  frameClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${frameClassName} ${className}`}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-3 via-ink-2 to-ink">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(127,212,212,0.25),transparent_55%)]" />
          <span className="relative px-4 text-center font-hand text-lg text-mist-dim">
            {label ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
