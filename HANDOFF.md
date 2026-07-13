# Elder Studios — VEILED website: asset handoff brief

Everything the dev needs to make the site match the Figma exactly. Send what you
can; partial is fine. File **names matter** — use the exact names below.

---

## 1. Figma access (lets the dev pull exact colors/spacing + export images)

Please provide BOTH:

**a) A personal access token**
1. In Figma: click your avatar (top-right) → **Settings**.
2. Scroll to **Security** → **Personal access tokens** → **Generate new token**.
3. Name it "dev handoff", scopes: leave **File content: read-only** (default).
4. Copy the token (starts with `figd_…`) and send it. *(It's like a password —
   share it privately; it can be revoked anytime.)*

**b) The file key**
- It's in the Figma URL: `figma.com/design/<FILE_KEY>/...` — send that `<FILE_KEY>`
  string (and confirm the page/frame names for the website design).

> Alternatively, just make sure the dev has **edit or view access** to the file.

---

## 2. Fonts

- The font used for the **"VEILED" title and headings** (the rough/sketchy one).
  Send the actual font file(s): **.woff2** preferred, or **.otf/.ttf**.
- The font used for the **handwritten body text** (game description / pull quote).
- The font used for **nav + small labels** (Games / About / Contact), if different.
- If any are Google Fonts, just send the font **names**.

---

## 3. Images — exact specs & filenames

Export at **2× / @2x** where possible. Format: **JPG or WebP** for photos,
**PNG** only if transparency is needed, **SVG** for logos.

### Hero
| File (drop in `public/screens/`) | What | Size |
|---|---|---|
| `hero-bg.jpg` | The forest/cave background scene, **without** the character | ~2560×1440 |
| `hero-character.png` | The mascot character alone, **transparent background** | ~1500px tall |

### Game screenshots → `public/screens/`
- `shot-1.jpg`, `shot-2.jpg`, `shot-3.jpg`, `shot-4.jpg` — 16:9, ~1600×900 each.

### Team photos → `public/team/`
- `makeda.jpg`, `joshua.jpg`, `bisrat.jpg`, `gabriella.jpg`
- Portrait 3:4, ~600×800. (Names/roles already in the build — correct me if wrong.)

### "Storytelling / about" photos → `public/about/`
- `event-1.jpg`, `event-2.jpg` — the event + award photos.

### Logo / crest
- `crest.svg` — the Elder Studios wizard emblem, as **SVG** (single color/white ok).

### Partner logos → `public/partners/` (SVG strongly preferred, white/mono)
- `france.svg` (Ambassade de France), `goethe.svg` (Goethe-Institut),
  `qene.svg`, `africa.svg`, `addis-gamer-week.svg`, `comicade.svg`
- If the exact set differs, send whatever logos belong here with sensible names.

---

## 4. The 3D character model (the big "wow" — highest priority if available)

If the character exists as a 3D asset in Blender / Maya / Unity / Unreal:

- Export as **glTF Binary (`.glb`)** → name it `character.glb` (drop in `public/models/`).
- Include an **idle animation** baked in if there is one.
- **Textures embedded** in the .glb.
- Target **< 8 MB** — use **Draco** or **meshopt** compression if the tool offers it.
- Real-world-ish scale, **+Y up, facing +Z**.
- *(From Blender: File → Export → glTF 2.0, Format = glTF Binary, check
  "Include → Animations" and "Materials → Export".)*

If no model yet, the **transparent character PNG** (above) is enough to start.

---

## 5. Colors & spacing

These will come from the Figma file automatically once we have access. If you'd
rather list them, send the **hex codes** for: background(s), primary text, muted
text, and any accent/glow color, plus the heading vs body **font sizes** for
desktop.

---

## 6. Trailer

- The **YouTube link** (or video ID) for "Veiled — Official Trailer".

---

### TL;DR for the designer
> Figma token + file key, the heading/body fonts, hero background + transparent
> character cutout, 4 game screenshots, 4 team portraits, 2 event photos, the
> crest SVG, the 6 partner logos (SVG), the character `.glb` if it exists, and
> the YouTube trailer link. Use the exact filenames above.
