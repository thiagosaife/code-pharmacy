/** Domain: static content. Pure data — no DOM. */

export const KATAKANA =
  "アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプ";

export const HEADLINE_LINES: Array<{ word: string; accent: boolean }> = [
  { word: "AI", accent: false },
  { word: "Engineer", accent: false },
  { word: "Architect", accent: true },
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

/** Watermark layer: wireframe forms. Stroke-only, colored via currentColor. */
export const DRIFT_SHAPES = [
  // circle + crosshair
  `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="50" cy="50" r="16" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M50 0v28M50 72v28M0 50h28M72 50h28" stroke="currentColor" stroke-width="1.5"/></svg>`,
  // triangle
  `<svg viewBox="0 0 100 100"><path d="M50 8 92 88H8z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M50 40 71 76H29z" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/></svg>`,
  // hexagon
  `<svg viewBox="0 0 100 100"><path d="M50 6 89 28v44L50 94 11 72V28z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M50 6v88M11 28l78 44M89 28 11 72" stroke="currentColor" stroke-width="0.75" opacity="0.45"/></svg>`,
  // concentric rings, dashed
  `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="1" stroke-dasharray="4 7" fill="none"/><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="50" cy="50" r="5" fill="currentColor"/></svg>`,
  // rotated square in square
  `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M50 18 82 50 50 82 18 50z" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/></svg>`,
  // node graph
  `<svg viewBox="0 0 100 100"><path d="M18 22h64M18 22 50 78M82 22 50 78M82 22 18 78M18 78h64" stroke="currentColor" stroke-width="1" opacity="0.7"/><circle cx="18" cy="22" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="82" cy="22" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="50" cy="78" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="18" cy="78" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  // binary tree
  `<svg viewBox="0 0 100 100"><path d="M50 14 24 50M50 14l26 36M24 50 10 86M24 50l14 36M76 50 62 86M76 50l14 36" stroke="currentColor" stroke-width="1"/><circle cx="50" cy="14" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="24" cy="50" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="76" cy="50" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  // waveform
  `<svg viewBox="0 0 100 100"><path d="M2 50h14l8-26 10 52 9-40 11 30 8-22 9 14 8-8h19" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 50h96" stroke="currentColor" stroke-width="0.75" stroke-dasharray="3 6" opacity="0.5"/></svg>`,
  // stacked bars (sorted array)
  `<svg viewBox="0 0 100 100"><rect x="8" y="66" width="12" height="26" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="26" y="52" width="12" height="40" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="44" y="38" width="12" height="54" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="62" y="24" width="12" height="68" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="80" y="10" width="12" height="82" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  // grid of dots
  `<svg viewBox="0 0 100 100"><g fill="currentColor"><circle cx="16" cy="16" r="3"/><circle cx="50" cy="16" r="3"/><circle cx="84" cy="16" r="3"/><circle cx="16" cy="50" r="3"/><circle cx="50" cy="50" r="3"/><circle cx="84" cy="50" r="3"/><circle cx="16" cy="84" r="3"/><circle cx="50" cy="84" r="3"/><circle cx="84" cy="84" r="3"/></g><rect x="4" y="4" width="92" height="92" stroke="currentColor" stroke-width="1" stroke-dasharray="6 6" fill="none" opacity="0.45"/></svg>`,
];

/** Watermark layer: TypeScript algorithm fragments. */
export const CODE_FRAGMENTS = [
  `function binarySearch(a: number[], t: number): number {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] === t) return mid;
    if (a[mid] < t) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
  `function partition(a: number[], lo: number, hi: number): number {
  const pivot = a[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (a[j] > pivot) continue;
    [a[++i], a[j]] = [a[j], a[i]];
  }
  [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
  return i + 1;
}`,
  `function bfs(graph: Map<string, string[]>, start: string): string[] {
  const seen = new Set([start]);
  const queue = [start];
  const order: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    order.push(node);
    for (const next of graph.get(node) ?? []) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return order;
}`,
  `function memoize<A, R>(fn: (a: A) => R): (a: A) => R {
  const cache = new Map<A, R>();
  return (a) => {
    if (!cache.has(a)) cache.set(a, fn(a));
    return cache.get(a)!;
  };
}`,
  `function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  ms: number,
): (...args: T) => void {
  let id: number | undefined;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}`,
  `function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}`,
  `function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}`,
  `function* fib(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}`,
  `function isBalanced(src: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of src) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else if ("([{".includes(ch)) {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
  `function throttleRAF(fn: () => void): () => void {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fn();
    });
  };
}`,
];
