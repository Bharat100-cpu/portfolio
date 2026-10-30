# Atlas: isometric vector-city portfolio (design concept)

Design only. Nothing here is built into the site: `index.html` is a standalone, interactive mockup (open it in a browser, no build step). The live site in `src/` is untouched.

## Concept

The portfolio is a 3D map. Each role, project and credential is a building on a tilted, paper-cartography city. Skills are colour-coded transit lines running between districts, so the colour system doubles as the navigation logic.

Chosen with Jev: isometric city (60%) in a paper-cartography palette (57%). Moderate confidence, so treat it as a lean rather than a verdict.

## Look

| Token | Value | Use |
|---|---|---|
| Paper | `#f4ecd8`, `#efe4c8` | page and ground |
| Ink | `#14213d` | all linework, text, hard shadows |
| Apex & async | `#6c4fe0` | violet line and buildings |
| LWC / Aura | `#1a9e96` | teal |
| Integration | `#d6336c` | magenta |
| Automation | `#f2b705` | yellow |
| Clouds | `#ff6b35` | orange |

- Flat vector fills with thick ink outlines and offset "sticker" shadows. No gradients on surfaces except the hero word.
- Type: Space Grotesk (display and pins), Inter (body), JetBrains Mono (map labels).
- Deliberately the opposite of the live site: light, warm, flat-colour, hard-edged.

## The 3D system

- Real CSS 3D, no library: a camera `div` with `rotateX/rotateZ/scale`, a world plane, and each building as five faces (top plus four walls).
- Orbit by drag (rotateZ), tilt by vertical drag (clamped 25 to 75 degrees), zoom by wheel or pinch.
- Labels are billboards: they counter-rotate by the camera angles so they always face the viewer.
- Hover lifts a building and opens a record card. Click flies the camera to its district.
- Idle drift (slow sway) so the first five seconds feel alive without any input.

## Content map

| District | Contains |
|---|---|
| PCGI · Now | MNK tower, current role |
| Fexle Quarter | Assurant, CleverTap, Pinterest, Robotex |
| Certification Hill | the four certifications and the superbadges |
| Tooling Works | Transaction Inspector, Scheduled Jobs Manager |
| Contact Airfield | the mailto runway |

Building height is a visual weight (flagship work is taller), not a measurement. All text comes from `src/data/site.js`.

## Recruiter path

A bottom dock flies the camera to each district in one click (Overview, Now, Fexle, Certifications, Tooling, Contact). A visually hidden list of every building carries the same content for screen readers. In the full build, add a visible "List view" toggle that swaps the map for a plain résumé layout.

## Form factors

- Desktop: full map, legend top right, dock bottom centre.
- Tablet: same map, larger hit targets, legend collapsible.
- Phone: map fills the screen, dock scrolls horizontally, legend hidden, pinch to zoom, tap a building for a bottom-sheet card instead of a hover card.
- Reduced motion: no drift, instant camera moves.

## Known gaps in the mockup (to fix in the real build)

1. Fly-to centring is approximate; compute the camera offset from the rotated district centre.
2. On phones the overview sits slightly left of centre.
3. Pin labels overlap in dense areas (Certification Hill); needs collision handling or label-on-hover for small buildings.
4. District labels are partly hidden behind tall towers.
5. Hover cards need a tap/bottom-sheet variant on touch.
6. CSS 3D with many faces can be heavy on low-end phones; build should cap faces (merge walls into two per building) and test Safari.
7. Hard-coded content; the real build must read `site.js`.

## Open decisions

- Keep light paper only, or also offer a dark "night map" variant?
- Should the map be the whole site, or the hero above a conventional scroll for SEO and recruiters?
