/** Application: feature-flag state + persistence + subscribers. */

import { DEFAULT_FLAGS, FLAG_NAMES, FlagName, Flags, parseFlag } from "../domain/flags";

type Listener = (on: boolean) => void;

const STORAGE_KEY = "code-pharmacy.flags";

class FlagStore {
  private flags: Flags = { ...DEFAULT_FLAGS };
  private listeners = new Map<FlagName, Listener[]>();

  /** Precedence: ?drift=on in the URL, else a persisted toggle, else the default. */
  init(): void {
    const persisted = this.read();
    const query = new URLSearchParams(window.location.search);
    for (const name of FLAG_NAMES) {
      const raw = query.get(name);
      if (raw !== null) this.flags[name] = parseFlag(raw);
      else if (typeof persisted[name] === "boolean") this.flags[name] = persisted[name];
    }
  }

  get(name: FlagName): boolean {
    return this.flags[name];
  }

  set(name: FlagName, on: boolean): boolean {
    if (this.flags[name] !== on) {
      this.flags[name] = on;
      this.write();
      for (const fn of this.listeners.get(name) ?? []) fn(on);
    }
    return on;
  }

  toggle(name: FlagName): boolean {
    return this.set(name, !this.flags[name]);
  }

  subscribe(name: FlagName, fn: Listener): void {
    const fns = this.listeners.get(name) ?? [];
    fns.push(fn);
    this.listeners.set(name, fns);
  }

  private read(): Partial<Flags> {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<Flags>;
    } catch {
      return {}; // storage blocked or value corrupt — fall back to defaults
    }
  }

  private write(): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.flags));
    } catch {
      // storage blocked — the toggle still holds for this session
    }
  }
}

export const flagStore = new FlagStore();
