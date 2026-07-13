"use client";

import dynamic from "next/dynamic";

// WebGL can't render on the server — load the whole experience client-side only.
const Experience = dynamic(() => import("./Experience"), { ssr: false });

export default function Background() {
  return <Experience />;
}
