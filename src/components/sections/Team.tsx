import { team } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ImageFrame from "@/components/ui/ImageFrame";
import Crest from "@/components/ui/Crest";

export default function Team() {
  return (
    <section className="relative bg-[#101d22] px-6 py-32 md:px-16 md:py-44">
      <Reveal className="flex flex-col items-center">
        <Crest className="h-20 w-20 text-mist" />
        <h2 className="mt-5 font-brand text-4xl uppercase tracking-[0.04em] text-mist sm:text-5xl md:text-[4.8rem]">
          THE TEAM
        </h2>
      </Reveal>

      <div className="mx-auto mt-28 grid max-w-[1360px] grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-0">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.1} className="flex flex-col items-center text-center">
            <ImageFrame
              src={member.photo}
              alt={member.name}
              label={member.name}
              className="aspect-[3/4] w-full max-w-[350px] rounded-sm transition-transform duration-500 hover:scale-[1.03]"
              frameClassName="bg-[#101d22]"
            />
            <h3 className="mt-5 font-brand text-2xl text-mist sm:mt-7 sm:text-3xl md:text-[2.25rem]">
              {member.name}
            </h3>
            <p className="mt-2 max-w-[290px] font-display text-base uppercase leading-[1.3] text-mist-dim sm:text-xl md:text-2xl">
              {member.roles.length > 1 && (
                <span className="block">{member.roles.slice(1).join(" · ")}</span>
              )}
              <span className="block">{member.roles[0]}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
