"use client";

import { useEffect, useRef, useState } from "react";

/** Partner logo that falls back to a text wordmark if the SVG isn't present. */
export default function PartnerLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The error event can fire before hydration attaches onError, so also check
  // the image's loaded state once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className="flex h-36 items-center opacity-90 grayscale transition-opacity duration-300 hover:opacity-100"
      title={name}
    >
      {failed ? (
        <span className="font-sans text-sm uppercase tracking-[0.2em] text-mist-dim">
          {name}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={name}
          className="max-h-32 w-auto"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
