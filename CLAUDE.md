# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page ceramics portfolio site for Edalí (ceramic artist, CDMX). Static HTML/CSS/JS,
no build step, no framework, no package.json. Deployed as a GitHub user site.

The owner is non-technical — she cannot read or write code herself and directs all changes
through conversation. Explain what changed in plain terms, not in code/diff terms.

## Commands

**Preview locally** — there's no dev server config that works via the `preview_start` tool in
this environment (its subprocess spawning is sandboxed here); start it manually instead:
```
cd /Users/edali.gutierrez/PORTAFOLIO && python3 -m http.server 8743
```
Then open `http://localhost:8743/index.html` in the Browser pane via `preview_start` with a
`url`, not a `name`. Opening `index.html` directly as a `file://` URL breaks the 3D viewer
(CORS blocks the `.glb` fetch) — always use the http server.

**Publish** — this repo IS the live site (see Deployment below). To publish a change:
```
git add -A && git commit -m "..." && git push
```
GitHub Pages rebuilds automatically in under a minute. Verify with:
```
curl -s https://edaliii.github.io/index.html | grep '<some marker of the change>'
```

**Cache-busting** — `index.html` loads `css/style.css?v=N` and `js/main.js?v=N`. Bump `N` on
every CSS/JS edit (browsers cache these aggressively otherwise). Image assets referenced by
literal filename (e.g. `assets/about/foto-yo.png`) need their own `?v=N` bump if replaced,
since the JS never adds cache-busting to piece photos automatically.

## Architecture

### Content vs. layout are separate

`js/main.js`'s `PIECES` array holds each piece's content (bilingual title/description/status,
dimensions, technique, `.glb` model filename). `SLOTS_DESKTOP` / `SLOTS_MOBILE` hold pure
layout (position %, rotation, box-fit size) — one slot per piece, but which piece lands in
which slot is re-shuffled (`shuffled()`) on every page load. Adding a piece means adding both
a `PIECES` entry *and* a slot in each `SLOTS_*` array, plus dropping photos in
`assets/pieces/<slug>/`.

Slots normally position by `left` (center-anchored via `xPercent:-50`). A slot can instead use
`right` (anchored by its outer edge, `xPercent:0`) — used for the slots closest to the right
edge so a narrow piece and a wide piece both hug the boundary consistently instead of a
center-anchor letting piece width determine how close it gets.

`box` is a bounding-box percentage (of stage width) each piece is scaled to fit inside,
regardless of its own photo's aspect ratio — this is what keeps tall/narrow and wide pieces
reading as the same visual size in their slot.

### Animation layers stack on top of each other, in this order

1. **Intro scatter** (`runClusterAnimation`) — pieces fly in from off-screen once on load.
2. **Ambient drift** (`driftTile`) — a recursive `gsap.to(...).then(loop again)` per tile,
   forever nudging it a few px in a random direction. Amplitude (`DRIFT_RANGE_X/Y`) is a
   percentage of stage width, not a flat px value — a flat value reads as lively on mobile's
   small stage but static on desktop's large one.
3. **Playground drag** (pointerdown/move/up on each tile) — only active when
   `playgroundActive`. Grabbing a tile kills its drift tween; releasing it restarts drift
   anchored at the drop point, at reduced amplitude (`PLAY_AMP`).
4. **Scroll-fall** (ScrollTrigger on `#hero`) — scrolling past the hero drops each tile
   toward the hero's bottom edge (computed per-tile from its live position, not a fixed
   distance, with a floor so a tile already near the bottom still visibly falls). Once fully
   fallen it *locks* — further scrolling within the hero's range doesn't re-scrub it — and
   only rises again after you're back at the very top and a short pause elapses, so it reads
   as "resting" rather than instantly snapping back. Works identically in playground mode.

Anything that sets a tile's `x`/`y`/`rotation` must kill whatever tween currently owns that
tile first (`tile._driftTween`), or two systems will fight over the same properties every
frame.

### `<model-viewer>` must never be toggled via `hidden`/`display:none`

The modal keeps `.modal__image` and `.modal__model` both permanently in the DOM, stacked via
`position:absolute`, and toggles which is visible with `opacity`/`pointer-events` classes
only. Actually removing `<model-viewer>` from layout (even briefly) breaks its WebGL
canvas/camera-controls on re-insertion. This was a real bug once; don't reintroduce it.

### i18n

`data-i18n="key"` on an element makes `applyLang()` overwrite its `innerHTML` from `I18N[key][lang]`
on toggle. `data-i18n-alt="key"` does the same for an `<img>`'s `alt`. Elements that mix a
translatable text node with a non-translatable child (icons, `<br>` structure) put the
translatable part in its own child element/`<span>` — `innerHTML` replacement would otherwise
destroy sibling markup. Piece titles/descriptions/technique/status don't go through this
system; they're looked up directly off the current `LANG` via `pieceTitle()`/`pieceDesc()`/etc.
Default language is Spanish; toggling is a UI switch (`#langSwitch`), not a route/URL change.

### Content voice

Spanish body copy (semblanza, piece descriptions, hints) is intentionally lowercase-first,
conversational, first-person. Piece titles mix English and Spanish organically (e.g. "The
Summer I Turned FIFAs") — that's the artist's own naming style, not an inconsistency to fix.
Don't "correct" this pattern. The Romans 9:20 Bible verse (manifesto section) uses RVR1960 in
Spanish and KJV in English — those are the two translations that share its register.

## Deployment

- **Live site**: `https://edaliii.github.io/` — this repo, pushed to `main`, served by GitHub
  Pages from the root. The repo is literally named `edaliii.github.io` (the special name that
  makes a repo a user site instead of a project subpath).
- **Analytics**: GoatCounter, site code `edaliii` → dashboard at `https://edaliii.goatcounter.com`.
  The tracking script deliberately no-ops on `localhost`, so it never fires during local
  testing — that's expected, not a bug.
- **Excluded from git** (`.gitignore`): `Videos/`, `OBJ/`, `Fotos/`, `Referencias/`,
  `Portafolio.pdf`, `.claude/` — raw source material (300+ MB) that isn't part of the
  published site and was never meant to be public.
- The og:image/twitter:image meta tags point to `assets/og-image.jpg`, a composited image
  (real piece photos + the hero title text, built with `sharp`) — not a live screenshot,
  since which pieces land where is randomized per page load anyway. Regenerate it the same
  way if the piece set changes meaningfully.

## Testing gotcha

In this environment's Browser pane, a tab that isn't genuinely frontmost/composited freezes
GSAP's rAF ticker — intro animations and drift never progress, and synthesized pointer events
may not land. Verify animation-dependent changes by reading computed style/GSAP tween state
directly via `javascript_tool` rather than trusting a screenshot. Do not use
`gsap.globalTimeline.getChildren(...).forEach(t => t.progress(1))` to force-settle tweens on
this page specifically — once ScrollTrigger is registered, that also fast-forwards its scroll
proxy and silently jumps the page's actual scroll position.
