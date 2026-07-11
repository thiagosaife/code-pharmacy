/** Presentation: pug implant lens glow tracking + tab-return re-scan. */

let scanTimer = 0;

export function triggerScan(): void {
  const fx = document.getElementById("scanline-fx")!;
  window.clearTimeout(scanTimer);
  fx.hidden = false;
  // restart the sweep animation
  const sweep = fx.querySelector<HTMLElement>(".scan-sweep")!;
  sweep.style.animation = "none";
  void sweep.offsetWidth;
  sweep.style.animation = "";
  scanTimer = window.setTimeout(() => (fx.hidden = true), 1900);
}

export function initLens(): void {
  const lens = document.getElementById("lens")!;

  window.addEventListener("mousemove", (e) => {
    const parent = lens.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const cx = r.left + r.width * 0.3;
    const cy = r.top + r.height * 0.47;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d = Math.hypot(dx, dy) || 1;
    const m = Math.min(9, d / 40);
    lens.style.transform = `translate(${((dx / d) * m).toFixed(1)}px,${((dy / d) * m).toFixed(1)}px)`;
    lens.style.opacity = Math.max(0.35, 1 - d / 1100).toFixed(2);
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) triggerScan();
  });
}
