/* eslint-disable @next/next/no-img-element */
import { aboutPhotos, partners } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import PartnerLogo from "@/components/ui/PartnerLogo";

export default function Storytelling() {
  return (
    <section className="relative overflow-hidden bg-[#101a20] px-6 py-32 md:px-16 md:py-44">
      <img
        src="/cubes-pair.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-24 hidden w-52 md:block"
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* event photos — big, interlocking, spanning to the right edge */}
        <Reveal delay={0.15} className="flex items-center justify-end">
          <img
            src={aboutPhotos[2]}
            alt="The team at the Ethio-French Crea-Tech Forum"
            className="w-64 shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] md:w-[35rem]"
          />
          <img
            src={aboutPhotos[1]}
            alt="The team with a mentor"
            className="-ml-24 w-64 shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] md:-ml-64 md:w-[35rem]"
          />
          <img
            src={aboutPhotos[0]}
            alt="Elder Studios receiving an award"
            className="-ml-24 w-64 shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] md:-ml-64 md:w-[35rem]"
          />
        </Reveal>

        {/* heading overlaid on the left, on top of the photos (like the design) */}
        <div className="absolute inset-y-0 left-0 z-10 flex items-center">
          <Reveal>
            <h2 className="max-w-[24rem] font-brand text-5xl uppercase leading-[1.03] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.95)] md:max-w-[46rem] md:text-[3.9rem]">
              Defining the new way of storytelling in gaming
            </h2>
          </Reveal>
        </div>
      </div>

      {/* partner / supporter logos */}
      <Reveal delay={0.2}>
        <div className="mx-auto mt-24 flex max-w-[1500px] flex-wrap items-center justify-center gap-x-10 gap-y-10 md:mt-28 md:gap-x-12">
          {partners.map((p) => (
            <PartnerLogo key={p.name} name={p.name} src={p.src} />
          ))}
        </div>
      </Reveal>

      {/* cube outlines, bottom-right below the logos (like the design) */}
      <img
        src="/cubes-pair.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 right-[6%] hidden w-52 md:block"
      />
    </section>
  );
}
