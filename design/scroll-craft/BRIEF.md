# BRIEF: Execution log (version 5)

Self-authored, not interviewed. Creative direction was delegated by the user ("clone this and update the website"). The grammar, aesthetic and signature move were chosen with Jev (signature 92%, aesthetic 76%, grammar 52%, a weak lean).

## Method
Built with the scroll-craft skill (nateherk-design). Its scripts were not executed (blocked as external code); its written workflow and the unmodified engine (`public/sc/`) were used. Verification uses our own Playwright run.

## The eight topics
1. **Vibe:** dense, technical, a developer's own tool. References: the Salesforce Developer Console log viewer, a flight recorder, a build log.
2. **Journey:** the page is one Apex transaction being replayed. Hero (execution already running), stack frames (roles), units (projects), the self-built tools, filterable skills, credentials, then a command line.
3. **Energy:** steady and quiet, one spike at the tools, then calm into the input.
4. **Feeling curve** below. **Remembered moment:** the closing receipt, a totalled governor-limit ledger of everything the visitor just read.
5. **Nothing else does this:** the scroll is a playhead on a real execution trace; the bottom rail stamps a line for every section passed and ends as a navigable record.
6. **Range:** dense technical (not premium-minimal, not light paper, not glowing).
7. **World:** one surface, not distinct scenes (live surface grammar).
8. **Assets:** none supplied. No photos, no video, no generated imagery. Type, rules, and live markup only. Real figures only (from `src/data/site.js`).

## Grammar: live surface (and why the other seven lost)
No usable photography ruled out filmic and gallery. The content is a working developer's work, so "watch what it does" is the honest pitch. Poster lost narrowly (33% vs 52%): a poster is loud, this page should be dense and quiet. Editorial and cutlist fit worse. Bans honoured: no scrub, kinetic, spotlight, scrims, hero claim, marketing nav.

## Journey and feeling curve
| Act | Feeling | What causes it |
|---|---|---|
| Hero: the log already running | Curiosity | The first screen is a live log viewer mid-transaction, not a title |
| Experience: stack frames | Orientation | Two nested frames show where the work happened and for how long |
| Work: units | Respect | Each project is a unit with its own stack, expandable |
| Tools: peak span | Awe | The two self-built tools get the largest pinned span and the quiet act before them |
| Skills: filterable log | Competence | A real filter over every event by category |
| Credentials | Trust | Verifiable events linking to Trailhead |
| Close: the command line | Agency | The visitor types; the page answers |
| Receipt (rail end) | Closure | A computed ledger of everything they passed |

**Peak:** the tools act. **Tell-someone sentence:** "It's the site where scrolling plays back his work as an execution log."

## Signature move
Scroll-as-playhead over a persistent execution-trace rail. See `src/scripts/trace.js`.

## Honesty rule
Every counter is computed from the page's own data and DOM. Anything illustrative is labelled. No invented statistics.

## Hard rules (from the skill)
No em dashes in visible text. No scroll cue. No `01 / 06` counters. No gradient text, neon glow, scrims, cards-in-cards. `transform` and `opacity` only for motion. Two font families max (Geist and Geist Mono). Reduced motion: everything visible and static. Without JS: everything visible.
