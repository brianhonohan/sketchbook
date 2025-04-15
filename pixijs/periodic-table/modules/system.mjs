import {Sprite, Texture} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';
import {ElementViewer} from './element_viewer.mjs';
import {PeriodicTableViewer} from './periodic_table_viewer.mjs';
import papaparse from 'https://cdn.jsdelivr.net/npm/papaparse@5.5.2/+esm';

export class System {
  constructor(app) {
    this.app = app;
    this.elementData = undefined;
    this.currentElementIdx = undefined;
  }

  get width() { return this.app.screen.width; }
  get height() { return this.app.screen.height; }

  init(){
    this.addBackground();

    this.elementDetails = {
      name: 'Fermium',
      symbol: 'Fm',
      atomic_number: 100,
      atomic_weight: 257.10,
      group: 3,
      period: 7,
      block: 'f'
    }

    this.elementViewer = new ElementViewer(this.elementDetails);
    let minDim = 0.6 * Math.min(this.width, this.height);
    this.elementViewer.setSize({width: minDim, height: minDim});

    this.elementViewer.x = this.width / 2 - this.elementViewer.width / 2;
    this.elementViewer.y = this.height / 2 - this.elementViewer.height / 2;
    this.app.stage.addChild(this.elementViewer);
    
    const dataUrl = '/sketchbook/assets/data/chemical_elements.csv';
    papaparse.parse(dataUrl, {
      download: true,
      complete: this.handleCsvParse.bind(this)
    });
  }

  addBackground(){
    let background = new Sprite(Texture.WHITE);
    background.tint = 0x323232;

    background.width = this.width;
    background.height = this.height;
    
    background.interactive = true;
    background.onclick = this.backgroundClick.bind(this);
    this.app.stage.addChild(background);
  }

  backgroundClick(){
    this.elementViewer.visible = false;
  }

  handleCsvParse(results) {
    window.csvResults = results;
    this.elementsData = this.csvToObjects(results.data);
    this.periodicTableViewer = new PeriodicTableViewer(this.elementsData);
    this.periodicTableViewer.system = this;
    
    this.app.stage.addChild(this.periodicTableViewer);

    // this.app.stage.removeChild(this.elementViewer);
    
    this.periodicTableViewer.setSize(this.width * 0.8, this.height * 0.8);
    this.periodicTableViewer.x = this.width / 2 - this.periodicTableViewer.width / 2;
    this.periodicTableViewer.y = this.height / 2 - this.periodicTableViewer.height / 2;
    
    this.repositionElementViewer();
    this.elementViewer.visible = false;
  }

  csvToObjects(csvData) {
    const headerRow = csvData[0];

    const objects = [];
    for (let i = 1; i < csvData.length; i++){
      const newObject = {};
      for (let j = 0; j < headerRow.length; j++){
        newObject[headerRow[j]] = csvData[i][j];
      }
      objects.push(newObject);
    }
    return objects;
  }

  repositionElementViewer(){
    if (this.width > this.height){
      // WARNING THIS only works in the 'standard' layout mode
      let size = this.periodicTableViewer.y + this.periodicTableViewer.elementSize;
      this.elementViewer.setSize( size );
      this.elementViewer.y = this.periodicTableViewer.elementSize;
      this.elementViewer.x = this.periodicTableViewer.x + 4 * this.periodicTableViewer.elementSize;

    } else {
      const minDim = Math.min(this.width * 0.8, this.periodicTableViewer.y -  0.1 * this.height);
      this.elementViewer.setSize( minDim );
      this.elementViewer.x = 0.5 * this.width - 0.5 * this.elementViewer.width;
      this.elementViewer.y = this.periodicTableViewer.y / 2  - this.elementViewer.height / 2;
    }

  }
  
  highlightElement(element){    
    this.elementViewer.setElement(element);
    this.elementViewer.visible = true;
  }

  displayElement(idx) {
    this.currentElementIdx = idx;
    this.elementViewer.setElement( this.elementsData[idx] );
  }

  tick(ticker, totalElapsedMS) {

  }
}