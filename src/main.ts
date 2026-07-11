/** Composition root. */

import "./style.css";
import { modeStore } from "./application/modeStore";
import { runBoot } from "./presentation/boot";
import { initHeadline, applyModeEffect } from "./presentation/headline";
import { initHoverScramble } from "./presentation/scramble";
import { initKanji } from "./presentation/kanji";
import { initLens, triggerScan } from "./presentation/lens";
import { initUplink } from "./presentation/uplink";
import { initEgg } from "./presentation/egg";

modeStore.applyPalette();

initHeadline(document.getElementById("headline")!);
initKanji(document.getElementById("kanji")!);
initLens();
initUplink();
initEgg();
initHoverScramble();

runBoot().then(() => {
  applyModeEffect(modeStore.get());
  triggerScan();
});
