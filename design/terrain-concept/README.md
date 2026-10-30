# Terrain concept

Design-only mockup. Open `index.html` directly: no build, no libraries, no network apart from an optional Google Fonts link (Inter, JetBrains Mono; system fallbacks apply). `index.html?fixed` disables the adaptive grid downgrade (used for the previews).

## Concept
A calm, dark topographic terrain drawn with canvas 2D. A smooth-noise heightfield with distinct peaks is projected with hand-written perspective math and drawn back-to-front (painter's order, so ridges occlude correctly) as faint wire mesh plus glowing iso-height contour lines (marching squares). Summits are the projects, a glowing trail links Fexle Services to PCGI, and a flat plateau is the base camp. The first seconds: contours rise from a flat plane, the camera settles in, then the trail draws itself.

## Palette tokens
- `--bg` #041316 (deep teal near-black), `--bg-2` #072229
- `--line` #5ff0d2 (mint), `--line-2` #2fb8c9 (aqua), low-alpha layers for mesh and minor contours
- `--text` #e9f3f1, `--muted` #8fa9ab
- `--amber` #ffb454: only for the focused/selected item (ring, glow, beam, list tick)
- Type: 15px body, 26px name (22px on phone), 11px mono for meta. Two sizes plus mono.

## Interaction
- Drag to orbit, wheel or pinch to zoom, gentle auto-drift after 2.5s idle.
- Hover or keyboard-focus an index entry: amber ring, glow and beam on its summit, camera eases toward it. Click a summit (or entry) to select; click again or press Esc to clear.
- `prefers-reduced-motion`: no intro, drift or pulse; camera snaps. DPR capped at 2, rendering pauses when the tab is hidden, grid adapts (70x70 desktop, 46x46 phone, steps down if frames run slow).

## Readability rule
The terrain carries no text. All content lives in the index list (Summits, Trail, Base camp, Contact); the terrain only shows markers that map to list entries.

## Responsive plan
- Desktop: terrain left, 420px index panel right (340px on narrow desktops), selected entry expands inline.
- Phone (<=760px): terrain on top with a compact name header, bottom sheet with the selected entry's detail and a horizontally scrolling chip row of all entries grouped by label.

## Known gaps
- Cells are drawn as individual canvas paths; slow software rendering (headless) measures about 25fps, real phone GPUs untested.
- Painter order is approximate for extreme pitch angles; markers are not occluded by ridges.
- Bloom uses a downscaled copy with `ctx.filter` blur; Safari lacks `ctx.filter`, so the glow is softer and blockier there.
- Contact has no real terrain feature (a beacon at the far corner stands in); base camp is a plateau marker only.
- Descriptions are short and factual; role details for Fexle Services and project outcomes were not supplied, so none are claimed.
- Google Fonts link is optional; no focus trap or screen-reader pass beyond basic aria on the list and canvas.
