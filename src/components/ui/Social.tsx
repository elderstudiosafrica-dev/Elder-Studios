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
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

// linkedin/discord are raster brand marks masked with currentColor, not stroke paths
const maskIcons: Record<string, string> = {
  linkedin: "/icons/linkedin.png",
  discord: "/icons/discord.png",
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
      {socials.map((s) => {
        const isExternal = !s.href.startsWith("mailto:") && !s.href.startsWith("tel:");
        return (
        <a
          key={s.key}
          href={s.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          aria-label={s.label}
          className="flex h-11 w-11 items-center justify-center text-mist-dim transition-colors hover:text-glow"
        >
          {maskIcons[s.key] ? (
            <span
              className={`${iconClass} bg-current`}
              style={{
                WebkitMaskImage: `url(${maskIcons[s.key]})`,
                maskImage: `url(${maskIcons[s.key]})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          ) : (
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
          )}
        </a>
        );
      })}
    </div>
  );
}
