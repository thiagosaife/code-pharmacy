/** Presentation: neural boot overlay + RGB-split page reveal. */

import { BOOT_LINES } from "../domain/content";

export function runBoot(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.getElementById("boot")!;
    const linesEl = document.getElementById("boot-lines")!;
    const page = document.getElementById("page")!;
    let finished = false;
    let timer = 0;

    const finish = (): void => {
      if (finished) return;
      finished = true;
      window.clearInterval(timer);
      window.removeEventListener("keydown", finish);
      overlay.hidden = true;
      page.classList.add("rgbglitch");
      window.setTimeout(() => {
        page.classList.remove("rgbglitch");
        resolve();
      }, 900);
    };

    let i = 0;
    timer = window.setInterval(() => {
      i++;
      if (i <= BOOT_LINES.length) {
        const { t, s } = BOOT_LINES[i - 1];
        const div = document.createElement("div");
        div.className = "boot-line";
        div.innerHTML = `<span class="p">&gt;</span> ${t} <span class="s">${s}</span>`;
        linesEl.appendChild(div);
      } else {
        finish();
      }
    }, 240);

    window.addEventListener("keydown", finish);
    overlay.addEventListener("click", finish);
  });
}
