# Portfolio update — developer → design engineer

Control doc for the repositioning work happening on the `2026` branch. Read
this first in a new session before doing anything else — it's more current
than my own memory of the work.

**Last updated:** 2026-08-24 (later session — TOMS video, card reorder, Rider
Web app link, Nav scroll-target bug fix)

## Note on manual edits

Some files (`Nav.jsx`, `AboutMe.jsx`, others) have been hand-edited directly
outside this session since the last entries below were written — different
border-radius values, a changed tooltip label, a different resume link, etc.
Those are deliberate and current; don't treat older detail in this doc below
as authoritative over what's actually in the files. Trust `git diff` /
the files themselves over this doc's older prose when they disagree.

## Bug fixed: floating nav "Work" link stopped scrolling

`Nav.jsx`'s `NavButton` used a single `heading` prop for three different
jobs: the tooltip text, the react-scroll `to` target, and the active-state
comparison. That's fine as long as the label happens to equal the target
section's `id` — which is how `home`/`about`/`contact` still work. When the
Work link's tooltip was changed to `'work / personal projects'`, it broke:
react-scroll went looking for an element matching that literal string
instead of the actual target, `id='projects'` (set in `Projects.jsx`), and
silently failed to scroll (logs `"target Element not found"` in the
console).

**Fix**: `NavButton` now takes an optional `target` prop, used as the
react-scroll `to` when present (`to={target ?? heading}`), independent of
the display label. `Nav.jsx`'s Work button now passes `target='projects'`.

**Watch out for this again** if any nav label ever gets edited to something
that isn't the literal section `id` — it'll fail exactly the same way,
silently, with no visual error, only a console warning.

## The goal

Reposition the site from generic "developer" to **Design Engineer**: lead
with Rider Web (sole designer + front-end owner, 70k riders), the AI-directed
build workflow used on TOMS, and the design-to-shipped-React story — rather
than a list of personal coding projects.

## Where things stand

- Branch: `2026`, was 6 commits ahead of `main` as of the last commit
  (`e09017e`) — **more since, not yet committed** (see below)
- `main` is what Firebase Hosting deploys — **none of this is live yet**
- Uncommitted as of this update: `Projects.jsx` (Rider Web app link, card
  reorder, TOMS video wiring) and new files in `public/videos/` (`toms.mp4`,
  `toms-poster.jpg`). Run `git status` / `git diff` to confirm before
  committing.

## Done (committed on `2026`)

- **Repositioning copy** — hero, About Me, and Work section rewritten around
  Rider Web / Platform Design System / TOMS / CET Go, with the AI-direction
  workflow stated plainly instead of implied (`3a42958`, `c5b9cdb`)
- **CRA → Vite**, Tailwind 4 CSS-first config, daisyUI dropped (the 3 rules it
  was used for are hand-reproduced in `src/index.css`)
- **Personal projects restored** below the client work — StoryTime,
  PathFinder, Sudoku Solver, Tetris (`69209a1`)
- **Rider Web screen recording landed** as the media for the Rider Web card
  (`e09017e`):
  - Source was a 4.6 MB, 2858×1914 screen capture dropped at repo root
  - Encoded to `public/videos/rider-web.mp4` — 1440px wide, H.264, faststart,
    audio stripped (source had none), **re-timed to 2x speed** (1:47 → 0:53)
    after a detour through 4x (too fast, reverted)
  - Always re-encoded from the *original* untracked mp4 when changing speed,
    not from the already-compressed copy, to avoid stacking compression loss
  - Poster frame at `public/videos/rider-web-poster.jpg` (the branded SunRail
    welcome screen — most legible frame at card size)
  - `Card.jsx` gained a `videoURL`/`posterURL` branch: native `controls` stay
    on (touch devices have no hover state, so they need a way to press play),
    plus a hover-to-play/pause effect mirroring how the GIF cards animate on
    hover — `mouseenter` plays, `mouseleave` pauses and resets to 0, `loop` is
    on in case someone parks the cursor there
  - Wired into the Rider Web card only, via `Projects.jsx`
  - Later: added an `appLink` to the Rider Web card pointing at the live site
    (`https://sunrail-account.transitsherpa.com/`) — renders through the
    existing `Card.jsx` "App Link" button, no new code needed
