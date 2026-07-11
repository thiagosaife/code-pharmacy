/** Presentation: drifting kana/kanji watermark layer. */

import { KANJI_GLYPHS } from "../domain/content";
import { KANJI_COLORS, KANJI_HUES, Mode } from "../domain/mode";
import { modeStore } from "../application/modeStore";

/** Deterministic pseudo-random so layout is stable across rebuilds. */
function rnd(i: number, k: number): number {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function colorFor(mode: Mode, i: number): string {
  const fixed = KANJI_COLORS[mode];
  if (fixed) return fixed[i % 3];
  return `hsl(${KANJI_HUES[i % 3]} 85% 72%)`;
}

function build(layer: HTMLElement, mode: Mode): void {
  layer.innerHTML = "";
  KANJI_GLYPHS.forEach((ch, i) => {
    const size = 16 + Math.floor(rnd(i, 1) * 64);
    const s = document.createElement("span");
    s.textContent = ch;
    s.style.left = `${2 + rnd(i, 2) * 92}%`;
    s.style.top = `${2 + rnd(i, 3) * 88}%`;
    s.style.fontSize = `${size}px`;
    s.style.color = colorFor(mode, i);
    s.style.setProperty("--maxop", (0.09 + rnd(i, 4) * 0.13).toFixed(2));
    s.style.writingMode = rnd(i, 5) > 0.55 ? "vertical-rl" : "horizontal-tb";
    s.style.setProperty("--dx", `${(rnd(i, 6) * 40 - 20).toFixed(0)}px`);
    s.style.setProperty("--dy", `${((i % 2 === 0 ? 1 : -1) * (240 + rnd(i, 7) * 320)).toFixed(0)}px`);
    s.style.animation =
      `kanjidrift ${(6 + rnd(i, 8) * 10).toFixed(1)}s ease-in-out ${(-rnd(i, 9) * 8).toFixed(1)}s infinite alternate, ` +
      `kanjifade ${(7 + rnd(i, 10) * 12).toFixed(1)}s ease-in-out ${(-rnd(i, 11) * 14).toFixed(1)}s infinite`;
    layer.appendChild(s);
  });
}

export function initKanji(layer: HTMLElement): void {
  build(layer, modeStore.get());
  modeStore.subscribe((mode) => build(layer, mode));
}
