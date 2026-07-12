/** Presentation: auto-cycles color modes on a random timer. */

import { modeStore } from "../application/modeStore";

const MIN_DELAY_MS = 15000;
const MAX_DELAY_MS = 45000;

let timer = 0;

function schedule(): void {
  window.clearTimeout(timer);
  timer = window.setTimeout(
    () => modeStore.cycle(),
    MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS),
  );
}

export function initAutoMode(): void {
  // any mode change (auto or manual egg click) restarts the countdown,
  // so a manual switch always gets its full random window
  modeStore.subscribe(schedule);
  schedule();
}

export function stopAutoMode(): void {
  window.clearTimeout(timer);
}
