# Elder Studios — VEILED

A cinematic, 3D marketing site for Elder Studios and their game **VEILED**.
Built as a scroll-driven WebGL experience: the camera journeys through an
atmospheric world while the content scrolls on top.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **React Three Fiber** + **drei** — 3D scene
- **@react-three/postprocessing** — bloom, vignette, film grain, chromatic aberration
- **GSAP** + **Lenis** — momentum smooth scroll
- **Motion** (Framer Motion) — scroll reveals & micro-interactions
- **Tailwind CSS v4** — styling

## Run it

```bash
npm install      # already done
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## How it's organized

```
src/
  app/                  layout (fonts + theme), globals.css, page.tsx
  lib/
    content.ts          ← ALL editable content (text, links, asset paths)
    scrollStore.ts      shared scroll/pointer state (DOM ↔ 3D)
    useQuality.ts       device quality tiers (desktop / mobile)
  components/
    providers/SmoothScroll.tsx   Lenis momentum scroll
    three/              the WebGL world
      Experience.tsx    fixed full-screen <Canvas>
      Scene.tsx         lights, fog, composition
      CameraRig.tsx     scroll-driven camera journey (waypoints)
      Particles.tsx     drifting dust/embers
      FloatingShards.tsx the design's wireframe cubes, as real 3D
      HeroFigure.tsx    placeholder focal object (swap for Character)
      Effects.tsx       cinematic post-processing
    ui/                 Loader, CustomCursor, Nav, Footer, Reveal, …
    sections/           Hero, Trailer, Gallery, Team, Storytelling
```

## Add real content & assets

- **Text, links, team, partners, trailer id** → edit `src/lib/content.ts`.
- **Images / logos / 3D model** → drop files in `public/` (see
  [`public/ASSETS.md`](public/ASSETS.md)). Missing files degrade gracefully to
  styled placeholders, so nothing ever looks broken.
- **Real character model** → see `src/components/three/Character.tsx.example`.

## Performance & accessibility

- Quality tiers (`useQuality`): full effects on desktop, a lighter stack on
  mobile / low-core devices.
- Full `prefers-reduced-motion` support (loader, scroll, 3D animation all calm).

## Deploy

Push to GitHub and import into **Vercel** (zero-config for Next.js), or:

```bash
npm i -g vercel && vercel
```
