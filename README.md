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
src/data/site.js      content
src/pages/index.astro page markup
src/scripts/morph.js  morph stage logic
src/styles/global.css styles
public/               static assets
astro.config.mjs      site + base ('/portfolio')
.github/workflows/    CI and deploy
```

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request. Pushes to `main` (and manual runs) publish `dist/` to the `gh-pages` branch. If the site is not being served, set Settings > Pages > Deploy from branch > `gh-pages` / root.

## Design notes

On desktop, sections are presented on a single morph stage that transitions between states. On phones and when the user prefers reduced motion, the site falls back to a stacked, scrollable layout with no morphing.
