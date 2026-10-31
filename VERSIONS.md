# Site versions

Every earlier design is kept as a branch under `archive/`, so any of them can be brought back.

| Branch | What it is |
|---|---|
| `archive/v0-morph` | First version: space-theme morphing portfolio |
| `archive/v1-split` | Recruiter-first split layout with a sticky identity rail |
| `archive/v2-aurora` | Dark aurora, colour-coded skills, interactive org-graph hero |
| `archive/v3-record-space` | Salesforce record page, four themes, true-black Space default, Apex console |
| `archive/v4-concepts` | Same as v3 plus the `/terrain/` and `/globe/` concept pages |
| `archive/v5-execution-log` | Scroll-craft design: scroll replays an Apex execution log, trace rail, command-line close. Tried live, then set aside; redeploy it any time |

`main` is whatever is live (currently the v4 record-page design, restored after trying v5). The archive branches never change.

## Switch the live site to an old version (about 90 seconds)

1. GitHub, Actions, **Deploy**, **Run workflow**.
2. In the `ref` box type the branch, for example `archive/v3-record-space`. Leave it empty to redeploy `main`.
3. Run it. The site is rebuilt from that branch and published.

This replaces what is live, but not `main`. The next push to `main` publishes `main` again.

## Make an old version the permanent one

Reset `main` to the archive branch (this rewrites `main`, so do it deliberately), or open a pull request that restores that branch's files onto `main`:

```bash
git checkout -b restore-v3 origin/main
git checkout origin/archive/v3-record-space -- .
git commit -am "Restore v3 record page" && git push -u origin restore-v3
```

## Look at an old version locally first

```bash
scripts/preview-version.sh archive/v3-record-space
```

It builds the branch in `.versions/` (ignored by git) and serves it, leaving your working tree alone.

## Notes

- The concept pages `/terrain/` and `/globe/` live in `public/`, so they are only present in versions that include them (v4 and later).
- Design notes and mockups for rejected concepts are in `design/`.
