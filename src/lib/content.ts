/**
 * Single source of truth for site content. Swap placeholder values (image
 * paths, trailer URL, social links) for the studio's real assets here.
 */

export const nav = [
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "tel:+251910975199" },
];

export const socials = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/elder.studios/" },
  { key: "discord", label: "Discord", href: "https://discord.gg/7V8Yp2ayFP" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/elder-studios/" },
  { key: "mail", label: "Email", href: "mailto:elderstudiosafrica@gmail.com" },
];

export const game = {
  title: "VEILED",
  tagline: "Traverse the untold reality",
  youtubeId: "CPBk1RHAQIM",
  description:
    "VEILED is a narrative-driven puzzle platformer where you control a lone unnamed girl escaping a war-torn city in hopes of survival. You solve environmental puzzles, avoid deadly traps, and encounter people who have been traumatized and influenced by the tolls of the war. As you navigate through this chaos, you start to better understand the true horrors of war, especially the effect it has on women and children.",
  pullQuote:
    "Veiled is not just a horror game, it is a voice for stories left in the dark.",
};

/** Game screenshots — drop files in /public/screens and update here. */
export const screenshots = [
  { src: "/screens/shot-5.webp", alt: "Veiled — foggy neighborhood street" },
  { src: "/screens/shot-6.webp", alt: "Veiled — abandoned industrial tunnel" },
  { src: "/screens/shot-7.webp", alt: "Veiled — ruined neighborhood roadway" },
  { src: "/screens/shot-8.webp", alt: "Veiled — damaged residential alley" },
  { src: "/screens/shot-9.webp", alt: "Veiled — abandoned two-story interior" },
  { src: "/screens/shot-10.webp", alt: "Veiled — debris-filled interior" },
  { src: "/screens/shot-11.webp", alt: "Veiled — eerie room with seated figures" },
  { src: "/screens/shot-12.webp", alt: "Veiled — makeshift exterior scaffolding" },
];

export const team = [
  {
    name: "Makeda Yonas",
    roles: ["3D Artist & Animator", "Game Designer & Developer"],
    photo: "/team/makeda.png",
    linkedin: "https://www.linkedin.com/in/makeda-yonas/",
  },
  {
    name: "Joshua Tadesse",
    roles: ["Lead Game Designer & Developer", "CEO"],
    photo: "/team/joshua.png",
    linkedin: "https://www.linkedin.com/in/joshua-tadesse-aa8081225/",
  },
  {
    name: "Bisrat Ashagre",
    roles: ["Game Designer & Developer", "3D Artist", "UI/UX Designer"],
    photo: "/team/bisrat.png",
    linkedin: "https://www.linkedin.com/in/bashagre07/",
  },
  {
    name: "Dagmawi Tsegaye",
    roles: ["Environment and Prop Artist"],
    photo: "/team/dagmawi.png",
    linkedin: "https://www.linkedin.com/in/dagmawi-tsegaye-418899a4/",
  },
];

/**
 * Pre-masked event photos for the three-panel storytelling ribbon. Nine
 * unique photos (no duplicates — see /public/about), grouped into three
 * batches of three. The whole batch swaps together every cycle, so each
 * photo appears exactly once per full rotation instead of sliding in one
 * slot at a time.
 */
export const aboutPhotos = [
  {
    src: "/about/event-diagonal-1.png",
    alt: "Elder Studios team at the Ethio-French Crea-Tech Forum booth",
  },
  {
    src: "/about/event-diagonal-2.png",
    alt: "Elder Studios presenting VEILED at the Ethio-French Crea-Tech Forum",
  },
  {
    src: "/about/event-diagonal-3.png",
    alt: "Elder Studios team at Craft Addis",
  },
  {
    src: "/about/event-1.png",
    alt: "Elder Studios receiving an Addis Games Week award",
  },
  {
    src: "/about/event-2.png",
    alt: "Elder Studios receiving a certificate of achievement",
  },
  {
    src: "/about/event-3.png",
    alt: "Elder Studios team at the Ethio-French Crea-Tech Forum",
  },
  {
    src: "/about/event-b2-1.webp",
    alt: "Elder Studios team on stage at the Ethio-French Crea-Tech Forum",
  },
  {
    src: "/about/event-b3-1.webp",
    alt: "Elder Studios presenting VEILED on-screen at the Ethio-French Crea-Tech Forum",
  },
  {
    src: "/about/event-diagonal-4.png",
    alt: "Visitors playing VEILED at the Ethio-French Crea-Tech Forum",
  },
];

/** Partner / supporter logos (white, transparent). */
export const partners = [
  { name: "Ambassade de France", src: "/partners/france.png" },
  { name: "Goethe-Institut", src: "/partners/goethe.png" },
  { name: "Qene Games", src: "/partners/qene.png" },
  { name: "Habesha Creative Lab", src: "/partners/habesha.png" },
  { name: "Addis Games Week", src: "/partners/addis-games-week.png" },
  { name: "Afrika Comicade", src: "/partners/comicade.png" },
];
