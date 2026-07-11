/** Presentation: per-letter headline with decode / hover-jitter / flicker effects. */

import { HEADLINE_LINES, KATAKANA } from "../domain/content";
import { Mode } from "../domain/mode";
import { modeStore } from "../application/modeStore";

let spans: HTMLElement[] = [];
let decoding = false;

function build(el: HTMLElement): void {
  el.innerHTML = "";
  spans = [];
  HEADLINE_LINES.forEach(({ word, accent }, li) => {
    const line = document.createElement("span");
    line.className = "hl-line" + (accent ? " accent" : "");
    word.split("").forEach((ch) => {
      const s = document.createElement("span");
      s.className = "hl-ch";
      s.dataset.ch = ch;
      s.textContent = ch;
      line.appendChild(s);
      spans.push(s);
    });
    if (li === HEADLINE_LINES.length - 1) {
      const c = document.createElement("span");
      c.className = "hl-cursor";
      c.textContent = "_";
      line.appendChild(c);
    }
    el.appendChild(line);
  });
}

export function startDecode(): void {
  if (decoding || !spans.length) return;
  decoding = true;
  const t0 = performance.now();
  const step = (now: number): void => {
    let active = false;
    spans.forEach((el, i) => {
      const resolveAt = t0 + 400 + i * 70;
      if (now < resolveAt) {
        active = true;
        if (Math.random() < 0.45) {
          el.textContent = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        }
        el.style.opacity = "0.8";
      } else {
        el.textContent = el.dataset.ch ?? "";
        el.style.opacity = "";
      }
    });
    if (active) requestAnimationFrame(step);
    else decoding = false;
  };
  requestAnimationFrame(step);
}

function startFlicker(): void {
  spans.forEach((el) => {
    el.style.animation = `neonflick ${(2.5 + Math.random() * 5).toFixed(1)}s linear ${(-Math.random() * 6).toFixed(1)}s infinite`;
  });
}

function clearFx(): void {
  spans.forEach((el) => {
    el.textContent = el.dataset.ch ?? "";
    el.style.transform = "";
    el.style.textShadow = "";
    el.style.animation = "";
  });
}

function onMove(e: MouseEvent): void {
  if (modeStore.get() !== "hover") return;
  spans.forEach((el) => {
    const r = el.getBoundingClientRect();
    const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
    if (d < 150) {
      const f = 1 - d / 150;
      const j = f * 7;
      if (f > 0.35) {
        if (Math.random() < 0.4) {
          el.textContent = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        }
      } else {
        el.textContent = el.dataset.ch ?? "";
      }
      el.style.transform = `translate(${((Math.random() * 2 - 1) * j).toFixed(1)}px,${((Math.random() * 2 - 1) * j).toFixed(1)}px) skewX(${((Math.random() * 2 - 1) * f * 8).toFixed(1)}deg)`;
      el.style.textShadow = `${(3 * f).toFixed(1)}px 0 color-mix(in srgb, var(--accent2) ${Math.round(85 * f)}%, transparent), ${(-3 * f).toFixed(1)}px 0 color-mix(in srgb, var(--accent3) ${Math.round(85 * f)}%, transparent)`;
    } else {
      el.textContent = el.dataset.ch ?? "";
      el.style.transform = "";
      el.style.textShadow = "";
    }
  });
}

export function applyModeEffect(mode: Mode): void {
  clearFx();
  if (mode === "decode") startDecode();
  if (mode === "flicker") startFlicker();
}

export function initHeadline(el: HTMLElement): void {
  build(el);
  el.addEventListener("mouseenter", () => {
    if (modeStore.get() === "decode") startDecode();
  });
  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", () => {
    if (modeStore.get() === "hover") clearFx();
  });
  modeStore.subscribe((mode) => applyModeEffect(mode));
}
