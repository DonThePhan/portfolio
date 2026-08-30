# Portfolio update — developer → design engineer

Control doc for the repositioning work happening on the `2026` branch. Read
this first in a new session before doing anything else — it's more current
than my own memory of the work.

**Last updated:** 2026-08-30 (Rider Web case study corrected against
`strategic-mapping-facts.md`)

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

## CET Go recording landed, and Card.jsx now supports portrait video

`CET.MP4` was dropped at repo root — a phone screen recording, 1170×2532
(portrait, ≈0.46:1), HEVC, 74.7s, with an AAC audio track. Unlike Rider Web
and TOMS, this is the **first portrait-orientation** recording, which the
existing `Card.jsx` had no layout for (it assumed landscape media stacked
above the text, full card width).

- **Encode**: 2x speed (74.7s → 37.3s), scaled to height 1280 (width auto,
  ≈592px), H.264 crf 26, faststart, audio stripped, 30fps — same recipe
  family as Rider Web/TOMS, just scaled by height instead of width since the
  source is tall rather than wide. 44.8 MB source → 1.5 MB output. `ffmpeg`
  wasn't installed in this shell; installed via `brew install ffmpeg` first.
- Poster at `public/videos/cet-poster.jpg`, frame at t=1s (the branded CET
  splash screen — logo + illustration, most legible frame).
- Raw source moved out of `public/` to repo root, renamed `CET Go.mp4` (the
  incoming file was `CET.MP4`; macOS/APFS case-insensitivity plus the
  `.mp4`/`.MP4` clash with the encoded output made a rename the safer move
  rather than relying on gitignore).
- **`Card.jsx` gained a `portrait` boolean prop.** When set, the card switches
  from `flex-col` (media stacked on top, full width) to `sm:flex-row` (media
  and text side by side, video pinned to a fixed `w-2/5` of the *card*, not
  the page, `shrink-0`, no explicit height — the video keeps its own aspect
  ratio rather than being stretched/cropped to fill the row). Stays `flex-col`
  below `sm:` — a portrait video doesn't have the "too tall stacked" problem
  on a single-column mobile layout the way a wide landscape video pinned to
  card width would sideways. Video sits first in DOM order, so it renders
  left of the text on desktop and above it on mobile — no left/right toggle
  prop added since only one card needs this so far.
- Wired into the CET Go card via `Projects.jsx`: `videoURL='/videos/cet.mp4'`,
  `posterURL='/videos/cet-poster.jpg'`, `portrait`. CET Go now shares a row
  with Rider Web (`self-stretch` on the card, existing behavior) — Rider
  Web's long paragraph sets the row height, so the CET Go card has more
  vertical whitespace than its video needs. Not fixed; matches how the grid
  already behaves for short-vs-long card pairs elsewhere.
- Verified layout via computed `getBoundingClientRect()`/`flexDirection`
  checks at 1280px and 375px widths, and a real screenshot at 768px
  (tablet) confirmed the side-by-side rendering visually — desktop-width
  (1280×800) screenshots were unreliable this session (the Browser pane
  returned blank/gray captures for any scrolled position at that viewport
  size, reproducible even in a fresh tab; not a code issue, a tool quirk in
  this session). If screenshotting the desktop layout again, try tablet
  width first if desktop comes back blank.
- Dev server note: `npm run dev` / `vite` needs Node 22 (`.nvmrc`) — running
  it under the shell's default Node 18 throws
  (`node:util` doesn't export `styleText`). `nvm use 22.23.2` (already
  installed) before starting.

## Portrait card: video pops forward on hover, fills card height

Follow-up ask on the CET Go layout above: top-align video and text (was
`items-center`, now `items-start`), and on hover, have the video grow to
fill the card's full height and sit **in front of** the text (partially
covering it, on purpose) rather than just playing in place.

Implementation in `Card.jsx`, portrait branch only:
- The video keeps its normal small resting size as a flex item (so text
  still flows beside it exactly as before) — the pop is a `transform: scale()`
  applied via a ref, **not** a layout/width change, so it doesn't reflow the
  text and is trivially GPU-composited/smooth.