- **Work cards reordered** — CET Go moved up to sit beside Rider Web in the
  first row (cards are `sm:w-2/5` wrapped two-per-row, so slot order = pair
  order). Current order: Rider Web, CET Go, Platform Design System, TOMS.
- **TOMS screen recording landed** as the media for the TOMS card, same
  treatment as Rider Web:
  - Two raw files were dropped at once: `TOMS.mp4` (2.5 MB, 3024×1428) and
    `TOMS.webm` (5.4 MB, Matroska container, 3024×1364). **`TOMS.mp4` turned
    out to be corrupted/truncated** — ffmpeg decoded only ~1.3s before
    hitting NAL errors and "partial file". `TOMS.webm` was the intact
    source (decodes cleanly through the full ~43s) — used that instead.
  - Note: `TOMS.webm` isn't a standards-compliant WebM — it's H.264 video
    inside a Matroska container (ffprobe confirms `codec_name=h264`), not
    VP8/VP9/AV1. ffmpeg's demuxer is permissive enough to read it, but don't
    assume a browser's native `<video src=".webm">` would play it directly —
    it was only ever used as a re-encode source, never linked from the site.
  - Encoded to `public/videos/toms.mp4` — same recipe as Rider Web (1440px
    wide, H.264 crf 26, faststart, no audio, 30fps). 43s, 849 KB.
  - **Gotcha hit while doing this**: macOS/APFS is case-insensitive by
    default. Writing output to `public/videos/toms.mp4` (lowercase) silently
    overwrote `TOMS.mp4` at the same path — they're the same file on disk
    here. Not a problem in this case (the original was corrupted junk
    anyway), but worth knowing if this ever moves to a case-sensitive
    filesystem (Linux CI) — `toms.mp4` and `TOMS.mp4` would NOT collide
    there, so don't rely on that overwrite behavior happening again.
  - Poster at `public/videos/toms-poster.jpg`, frame at t=2s (TOMS's landing
    menu screen — Riders / Report History / View Orders — the clearest,
    most brand-legible frame).
  - The raw `TOMS.webm` source was moved **out of `public/` to repo root**
    (alongside `Rider Web.mp4`) — it had been sitting in `public/videos/`
    and was getting bundled into `dist/` unused, shipping 5.4 MB of dead
    weight to production. `public/` should only ever hold what's actually
    referenced by the site.
  - Wired into the TOMS card via `Projects.jsx`, same `videoURL`/`posterURL`
    props, no `Card.jsx` changes needed — that component was already
    video-aware from the Rider Web work.
  - **Later still: TOMS recording replaced.** New raw `toms.mp4` (3.2 MB,
    2966×1964, 45.5s) and `toms.webm` (6.4 MB) were dropped directly into
    `public/videos/`, superseding the first recording — different content
    (covers the courtesy-tickets flow), different aspect ratio (source is
    taller — 2966:1964 ≈ 1.51:1, vs. the first recording's 2.22:1). Both
    decoded cleanly this time (no repeat of the earlier corruption). Used
    `toms.mp4` as the encode source since it had valid duration metadata;
    re-timed to **2x speed** to match how Rider Web was handled (45.5s →
    22.8s), same recipe (1440px wide, H.264 crf 26, faststart, no audio).
    Poster regenerated from the new content at t=1s. The raw `toms.webm`
    that came with it was moved out of `public/` again — same reasoning as
    before — but since a `TOMS.webm` from the *first* recording already sat
    at repo root and the filesystem is case-insensitive, this one went to
    `TOMS-v2.webm` to avoid silently overwriting the earlier raw source.
    **Repo root now has 3 raw video sources**: `Rider Web.mp4`, `TOMS.webm`
    (recording 1, likely stale now), `TOMS-v2.webm` (recording 2, current).
    Worth confirming with Donny whether `TOMS.webm` (v1) can be deleted.

## YouTube dead code in AboutMe.jsx — left in place, on purpose

I cleaned up the dead YouTube-embed code in `AboutMe.jsx` earlier this
session (the old `4VcGzWd17SE` intro video, switched off by the "hid video"
commit before this session started) — removed the `react-youtube` import,
the `ResizeObserver` pair, the `homeDiv` ref, the fade-out state, and the
`--animate-fade` keyframe in `index.css`, and dropped the `react-youtube`
dependency from `package.json`.

That cleanup didn't survive (reverted somewhere before the video commit
landed), and when I flagged it, **the call was to leave it as-is** — there's
a maybe-plan to swap in a new video for that hero slot, which would reuse
this exact machinery (`YouTube` component, resize-to-fit, fade-out-on-end)
rather than need it rebuilt. So: `AboutMe.jsx` still imports `react-youtube`
and still carries the `hideVideo`/`homeDiv`/`ResizeObserver` block, currently
inert since `hideVideo` defaults to `true`. **Do not clean this up** unless
told the new-video plan is off the table.

