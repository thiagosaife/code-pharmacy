# CODE PHARMACY — Thiago Saife portfolio

Personal portfolio site. Cyberpunk / terminal aesthetic ("neural boot" overlay,
scramble text effects, katakana glyphs, redacted-dossier framing).

- **Live:** https://thiagosaife.github.io/code-pharmacy/
- **Repo:** github.com/thiagosaife/code-pharmacy

## Stack

Vite 8 + TypeScript 7, no framework. Zero runtime dependencies.

```
npm run dev      # vite dev server
npm run build    # tsc && vite build  -> dist/
npm run preview  # serve the build
```

## Architecture

Layered, DOM-free domain. Keep it that way.

```
src/
  main.ts                 composition root — wires everything, runs boot sequence
  domain/                 pure data + types, NO DOM access
    content.ts            katakana, headline words, boot lines, drift shapes + code fragments
    mode.ts
    flags.ts              feature-flag names + defaults
  application/
    modeStore.ts          palette / mode state
    flagStore.ts          feature-flag state, URL + localStorage overrides
  presentation/           all DOM code lives here, one module per feature
    boot.ts  headline.ts  scramble.ts  drift.ts  lens.ts  uplink.ts  egg.ts
  style.css
```

- Page markup is **hand-written in `index.html`** at the repo root — including the
  work log rows. It is not generated from `content.ts`.
- `public/` is copied verbatim into `dist/` at build time (Vite does not process it).
- Contact form posts to Formspree (endpoint in `presentation/uplink.ts`).
- `html { scroll-behavior: smooth }` — anything that focuses an element after an
  anchor jump must delay (~600ms) and use `focus({ preventScroll: true })`, or it
  kills the smooth scroll. See the `#contact` handler in `uplink.ts`.

## Feature flags

Defaults live in `domain/flags.ts`; `application/flagStore.ts` resolves them.
Resolution order: **`?name=on` query param > persisted localStorage value >
default**. The query param is a session-only preview and is *not* written to
storage; only `flags.set()` / `flags.toggle()` persist (key `code-pharmacy.flags`).

`main.ts` exposes the store on `window.flags` for console use. Features subscribe
(`flagStore.subscribe(name, fn)`) so a toggle re-renders live, no reload:

```js
flags.toggle("drift")        // console, live
flags.set("drift", true)     // console, persists across reloads
// ?drift=on                 // URL, this session only
```

| flag    | default | what it does                                                    |
| ------- | ------- | --------------------------------------------------------------- |
| `drift` | `off`   | drifting background layer — wireframe forms + TS code fragments |

To add one: add the key + default to `Flags` / `DEFAULT_FLAGS`, then have the
feature read `flagStore.get(name)` and subscribe. See `presentation/drift.ts`.

## Deployment — READ THIS FIRST

`.github/workflows/` builds and uploads `dist/` via `actions/deploy-pages`.

**Known issue (as of Jul 2026, still unfixed):** GitHub Pages *Source* is set to
"Deploy from a branch", so Pages publishes the **repo root** and ignores the
workflow artifact. Symptom: the live site is unstyled and the browser requests
`/src/main.ts` (503) — that's the dev-only script tag from the source `index.html`.
Assets 404 because `public/assets/*` only exists in `dist/`.

Fix = Settings → Pages → Source → **GitHub Actions**. Not a code change.
Nothing in `public/` (favicon included) will appear live until this is done.

Also pending: `.gitignore` has `# dist` commented out, so build output is
committed. Uncomment once Pages builds via Actions.

## Icons

Source artwork: `public/assets/pug-logo.png` (1254², flat vector pug in a
pink→yellow ring). Generated icons (circular alpha, transparent outside the ring,
black preserved inside it):

- `public/favicon.ico` — 16/32/48/64
- `public/assets/favicon-32.png`
- `public/assets/favicon-512.png`
- `public/assets/apple-touch-icon.png` — 180px

Regenerated with Pillow: detect the ring's bbox via difference-from-black, square
crop at ~0.98× the radius (artwork flush to the edge), circular mask supersampled
4× then downscaled for a clean edge. If asked to enlarge further, zoom the pug
*inside* the ring rather than scaling the whole composition — the ring stroke is
already flush and will get shaved.

`pug-portrait.png` / `pug-portrait-neon.png` are the hero portraits, unrelated to
the favicon.

## Content conventions

- Work log rows live in `index.html` under `.worklog`.
- Client confidentiality: some engagements are described by scale rather than
  named — e.g. `US MULTI-BRAND RETAIL / Senior Front-End Engineer|Architect —
  i18n across a multi-brand portfolio` (this is Williams-Sonoma; do not name it
  on the site). The `IBM / Santander project` row is the one named-client
  exception.
- Tone: terse, uppercase, terminal-flavoured. `//` and `::` as separators.

## Preferences

- Thiago wants concise, direct answers. No filler, no over-explaining.
- Diagnose before changing code — he'll ask "why is X broken", and the answer is
  often config/settings, not source.
