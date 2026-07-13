import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const DL = "/Users/agent47/Downloads";
const PUB = path.resolve(process.cwd(), "public");

const ensure = (d) => fs.mkdirSync(path.join(PUB, d), { recursive: true });
["screens", "team", "about", "partners"].forEach(ensure);

const src = (f) => path.join(DL, f);
const out = (f) => path.join(PUB, f);

async function jpg(from, to, width) {
  await sharp(src(from))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out(to));
  console.log("jpg →", to);
}

async function png(from, to, width) {
  await sharp(src(from))
    .resize({ width, withoutEnlargement: true })
    .png()
    .toFile(out(to));
  console.log("png →", to);
}

async function run() {
  // --- Game screenshots (16:9) ---
  await jpg("Screenshot 2026-04-21 21-20-46 1.png", "screens/shot-1.jpg", 1600);
  await jpg("Screenshot 2026-04-21 21-11-47 1.png", "screens/shot-2.jpg", 1600);
  await jpg("photo_2026-05-29 11.32.20 1.png", "screens/shot-3.jpg", 1600);
  await jpg("photo_2026-05-29 11.32.16 1.png", "screens/shot-4.jpg", 1600);

  // --- Team: split the torn-paper strip into 4 equal columns ---
  const teamSrc = src("Veiled Pitch Deck(2) 1.png");
  const meta = await sharp(teamSrc).metadata();
  const colW = Math.floor(meta.width / 4);
  const names = ["makeda", "joshua", "bisrat", "gabriella"];
  for (let i = 0; i < 4; i++) {
    await sharp(teamSrc)
      .extract({ left: i * colW, top: 0, width: colW, height: meta.height })
      .png()
      .toFile(out(`team/${names[i]}.png`));
    console.log("team →", names[i]);
  }

  // --- About / event photos (already skewed parallelograms, keep transparent) ---
  await png("Frame 19.png", "about/event-1.png", 900);
  await png("Frame 20.png", "about/event-2.png", 900);
  await png("Frame 21.png", "about/event-3.png", 900);

  // --- Partner logos (white, transparent) ---
  await png("Veiled UI(11) 1.png", "partners/france.png", 480);
  await png("Veiled(1) 1.png", "partners/goethe.png", 480);
  await png("Veiled(1) 3.png", "partners/qene.png", 480);
  await png("Veiled UI(10) 1.png", "partners/habesha.png", 480);
  await png("Veiled UI(6) 1.png", "partners/addis-games-week.png", 480);
  await png("Veiled(1) 2.png", "partners/comicade.png", 480);

  // --- Ethiopian cross ornament (hero emblem) ---
  await png("Elder Studios Game Developer Profile - XGC Africa 1.png", "ornament.png", 600);

  console.log("\nDone.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
