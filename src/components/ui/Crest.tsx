/* eslint-disable @next/next/no-img-element */

/** Elder Studios wizard crest (real logo). White, transparent PNG. */
export default function Crest({ className = "" }: { className?: string }) {
  return (
    <img
      src="/crest.png"
      alt="Elder Studios"
      className={`object-contain ${className}`}
    />
  );
}
