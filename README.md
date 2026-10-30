# Portfolio

Personal portfolio site, live at https://bharat100-cpu.github.io/portfolio/

## Stack

- Astro 6, static output
- Vanilla JavaScript for the interactions (`src/scripts/app.js`); no framework runtime
- Plain CSS (`src/styles/global.css`)

## Editing content

All copy and data live in `src/data/site.js`. Edit that file; the page in `src/pages/index.astro` renders from it.

## Scripts

- `npm run dev` starts the dev server
- `npm run build` builds to `dist/`
- `npm run preview` serves the production build locally

## Layout

```
src/data/site.js        content, plus the skill -> category colour map
src/pages/index.astro   page shell (meta, nav, sections)
src/components/         Hero, Experience, Work, Skills, Credentials, Contact
src/styles/tokens.css   colour tokens; data-cat="apex|lwc|integ|auto|cloud" sets --c
src/styles/*.css        global + per-section styles
src/scripts/            app.js (reveal, progress, nav), hero.js (org-graph canvas)
public/                 static assets
```

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request. Pushes to `main` (and manual runs) publish `dist/` to the `gh-pages` branch. If the site is not being served, set Settings > Pages > Deploy from branch > `gh-pages` / root.

## Design notes

Dark aurora base with a colour code used site-wide: purple for Apex and async, cyan for UI (LWC, Aura), green for integration, amber for automation and blue for clouds. The hero draws the skills as an interactive org graph in those colours. Animation pauses offscreen and is disabled under `prefers-reduced-motion`.
