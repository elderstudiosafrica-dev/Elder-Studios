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
  { src: "/screens/shot-1.jpg", alt: "Veiled — firelit interior" },
  { src: "/screens/shot-2.jpg", alt: "Veiled — ruined street at night" },
  { src: "/screens/shot-3.jpg", alt: "Veiled — flooded underpass" },
  { src: "/screens/shot-4.jpg", alt: "Veiled — abandoned home" },
];

export const team = [
  {
    name: "Makeda Yonas",
    roles: ["3D Artist & Animator", "Game Designer & Developer"],
    photo: "/team/makeda.png",
  },
  {
    name: "Joshua Tadesse",
    roles: ["Lead Game Designer & Developer", "CEO"],
    photo: "/team/joshua.png",
  },
  {
    name: "Bisrat Ashagre",
    roles: ["Game Designer & Developer", "3D Artist", "UI/UX Designer"],
    photo: "/team/bisrat.png",
  },
  {
    name: "Dagmawi Tsegaye",
    roles: ["Environment and Prop Artist"],
    photo: "/team/dagmawi.png",
  },
];

/**
 * Event / award photos for the storytelling section, as batches of three.
 *
 * The section shows one batch at a time in three interlocking parallelogram
 * panels, cycling through the batches. Each entry is a pre-skewed transparent
 * image, and the three panels have *different* silhouettes — so position within
 * a batch is meaningful: index 0 is always the left panel, 1 the middle, 2 the
 * right. A photo cut for one panel will not fit another.
 */
export const aboutPhotoBatches: { src: string; alt: string }[][] = [
  [
    { src: "/about/event-3.png", alt: "The team at the Ethio-French Crea-Tech Forum" },
    { src: "/about/event-2.png", alt: "The team with a mentor" },
    { src: "/about/event-1.png", alt: "Elder Studios receiving an award" },
  ],
  [
    { src: "/about/event-b2-1.webp", alt: "The Ethio-French Crea-Tech Forum cohort on stage" },
    { src: "/about/event-b2-2.webp", alt: "The team showing VEILED at their booth" },
    { src: "/about/event-b2-3.webp", alt: "The team with an award at the Crea-Tech Forum" },
  ],
  [
    { src: "/about/event-b3-1.webp", alt: "Presenting VEILED to a room of players" },
    { src: "/about/event-b3-2.webp", alt: "Players trying VEILED at the studio booth" },
    { src: "/about/event-b3-3.webp", alt: "The team at Craft Addis" },
  ],
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
