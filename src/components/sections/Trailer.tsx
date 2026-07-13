import { game } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import YouTubeLite from "@/components/ui/YouTubeLite";

export default function Trailer() {
  return (
    <section
      id="trailer"
      className="relative overflow-hidden bg-gradient-to-b from-[#030303] via-[#031016] to-[#06323b] px-6 pb-32 pt-10 md:px-16 md:pb-44 md:pt-14"
    >
      <div className="relative mx-auto max-w-[1500px]">
        {/* Ethiopian-cross ornament sitting in the band between hero and trailer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornament.png"
          alt=""
          className="mx-auto mb-20 h-32 w-auto opacity-70 md:mb-28 md:h-44"
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornament.png"
          alt=""
          className="pointer-events-none absolute -left-12 top-[52%] hidden w-[31rem] -translate-y-1/2 opacity-[0.18] md:block"
        />

        <Reveal>
          <div className="relative mx-auto aspect-video w-full max-w-[940px] overflow-hidden shadow-[0_36px_90px_-26px_rgba(0,0,0,0.95)]">
            <YouTubeLite id={game.youtubeId} title="Veiled - Official Trailer" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-24 max-w-[1360px] text-center font-display text-4xl uppercase leading-[0.98] text-mist-dim md:mt-32 md:text-[3.25rem]">
            {game.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
