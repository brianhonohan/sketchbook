import {Application, Container} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';
import {System} from './modules/system.mjs';
import {PixiJsSettings} from '/sketchbook/pixijs/common/pixi_settings.mjs';
import { PeriodicTableViewer } from './modules/periodic_table_viewer.mjs';

(async () => {
  const app = new Application();
  await app.init({ 
      width: window.innerWidth, height: window.innerHeight,
      // width: 500, height: 500, // for screenshot
      background: 0x323232,  // this is overridden within System.addBackground()
      antialias: true,
    });
  document.body.appendChild(app.canvas);
  app.canvas.style.position = 'absolute';

  const system = new System(app);
  system.init();

  let totalElapsedMS = 0.0;
  app.ticker.add((ticker) => {
    totalElapsedMS += ticker.elapsedMS;
    system.tick(ticker, totalElapsedMS);
  });

  const gui = PixiJsSettings.addGui({autoPlace: false});
  gui.add(system.periodicTableViewer, "colorizeDim",
      PeriodicTableViewer.colorOptions())
      .name("Color elements by ...")
      .onFinishChange(system.periodicTableViewer.applyColorDim.bind(system.periodicTableViewer));

  // for debugging
  window.__PIXI_DEVTOOLS__ = { app };
  window.app = app;
  window.system = system;
})();
