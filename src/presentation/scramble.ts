/** Presentation: katakana text scramble — mode-switch burst + hover-mode delegation. */

import { KATAKANA } from "../domain/content";
import { modeStore } from "../application/modeStore";

const busy = new WeakSet<HTMLElement>();
const lastRun = new WeakMap<HTMLElement, number>();

export function scrambleEl(el: HTMLElement, dur = 500): void {
  if (busy.has(el)) return;
  if (Date.now() - (lastRun.get(el) ?? 0) < 1200) return;

  const nodes: Array<[Text, string]> = [];
  const walk = (n: Node): void => {
    n.childNodes.forEach((c) => {
      if (c.nodeType === Node.TEXT_NODE && c.textContent?.trim()) {
        nodes.push([c as Text, c.textContent]);
      } else if (
        c.nodeType === Node.ELEMENT_NODE &&
        !["INPUT", "TEXTAREA"].includes((c as Element).tagName)
      ) {
        walk(c);
      }
    });
  };
  walk(el);
  if (!nodes.length) return;

  busy.add(el);
  lastRun.set(el, Date.now());
  const t0 = performance.now();

  const step = (now: number): void => {
    const p = (now - t0) / dur;
    if (p >= 1 || !el.isConnected) {
      nodes.forEach(([n, orig]) => (n.textContent = orig));
      busy.delete(el);
      return;
    }
    nodes.forEach(([n, orig]) => {
      const chars = orig.split("");
      n.textContent = chars
        .map((ch, i) => {
          if (ch === " " || ch === "/" || i / chars.length < p * 1.4 - 0.25) return ch;
          return Math.random() < 0.5
            ? KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
            : ch;
        })
        .join("");
    });
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function burstAll(): void {
  document.querySelectorAll<HTMLElement>("[data-fx]").forEach((el, i) => {
    window.setTimeout(() => scrambleEl(el, 550), i * 45);
  });
}

export function initHoverScramble(): void {
  document.addEventListener("mouseover", (e) => {
    if (modeStore.get() !== "hover") return;
    const target = (e.target as HTMLElement).closest?.("[data-fx]");
    if (target) scrambleEl(target as HTMLElement, 420);
  });
}
