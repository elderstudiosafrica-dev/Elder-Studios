# Where to drop real assets

Until a file exists here, the site shows a styled placeholder (gradient panel or
text wordmark) instead of a broken image — so it always looks intentional.

All paths below are referenced from `src/lib/content.ts`. Drop files with these
exact names, or edit `content.ts` to point at your own names.

## Game screenshots → `public/screens/`
- `shot-1.jpg` through `shot-4.jpg`
- `shot-5.webp` through `shot-12.webp`
- ~1600×900 (16:9), JPG/WebP.

## Team photos → `public/team/`
- `makeda.png`, `joshua.png`, `bisrat.png`, `dagmawi.png`
- 1198×1104 PNG with a torn-paper alpha edge. To add a member, copy the alpha
  channel off an existing portrait so the torn edge matches.
- Portrait 3:4, ~600×800.

## "About" event photos → `public/about/`
- `event-diagonal-1.png` through `event-diagonal-4.png`
- 1016×1033 transparent PNGs with matching diagonal masks.

## Partner logos → `public/partners/`
- `france.svg`, `goethe.svg`, `qene.svg`, `africa.svg`,
  `addis-gamer-week.svg`, `comicade.svg`
- SVG preferred (they're shown white/grayscale). PNG works too.

## Trailer
- Set the YouTube video id in `src/lib/content.ts` → `game.youtubeId`.

## Logo / crest
- A placeholder crest is drawn in `src/components/ui/Crest.tsx`.
  Replace its SVG paths with the real Elder Studios logo, or drop an SVG and
  swap the component to render it.

## 3D character model (the big "wow") → `public/models/`
- Export the VEILED character as `character.glb` (GLTF Binary), ideally with an
  idle animation. See `src/components/three/Character.tsx.example` for the
  drop-in loader — rename it to `Character.tsx` and use it in `Scene.tsx` in
  place of `<HeroFigure />`.
- Keep it under ~5–8 MB if possible (use Draco/meshopt compression).
