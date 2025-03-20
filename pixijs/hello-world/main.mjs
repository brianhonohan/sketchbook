// Create the application helper and add its render target to the page
const app = new PIXI.Application();
await app.init({ width: window.innerWidth, height: window.innerHeight})
document.body.appendChild(app.canvas);
app.canvas.style.setProperty('position', 'absolute');

// Create the sprite and add it to the stage
await PIXI.Assets.load('/sketchbook/assets/images/sketchbook.png');
let sprite = PIXI.Sprite.from('/sketchbook/assets/images/sketchbook.png');
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});

window.app = app; // for debugging