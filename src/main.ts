/** Composition root. */

import "./style.css";
import { modeStore } from "./application/modeStore";
import { runBoot } from "./presentation/boot";
import { initHeadline, applyModeEffect } from "./presentation/headline";
import { initHoverScramble } from "./presentation/scramble";
import { initDrift } from "./presentation/drift";
import { initLens, triggerScan } from "./presentation/lens";
import { initUplink } from "./presentation/uplink";
import { initEgg } from "./presentation/egg";
import { initAutoMode } from "./presentation/autoMode";

modeStore.applyPalette();

initHeadline(document.getElementById("headline")!);
initDrift(document.getElementById("drift")!);
initLens();
initUplink();
initEgg();
initHoverScramble();

runBoot().then(() => {
  applyModeEffect(modeStore.get());
  triggerScan();
  initAutoMode();
});
