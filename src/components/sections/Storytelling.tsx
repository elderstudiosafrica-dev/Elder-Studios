import { partners } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import PartnerLogo from "@/components/ui/PartnerLogo";
import CubesPair from "@/components/ui/CubesPair";
import RotatingPhotos from "@/components/ui/RotatingPhotos";

export default function Storytelling() {
  // Bottom padding is deeper than the top's: the decorative cubes sit
  // absolutely at bottom-16 and are ~115px tall, so the section needs at least
  // that much clear space under the logo strip or they ride up over it.
  return (
    <section className="relative overflow-hidden bg-[#101d22] px-6 py-32 md:px-16 md:pt-44 md:pb-56">
      {/* top-6, not top-24: the photo row is taller now and starts at the
          section's top padding, so at top-24 the cubes sat behind it. */}
      <CubesPair className="absolute left-[10%] top-6 hidden w-52 md:block" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Heading. From md up it is lifted out of flow and overlaid on the left
            of the photos, as in the design. On mobile the photo ribbon is only
            ~152px tall, so overlaying five lines of display type on it is
            unreadable — there it stays in flow and simply sits above. It leads
            in the DOM so that stacking order comes out right without `order`. */}
        <div className="relative z-10 mb-12 flex items-center md:absolute md:inset-y-0 md:left-0 md:mb-0">
          <Reveal>
            <h2 className="max-w-[24rem] font-brand text-4xl uppercase leading-[1.03] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.95)] sm:text-5xl md:max-w-[46rem] md:text-[3.9rem]">
              Where immersive worlds become unforgettable stories.
            </h2>
          </Reveal>
        </div>

        {/* Event photos — three interlocking, pre-masked parallelograms with the
            center panel dropped below the outer pair, rotating through the
            four-photo set. Geometry details live in RotatingPhotos. */}
        <Reveal delay={0.15}>
          <RotatingPhotos />
        </Reveal>
      </div>

      {/* Partner / supporter logos — infinite right-to-left marquee, running
          edge to edge as in the design (the negative margins on the wrapper
          cancel the section padding).

          The visible window is still capped below the width of one full set of
          logos, so the wrap-around copy can never be on screen at the same time
          as the original. One set is ~1730px at these sizes, hence the cap —
          which means the strip is genuinely full-bleed on any realistic
          viewport and only starts inset beyond ~1730px. */}
      <Reveal delay={0.2} className="-mx-6 md:-mx-16">
        <div className="relative mx-auto mt-24 max-w-[1730px] overflow-hidden md:mt-28 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-[marquee-left_32s_linear_infinite] items-center gap-x-12 hover:[animation-play-state:paused] md:gap-x-20">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <PartnerLogo key={`${p.name}-${i}`} name={p.name} src={p.src} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* cube outlines, bottom-right below the logos (like the design) */}
      <CubesPair className="absolute bottom-16 right-[6%] hidden w-52 md:block" />
    </section>
  );
}
