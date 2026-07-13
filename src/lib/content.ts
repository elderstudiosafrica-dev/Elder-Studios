/**
 * Single source of truth for site content. Swap placeholder values (image
 * paths, trailer URL, social links) for the studio's real assets here.
 */

export const nav = [
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/elder.studios/" },
  { key: "discord", label: "Discord", href: "https://discord.gg/7V8Yp2ayFP" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/elder-studios/" },
  { key: "mail", label: "Email", href: "mailto:hello@elderstudios.com" },
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
    name: "Gabriella Wayye",
    roles: ["3D Artist & Animator"],
    photo: "/team/gabriella.png",
  },
];

/** Event / award photos for the storytelling section (pre-skewed transparent PNGs). */
export const aboutPhotos = [
  "/about/event-1.png",
  "/about/event-2.png",
  "/about/event-3.png",
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