- On hover, a `useEffect` measures the card's available content height *and*
  width (`clientHeight`/`clientWidth` minus padding, read via
  `getComputedStyle`, not hardcoded), divides each by the video's *resting*
  `offsetHeight`/`offsetWidth` (transforms don't affect `offsetWidth`/
  `offsetHeight`, so this stays stable across repeated hovers) to get two
  candidate scale factors, and uses `Math.min()` of the two — so the video
  grows until it hits whichever of height/width runs out first (like
  `object-fit: contain` against the card's content box), never overflowing
  either edge. First pass only bounded by height and let width overflow past
  the card (relying on `overflow-hidden` to clip it) — changed after
  feedback that it should stop at whichever dimension is tighter instead of
  spilling and getting clipped. `origin-top-left` keeps the video's top-left
  pinned so it grows down/right rather than from center.
- `transition-transform duration-500 ease-out` on the video makes it a
  smooth grow/shrink, not a jump.
- `z-20` (only while hovered) lifts the video above the text — flex items
  respect `z-index` even at `position: static`, so no `position: relative`
  needed. Text underneath has no explicit z-index (`auto`), so the video's
  `20` always wins regardless of DOM order.
- The card itself gained `overflow-hidden` (portrait only) so the scaled
  video — which usually ends up wider than the card, since scaling is
  uniform and only height is being targeted — gets clipped cleanly at the
  card's rounded border instead of spilling past it.
- Verified with real hover (not just DOM inspection) via the browser tool's
  `hover` action at tablet width: screenshot showed the video expanding to
  fill the card, overlapping "CET Go" / tech / description text, then
  measured `getComputedStyle(video).transform` to confirm the exact scale
  matrix and `z-index: 20` while hovered, and confirmed it resets to
  `transform: none` on mouse-out (one verification screenshot after
  mouse-out looked stale/still-expanded even though the computed style had
  already reset — same Browser-pane stale-frame quirk noted elsewhere in
  this doc, trust computed styles over a screenshot taken immediately after
  a state change in this environment).

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

## Catch-up: 6 commits that landed between sessions, undocumented

Between the pop-forward-hover entry above and this one, six commits landed
that this doc never covered (`38cf625` through `79966b3`, all Aug 24–25):
bezier easing added to the remaining About Me/Contact/Icon items, an
expandable word-fade-in effect for About Me, a CET Go app-link button, a
round of UI tweaks + text rephrasing (touched Contact/Icon/Card/Projects),
skill icons self-hosted under `public/images/skills/` instead of hotlinked
from Wikimedia, and the navbar made semi-transparent again after the
Tailwind changes. Also worth noting: `Card.jsx`'s hover-pop-forward
transform/z-index machinery documented above for portrait cards **is gone**
— the "UI tweaks" commit (`aefdcc1`) rewrote `Card.jsx` and that effect
didn't survive. Confirmed with Donny that this batch is all intentional,
nothing here needs revisiting.

Also confirmed resolved: nav overlap at ~800px is intentional, not a bug.
CET Go's app-link button position is fine as-is. Resume link is current and
points at the right file.

## Rider Web case study page added

Ask: put a real case-study writeup behind the Rider Web card, sourced from
`rider-web-case-study-short.md` (Donny's own draft, dropped at repo root
untracked). Link it from the card like a button — "View Case Study" with an
arrow, reading as "leads to another page" rather than the external-link
buttons.

- **New route**: `/case-study/rider-web` → `src/components/CaseStudy/RiderWeb.jsx`,
  registered in `App.jsx`. First internal (in-app) navigation on the site —
  `react-router-dom` was already a dependency but only `BrowserRouter` +
  the `/` and `*` routes existed before this.
- **`Card.jsx`** gained a `caseStudyLink` prop: renders a `react-router`
  `Link` styled to match `Button` (border/uppercase/hover-invert) rather
  than reusing `Button` itself, since `Button` always renders a `<button>`
  with `onClick`-driven `window.open` — this needs real in-app navigation,
  not a new tab. Arrow icon (`fa-arrow-right`) signals it leaves the card
  for another page. Wired into the Rider Web card only, via `Projects.jsx`.
- **`RiderWeb.jsx` content**: hand-written JSX (not a markdown renderer),
  matching how every other section on the site is authored — this is a
  one-off page, so a generic content-schema/markdown pipeline would be
  more machinery than the task needs. Reuses the site's existing look:
  `h1Size`/`sectionPaddingX/Y` from `TailwindContext`, the shared
  `.divider` class, Font Awesome icons, no new color tokens except finally
  putting the long-unused `--color-bg-base-4` teal to work (string literals
  in the code block).
- **Code block** (the multi-agency config object) is hand-tokenized with a
  small local regex highlighter in `RiderWeb.jsx` — real syntax-highlighted
  text, not a screenshot, per the source doc's own instruction — rather
  than pulling in a syntax-highlighting dependency for one static block.
- **Image placeholders**: every `> [IMAGE — ...]` note in the source doc
  became a dashed-border placeholder box with the original note as its
  caption, so Donny knows exactly what to drop in later. The auto-load
  section (explicitly called out as "a sequence, not a single screenshot")
  became six placeholder frames in a horizontal scroller, one per the six
  states enumerated just above it in the text. The "What stayed" section's
  "2–3 new screens" note became three placeholder cards, each with its own
  editable one-line-caption placeholder underneath.
- **Excluded on purpose**: the source doc's own "Notes to self — delete
  before publishing" section (redact reminders, the CTO-clearance note, the
  word-count note) — never rendered on the page, per its own instruction.
  The `.md` file itself was left untouched at repo root; nothing asked for
  it to be moved or deleted.
