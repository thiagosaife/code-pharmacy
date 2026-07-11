/** Domain: display modes and their palettes. Pure data — no DOM. */

export type Mode = "decode" | "hover" | "flicker";

export interface Palette {
  accent1: string;
  accent2: string;
  accent3: string;
}

export const MODES: Mode[] = ["decode", "hover", "flicker"];

export const PALETTES: Record<Mode, Palette> = {
  decode: { accent1: "#ff2ec8", accent2: "#8a877a", accent3: "#6b6858" },
  hover: { accent1: "#fcee0a", accent2: "#ff2e7e", accent3: "#00f0ff" },
  flicker: { accent1: "#3ae0f2", accent2: "#8a877a", accent3: "#5a8a92" },
};

/** Kanji watermark colors per mode (indexed i % 3). */
export const KANJI_COLORS: Record<Mode, [string, string, string] | null> = {
  decode: ["#c9c4b4", "#8a877a", "#d98ac6"],
  flicker: ["#9adfe8", "#8a877a", "#4ac8d8"],
  hover: null, // hover uses neon hsl hues
};

export const KANJI_HUES = [55, 335, 185]; // yellow, pink, teal

export function nextMode(current: Mode): Mode {
  return MODES[(MODES.indexOf(current) + 1) % MODES.length];
}

export const DEFAULT_MODE: Mode = "decode";
