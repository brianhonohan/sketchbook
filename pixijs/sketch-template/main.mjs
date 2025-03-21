import {Application, Graphics} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';
 
(async () => {
  const app = new Application();
  await app.init({ 
      // width: window.innerWidth, height: window.innerHeight
      width: 500, height: 500,
      background: 0x323232,
    });
  document.body.appendChild(app.canvas);
  app.canvas.style.position = 'absolute';

  let obj = new Graphics()
    .rect(0, 0, 200, 100)
    .fill(0xff0000);
  app.stage.addChild(obj);

  // Add a ticker callback to move the sprite back and forth
  let elapsed = 0.0;
  app.ticker.add((ticker) => {
    elapsed += ticker.deltaTime;
  });

  window.__PIXI_DEVTOOLS__ = { app };
  window.app = app; // for debugging
})();