- `useEffect` scrolls to top and sets `document.title` on mount (and
  restores the previous title on unmount) — needed because React Router
  doesn't scroll on route change, and the Rider Web card this links from
  can sit far down the home page's scroll position.
- **Dev server fix, while verifying this in the browser preview**: the
  Node-18-vs-22 issue noted below under "Node version mismatch" was hitting
  the preview tooling directly (`vite` needs the `node:util` `styleText`
  export Node 18 doesn't have). Fixed `.claude/launch.json` to point
  `runtimeExecutable` at the Node 22.23.2 binary under nvm directly
  (`~/.nvm/versions/node/v22.23.2/bin/node`) running `node_modules/.bin/vite`
  rather than `npm run dev` — `npm`'s own shebang was still resolving Node
  from `PATH` (18) even when pointed at the v22 npm binary, so it had to
  bypass npm entirely. Also added `"autoPort": true` since port 3000 was
  already in use by something else on this machine — not something this
  project needs fixed to 3000. Verified via a real click-through in the
  browser preview.

**Not yet done — needs Donny before this goes live:** the source doc's own
notes-to-self flag two things that this session had no way to act on:
redacting a client ID GUID and an internal staging hostname (only relevant
once the actual annotated-config screenshot is dropped in), and **getting
CTO clearance before publishing** — specifically on naming SunRail, CET,
and NIC by name, quoting their requirements, and showing screenshots. The
page as built does name all three.

**2026-08-28: `main` deployed, case study held back.** When asked to deploy
`2026` to `donthephan.com`, this clearance was still outstanding, so rather
than blocking the whole deploy, the Rider Web card's `caseStudyLink` prop
was commented out in `Projects.jsx` — the "View Case Study" button no
longer renders, so there's no path to the page from the live site. The
route (`/case-study/rider-web`) and the page itself are still in the
deployed bundle and reachable by anyone who has or guesses the direct URL —
nothing was done to block that (no `noindex`, no route removal), since
nothing links to it and that wasn't asked for. Once clearance comes
through, re-enable the prop in `Projects.jsx` (the line is left in place,
just commented, with a note pointing back here) and redeploy.

## Case study corrected against strategic-mapping-facts.md

Donny dropped `strategic-mapping-facts.md` at repo root (untracked, single
source of truth for résumé/LinkedIn/GitHub/portfolio/case studies) and
asked to bring `RiderWeb.jsx` in line with it. The file's own §8 flagged
the case study as *the* outdated artifact — it had 2024–2025 dates, an
eighteen-month duration, a "four months of design, then the build"
framing, and no scale metrics.

Fixed in `src/components/CaseStudy/RiderWeb.jsx`:
- Header date `2024–2025` → `2023–2025`
- Removed "eighteen months" everywhere; project is **two years**,
  including testing
- **Sequencing fix** (the doc's top-priority item): the "Designing it
  first" section stated design as a phase completed before the build
  started, which the facts doc explicitly says is wrong — it was
  interleaved (build a piece, return to Figma, update, build again) with
  ~6 months of requirements/design cumulative across the project.
  Retitled to "Design and build, in parallel" and reworded. Also softened
  "With the design settled, I spent a week..." in "The turn" to "Early on,
  I spent a week..." since that section's framework read-through likely
  happened near the start, not after design wrapped.
- "Unsupported for three years" → "about two years" (AngularJS EOL Dec
  2021, project start 2023)
- Account-creation field list in "Designing for a configuration" was
  listing fields (first/last name, phone, two address lines) that don't
  match the `registrationFields` actually shown in the code block just
  above it (`name`, `mobile`, `address`, `city`, `state`, `zipCode`) —
  corrected the prose to match the code, since the two were contradicting
  each other on the same page. Not something the facts doc called out
  directly, just an internal inconsistency caught while reading closely.
- "Where it landed" rewritten: leads with the two-year/six-week contrast
  per the facts doc's explicit rule (page counts and duration numbers are
  scope markers, not achievements — don't bury the real closing metric
  under them), and now includes the scale metrics (70,000+ registered
  riders, ~5,000 daily, $5.5M in fares) that previously lived only in the
  README/LinkedIn — the facts doc's §8 open item 2 said adding them here
  is what makes all three artifacts agree. Fares figure is dated ("as of
  June 2026") per the doc's instruction that an undated number goes stale
  silently.
- Intro paragraph also reworded to lead with the two-year/six-week metric
  rather than page count, and to name the six months of client-facing
  work/demos (facts doc: this is "client requirements and demos," never
  "CTO brief").

**Not touched / left alone:** the placeholder images, the redact-before-
publish note on the config screenshot, the CTO-clearance gate on
`caseStudyLink` (still commented out in `Projects.jsx`) — none of that
was in scope for this pass, which was a copy/facts correction only, not
a design or publishing-readiness change.

**Environment note, unrelated to the content fix:** `.claude/launch.json`
pointed `runtimeExecutable` at `/Users/donny/.nvm/...` (missing the `phan`
in the home directory) and Node 22.23.2 wasn't installed under this
user's nvm at all (only up to 20.20.2) — both presumably fine on whatever
machine this was last verified on, but broken here. Installed 22.23.2 via
`nvm install 22.23.2` and fixed the path in `launch.json` to
`/Users/donnyphan/.nvm/versions/node/v22.23.2/bin/node` so the browser
preview tooling works again. Verified the corrected page renders with no
console errors via the fixed preview.

## Loose ends / open questions

- **Raw video sources previously sat untracked at repo root** (masters kept
  in case a recording needed re-encoding) — they're gone from the working
  tree as of this update (confirmed via `find` — no `.mp4`/`.webm`/`.mov` at
  repo root). Never tracked in git, so there's no history of the removal;
  presumably moved or deleted outside this session. Worth confirming with
  Donny that this was deliberate before assuming the masters are gone for
  good.
- **Node version mismatch** — `.nvmrc` pins `22.23.2`, default shell node is
  `18.20.5`. Vite 8 needs 22 to run at all (Node 18 throws on
  `node:util`'s missing `styleText` export) — not just a warning. `nvm use
  22.23.2` before running `npm run dev` by hand. The browser-preview dev
  server (`.claude/launch.json`) now points its `runtimeExecutable` straight
  at the Node 22.23.2 binary so this doesn't need `nvm use` when previewing
  through that tool specifically — see the case-study section above.
- **Platform Design System card is fully commented out** in `Projects.jsx`,
  not just missing imagery — corrected from an earlier, inaccurate note
  here that said it renders with a grey icon placeholder. It won't appear
  on the site at all until it's uncommented, which presumably wants real
  imagery first. Rider Web, CET Go, and TOMS all have real video now.
- **Personal-project GIFs are heavy** — StoryTime/PathFinder/Sudoku/Tetris
  GIFs total ~9.2 MB, loaded eagerly, uncompressed relative to how the video
  was handled.
- **Rider Web case study hero image landed** — `landing_page.png` (1920×934,
  the SunRail sign-in/create-account screen) was dropped at repo root and
  wired in as the hero, replacing that one placeholder. Processed to
  `public/images/case-study/rider-web/hero.webp` (resized to 1600px wide,
  converted PNG→WebP at q90: 254 KB → 69 KB, no visible quality loss on the
  UI text). The original `landing_page.png` was left untracked at repo
  root rather than deleted — same "keep the raw master, ask before
  deleting" pattern as the video sources above. Every other `[IMAGE]` slot
  is still a labeled placeholder; Donny is providing the rest.
- **CTO clearance not yet obtained** for publishing the case study naming
  SunRail, CET, and NIC — flagged in the source doc's own notes, not
  resolved this session. Don't ship `2026` to `main` with this page live
  until that's checked. See the case-study section above.
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
3. Decide the next priority from "Loose ends" — real images for the Rider
   Web case study page (Donny is providing these) and CTO clearance on
   naming SunRail/CET/NIC publicly are probably the highest-leverage next
   steps before this ships to `main`
4. This file should be updated (or deleted, if everything's shipped) as
   things get resolved — it's a working doc, not permanent documentation
