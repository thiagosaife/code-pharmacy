/** Domain: feature flags. Pure data — no DOM. */

export interface Flags {
  /** Drifting watermark layer: wireframe forms + TS code fragments. */
  drift: boolean;
}

export type FlagName = keyof Flags;

export const DEFAULT_FLAGS: Flags = {
  drift: false,
};

export const FLAG_NAMES = Object.keys(DEFAULT_FLAGS) as FlagName[];

/** Spellings accepted in a ?flag= query param; anything else reads as off. */
export function parseFlag(value: string): boolean {
  return ["1", "on", "true", "yes"].includes(value.trim().toLowerCase());
}
