import {Graphics} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';
import {ElementViewer} from './element_viewer.mjs';

export class System {
  constructor(app) {
    this.app = app;
  }

  get width() { return this.app.screen.width; }
  get height() { return this.app.screen.height; }

  init(){    
    this.elementDetails = {
      name: 'Fermium',
      symbol: 'Fm',
      atomicNumber: 100,
      atomicMass: 257.10,
      group: 3,
      period: 7,
      block: 'f'
    }

    this.elementViewer = new ElementViewer(this.elementDetails);
    let minDim = 0.6 * Math.min(this.width, this.height);
    this.elementViewer.setSize({width: minDim, height: minDim});

    // Scaling a container with text has the effect of stretching the text
    // this.elementViewer.scale(0.5, 0.5);
    this.elementViewer.x = this.width / 2 - this.elementViewer.container.width / 2;
    this.elementViewer.y = this.height / 2 - this.elementViewer.container.height / 2;
    this.app.stage.addChild(this.elementViewer.container);
  }

  tick(ticker, totalElapsedMS) {
    // move the items in a circle around the center of the screen
  }
}