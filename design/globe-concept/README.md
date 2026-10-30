# Globe concept (design-only mockup)

Open `index.html` directly. Single file, no build, no libraries, no network (an optional Google Fonts link falls back to system fonts).

## Concept
A calm, dark vector globe drawn with Canvas 2D (own orthographic projection): lat/long graticule, a dot-matrix land mask generated at load from ~25 hand-simplified continent polygons embedded in the file, a soft atmosphere rim, and glowing great-circle arcs that lift off the surface and draw themselves on load, then keep a dashed travel animation. The globe spins in on load. The globe has no text; all content lives in an index list beside it.

## Palette tokens
`--bg #041316` · `--panel #051a1f` · `--mint #5ff0d2` · `--aqua #2fb8c9` · `--ink #e9f3f1` · `--amber #ffb454` (focused/selected item only).
No star field. Type: two sizes (30px name, 15px body) plus 12px mono for meta.

## Interaction
- Drag to orbit with inertia; gentle auto-rotate (stops while something is focused or selected); wheel/pinch zoom (0.7x to 2.4x).
- Hover or keyboard-focus an index row: its point gets an amber ring and pulse, its arc turns amber, others dim, and the globe glides to face it.
- Click a row or a point on the globe to select (click again or click empty globe to clear).
- `prefers-reduced-motion`: no intro spin, auto-rotate, pulse or dash travel; arcs fully drawn; focus changes snap.
- DPR capped at 2; rendering pauses when the tab is hidden.

## Readability rule
No labels on the globe. Every name sits in the index list in normal text; the globe only shows points and arcs.

## Responsive plan
- Desktop: globe left, 420px side panel right (header, then scrolling index).
- Phone (<=820px): compact header, globe in the middle, index as a bottom sheet (46dvh, scrolls) with 48px tap rows. Pinch to zoom, tap points or rows to select.

## Content and honesty note
Home base is Mathura, Uttar Pradesh, India (about 27.49N, 77.67E). **Illustrative: client and tool locations are not exact.** Clients work globally; their points are placeholders chosen only to show arcs spread across the globe (e.g. Pinterest, Assurant, CleverTap, Robotex/ClearTax, PCGI, and the two tool nodes are not real office locations). The UI says so under "Clients and routes". Arcs represent work streams from home base, not shipping routes or offices.

## Known gaps
- Coastlines are deliberately coarse (no small islands beyond a few; Black Sea and Caspian are cut-outs).
- Credentials are static chips (no globe point); Contact rows are plain links.
- Selected-row detail is the single sub-line; no per-project detail view yet.
- Fonts load from Google only if online; offline uses system fonts.
- No automated perf check on real low-end phones; ~6k dots per frame is expected to be fine.
