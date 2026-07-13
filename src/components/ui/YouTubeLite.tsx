"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube embed. The real iframe boots ~1MB of player JS the
 * moment it scrolls into view, which stutters the scroll journey — so until
 * the user actually clicks play we show only the video thumbnail.
 */
export default function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);

  if (playing) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}?rel=0&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className="group relative block h-full w-full cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
        // maxresdefault doesn't exist for every video — fall back to hqdefault
        onError={() => setThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 68 48"
          className="h-12 w-[4.25rem] drop-shadow-lg transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        >
          <path
            d="M66.52 7.74a8 8 0 0 0-5.66-5.66C57.79 1.25 34 1.25 34 1.25s-23.79 0-26.86.83a8 8 0 0 0-5.66 5.66C.65 10.81.65 24 .65 24s0 13.19.83 16.26a8 8 0 0 0 5.66 5.66c3.07.83 26.86.83 26.86.83s23.79 0 26.86-.83a8 8 0 0 0 5.66-5.66C67.35 37.19 67.35 24 67.35 24s0-13.19-.83-16.26Z"
            fill="#f00"
          />
          <path d="M45 24 27 14v20l18-10Z" fill="#fff" />
        </svg>
      </span>
    </button>
  );
}
