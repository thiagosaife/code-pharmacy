/** Domain: static content. Pure data — no DOM. */

export const KATAKANA =
  "アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプ";

export const HEADLINE_LINES: Array<{ word: string; accent: boolean }> = [
  { word: "Front", accent: false },
  { word: "End", accent: true },
  { word: "Engineer", accent: false },
];

export const BOOT_LINES: Array<{ t: string; s: string }> = [
  { t: "NEURACORE BIOS v7.7.7", s: "OK" },
  { t: "MEM CHECK 65536K", s: "OK" },
  { t: "LOADING PERSONA .......", s: "OK" },
  { t: "CALIBRATING OPTICS", s: "OK" },
  { t: "MOUNTING /work /about /contact", s: "OK" },
  { t: "UPLINK HANDSHAKE", s: "STANDBY" },
  { t: "RENDERING INTERFACE", s: "" },
];

export const KANJI_GLYPHS = [
  "東", "未来", "電脳", "危", "険", "ネオ", "サイバ", "零",
  "街", "光", "夢", "攻殻", "ギン", "カ", "進化", "都市",
];
