# THIAGO SAIFE // CODE — cyberpunk portfolio

Vanilla **TypeScript + Vite** static site. No framework, no runtime deps — ships as plain HTML/CSS/JS.

## Architecture (DDD-flavored)

```
src/
  domain/          # pure data & types — no DOM
    mode.ts        #   Mode type, palettes, mode transitions
    content.ts     #   boot lines, kanji glyphs, headline words
  application/     # use-case layer
    modeStore.ts   #   mode state + subscribers, applies palette CSS vars
  presentation/    # DOM effects (each self-contained, init(...) entry)
    boot.ts        #   neural boot overlay + RGB-split reveal
    headline.ts    #   per-letter headline: decode / hover-jitter / flicker
    scramble.ts    #   katakana text scramble (mode switch burst + hover)
    kanji.ts       #   drifting kana/kanji watermark layer
    lens.ts        #   pug implant glow tracking + tab-return re-scan
    uplink.ts      #   contact terminal (front-end only)
    egg.ts         #   v0.1 easter egg: mode cycler + random hint flicker
  main.ts          # composition root
  style.css
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy

```bash
npm run build    # outputs dist/
```

`dist/` is fully static. Deploy anywhere:

- **Netlify**: drag `dist/` into the dashboard, or connect the repo (build: `npm run build`, publish dir: `dist`)
- **Vercel**: import repo, framework preset "Vite"
- **GitHub Pages**: push, then `npx gh-pages -d dist` (or a Pages action). `base: "./"` is already set.

## TODO before going live

- The **DIRECT_UPLINK form posts to Formspree** (`https://formspree.io/f/mlgqrnoy`) via fetch — loader while sending, terminal-style error on failure. No library needed.
- Update `public/assets/Thiago_Saife_Resume_ENG.pdf` whenever the resume changes.
- Easter egg: clicking **v0.1** in the hero cycles decode → hover → flicker modes.
