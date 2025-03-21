import {Graphics} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';

export class System {
  constructor(app) {
    this.app = app;
    this.numItems = 40;
    this.items = [];

    this.layoutRadius = Math.min(this.app.screen.width, this.app.screen.height) * 0.4; 
  }

  init(){    
    // add to the stage in a circle around the center of the screen
    const circleSize = 0.05 * this.layoutRadius;

    for (let i = 0; i < this.numItems; i++) {
      const angle = (i / this.numItems) * Math.PI * 2;
      const angleInDegrees = angle * (180 / Math.PI);
      const x = Math.cos(angle) * this.layoutRadius + this.app.screen.width / 2;
      const y = Math.sin(angle) * this.layoutRadius + this.app.screen.height / 2;
      const item = new Graphics()
          .circle(0, 0, circleSize, circleSize)
          .fill( { h: (angleInDegrees) % 360, s: 90, l: 48, a: 1 });
      item.x = x;
      item.y = y;
      this.app.stage.addChild(item);
      this.items.push(item);
    }
  }

  tick(ticker, totalElapsedMS) {
    // move the items in a circle around the center of the screen
    const elapsed = totalElapsedMS / 1000.0;
    const speed = 0.5; // radians per second

    for (let i = 0; i < this.numItems; i++) {
      let angle = (i / this.numItems) * Math.PI * 2 + elapsed * speed;
      let x = Math.cos(angle) * this.layoutRadius + this.app.screen.width / 2;
      let y = Math.sin(angle) * this.layoutRadius + this.app.screen.height / 2;
      this.items[i].x = x;
      this.items[i].y = y;
    }
  }

}