```
grep -c "YouTube\|hideVideo\|homeDiv" src/components/main/AboutMe.jsx   # → 15
grep youtube package.json                                              # → "react-youtube": "^10.1.0"
```

## Loose ends / open questions

- **Three raw video sources sit untracked at repo root**: `Rider Web.mp4`
  (4.6 MB), `TOMS.webm` (5.4 MB, first TOMS recording — likely stale, the
  card now uses the second recording), and `TOMS-v2.webm` (6.4 MB, current).
  Never resolved — either gitignore them or move them out of the repo
  entirely. Ask before deleting `TOMS.webm` (v1) even though it looks
  superseded, and don't touch `Rider Web.mp4` / `TOMS-v2.webm` — those are
  the masters if either video ever needs re-encoding differently.
- **Node version mismatch** — `.nvmrc` pins `22.23.2`, shell was on
  `20.18.1`. Vite 8 warns about it but still builds. Not repo-breaking, just
  do `nvm use` before starting work.
- **Two of four client cards still have no imagery** — Platform Design
  System and CET Go fall back to the grey icon placeholder in `Card.jsx`.
  Rider Web and TOMS now have real video. Given the positioning is "design
  engineer," worth closing the gap on the remaining two — screenshots or
  short clips.
- **Personal-project GIFs are heavy** — StoryTime/PathFinder/Sudoku/Tetris
  GIFs total ~9.2 MB, loaded eagerly, uncompressed relative to how the video
  was handled.
- **Skill icons are hotlinked from Wikimedia** — flagged in a code comment in
  `Icon.jsx` as worth self-hosting; site currently depends on a third party
  for every skill logo.
- **Resume** — hero button links to a Google Drive URL; there's also a
  tracked `Donny - Resume.pdf` in the repo root dated Feb 2024 that doesn't
  appear to be linked from anywhere currently. Worth checking which is
  current and whether the untracked one is even the right one anymore.
- **Nav overlap flagged but not re-verified** — at ~800px width the floating
  nav appeared to sit on top of card text. Noted early in this session,
  never confirmed after later changes or fixed.
- **Not yet decided**: whether this is "content is done, ship it" or whether
  a deeper visual redesign is still on the table — that question was raised
  and deferred in favor of landing the video first.

## How to pick this up in a new session

1. `git log --oneline -10` and `git status`/`git diff --stat` to confirm
   nothing's drifted from what's described above, and check whether the
   uncommitted `Projects.jsx`/video changes noted at the top ever got
   committed
2. If a new hero video has landed since, the YouTube machinery in
   `AboutMe.jsx` can finally come out (see that section) — otherwise leave
   it alone
3. Decide the next priority from "Loose ends" — imagery for the remaining
   two cards (Platform Design System, CET Go) is probably the
   highest-leverage next step given the positioning
4. This file should be updated (or deleted, if everything's shipped) as
   things get resolved — it's a working doc, not permanent documentation
