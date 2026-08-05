import { game, screenshots } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";

export default function Gallery() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 md:px-16 md:py-36"
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
          <h2 className="mx-auto max-w-[1120px] text-center font-brand text-3xl leading-[0.92] text-mist sm:text-4xl md:text-[4.6rem]">
            {game.pullQuote}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotCarousel screenshots={screenshots} className="mt-24 max-w-[1120px] md:mt-32" />
        </Reveal>
      </div>
    </section>
  );
}
