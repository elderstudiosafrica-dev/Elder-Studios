import { game, screenshots } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ImageFrame from "@/components/ui/ImageFrame";

export default function Gallery() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#06323b] via-[#0a2932] to-[#101d22] px-6 py-24 md:px-16 md:py-36"
    >
      {/* large faint ornament bleeding off the right edge, like the design */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ornament.png"
        alt=""
        className="pointer-events-none absolute -right-28 top-[34%] w-72 opacity-[0.08] md:-right-28 md:w-[34rem]"
      />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal>
          <h2 className="mx-auto max-w-[1120px] text-center font-brand text-5xl leading-[0.92] text-mist md:text-[4.6rem]">
            {game.pullQuote}
          </h2>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-9 sm:grid-cols-2 md:mt-32 md:gap-x-14">
          {screenshots.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 0.08}>
              <ImageFrame
                src={shot.src}
                alt={shot.alt}
                label={`Screenshot ${i + 1}`}
                className="aspect-video w-full rounded-sm border border-white/5 transition-transform duration-500 hover:scale-[1.02]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
