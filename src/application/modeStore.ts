/** Application: mode state + palette application + subscribers. */

import { DEFAULT_MODE, Mode, nextMode, PALETTES } from "../domain/mode";

type Listener = (mode: Mode, previous: Mode) => void;

class ModeStore {
  private mode: Mode = DEFAULT_MODE;
  private listeners: Listener[] = [];

  get(): Mode {
    return this.mode;
  }

  set(mode: Mode): void {
    if (mode === this.mode) return;
    const previous = this.mode;
    this.mode = mode;
    this.applyPalette();
    document.body.classList.toggle("mode-hover", mode === "hover");
    for (const fn of this.listeners) fn(mode, previous);
  }

  cycle(): Mode {
    const next = nextMode(this.mode);
    this.set(next);
    return next;
  }

  subscribe(fn: Listener): void {
    this.listeners.push(fn);
  }

  applyPalette(): void {
    const p = PALETTES[this.mode];
    const root = document.documentElement.style;
    root.setProperty("--accent1", p.accent1);
    root.setProperty("--accent2", p.accent2);
    root.setProperty("--accent3", p.accent3);
  }
}

export const modeStore = new ModeStore();
