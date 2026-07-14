/** Presentation: drifting watermark layer — wireframe forms + TS algorithm fragments. */

import { CODE_FRAGMENTS, DRIFT_SHAPES } from "../domain/content";
import { DRIFT_COLORS, DRIFT_HUES, Mode } from "../domain/mode";
import { modeStore } from "../application/modeStore";

/** Deterministic pseudo-random so layout is stable across rebuilds. */
function rnd(i: number, k: number): number {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function colorFor(mode: Mode, i: number): string {
  const fixed = DRIFT_COLORS[mode];
  if (fixed) return fixed[i % 3];
  return `hsl(${DRIFT_HUES[i % 3]} 85% 72%)`;
}

/** Shapes and code alternate so neither clusters on one side of the page. */
const ITEMS: Array<{ kind: "shape" | "code"; body: string }> = Array.from(
  { length: DRIFT_SHAPES.length + CODE_FRAGMENTS.length },
  (_, i) =>
    i % 2 === 0
      ? { kind: "shape" as const, body: DRIFT_SHAPES[(i / 2) % DRIFT_SHAPES.length] }
      : { kind: "code" as const, body: CODE_FRAGMENTS[((i - 1) / 2) % CODE_FRAGMENTS.length] },
);

function build(layer: HTMLElement, mode: Mode): void {
  layer.innerHTML = "";
  ITEMS.forEach((item, i) => {
    const code = item.kind === "code";
    const el = document.createElement(code ? "pre" : "div");
    el.className = code ? "drift-code" : "drift-shape";

    if (code) {
      el.textContent = item.body;
      el.style.fontSize = `${(9 + rnd(i, 1) * 4).toFixed(1)}px`;
      // code blocks are wide — keep them clear of the right edge
      el.style.left = `${2 + rnd(i, 2) * 62}%`;
    } else {
      el.innerHTML = item.body;
      el.style.width = `${Math.round(52 + rnd(i, 1) * 120)}px`;
      el.style.left = `${2 + rnd(i, 2) * 90}%`;
    }

    el.style.top = `${2 + rnd(i, 3) * 88}%`;
    el.style.color = colorFor(mode, i);
    // code sits behind body text, so it fades in fainter than the forms
    const peak = code ? 0.05 + rnd(i, 4) * 0.05 : 0.09 + rnd(i, 4) * 0.11;
    el.style.setProperty("--maxop", peak.toFixed(2));
    el.style.setProperty("--dx", `${(rnd(i, 6) * 40 - 20).toFixed(0)}px`);
    el.style.setProperty("--dy", `${((i % 2 === 0 ? 1 : -1) * (240 + rnd(i, 7) * 320)).toFixed(0)}px`);
    el.style.animation =
      `driftmove ${(6 + rnd(i, 8) * 10).toFixed(1)}s ease-in-out ${(-rnd(i, 9) * 8).toFixed(1)}s infinite alternate, ` +
      `driftfade ${(7 + rnd(i, 10) * 12).toFixed(1)}s ease-in-out ${(-rnd(i, 11) * 14).toFixed(1)}s infinite`;
    layer.appendChild(el);
  });
}

export function initDrift(layer: HTMLElement): void {
  build(layer, modeStore.get());
  modeStore.subscribe((mode) => build(layer, mode));
}
