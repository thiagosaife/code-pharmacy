/** Presentation: v0.1 easter egg — cycles modes, shows toast, random hint flicker. */

import { modeStore } from "../application/modeStore";
import { burstAll } from "./scramble";
import { applyModeEffect } from "./headline";

let toastTimer = 0;
let hintTimer = 0;

function showToast(text: string): void {
  const toast = document.getElementById("toast")!;
  toast.textContent = text;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toast.hidden = true), 1800);
}

function scheduleHint(egg: HTMLElement): void {
  hintTimer = window.setTimeout(() => {
    egg.style.animation = "egghint 1.1s steps(4)";
    window.setTimeout(() => (egg.style.animation = ""), 1200);
    scheduleHint(egg);
  }, 7000 + Math.random() * 16000);
}

export function initEgg(): void {
  const egg = document.getElementById("egg")!;

  egg.addEventListener("click", () => {
    const next = modeStore.cycle();
    showToast(`OPTIC_FX \u2192 ${next.toUpperCase()}`);
  });

  // texts re-scramble on every mode switch
  modeStore.subscribe(() => {
    window.setTimeout(burstAll, 60);
  });

  scheduleHint(egg);
}

export function stopEggHint(): void {
  window.clearTimeout(hintTimer);
}

export { applyModeEffect };
