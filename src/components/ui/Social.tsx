/** Inline social icons (placeholder links — update hrefs in content.ts). */
import { socials } from "@/lib/content";

const paths: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
    </>
  ),
  discord: (
    // the glyph is drawn small; scale it so it reads the same size as the others
    <g transform="translate(12 12) scale(1.5) translate(-12 -12)">
      <path
        vectorEffect="non-scaling-stroke"
        d="M7 8c3-1.2 7-1.2 10 0M7 16c3 1.2 7 1.2 10 0M8 9 6.5 16.5M16 9l1.5 7.5M9.5 12.5h.01M14.5 12.5h.01"
      />
    </g>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export default function Social({
  className = "",
  iconClass = "h-7 w-7",
}: {
  className?: string;
  iconClass?: string;
}) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="flex h-11 w-11 items-center justify-center text-mist-dim transition-colors hover:text-glow"
        >
          <svg
            viewBox="0 0 24 24"
            className={iconClass}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths[s.key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
