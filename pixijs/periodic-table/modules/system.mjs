import {ElementViewer} from './element_viewer.mjs';
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

    // Scaling a container with text has the effect of stretching the text
    // this.elementViewer.scale(0.5, 0.5);
    this.elementViewer.x = this.width / 2 - this.elementViewer.container.width / 2;
    this.elementViewer.y = this.height / 2 - this.elementViewer.container.height / 2;
    this.app.stage.addChild(this.elementViewer.container);
    
    const dataUrl = '/sketchbook/assets/data/chemical_elements.csv';
    papaparse.parse(dataUrl, {
      download: true,
      complete: this.handleCsvParse.bind(this)
    });
  }

  handleCsvParse(results) {
    window.csvResults = results;
    this.elementsData = this.csvToObjects(results.data);
    this.displayElement(0);
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

  displayElement(idx) {
    this.currentElementIdx = idx;
    this.elementViewer.setElement( this.elementsData[idx] );
  }

  tick(ticker, totalElapsedMS) {
    if (!this.elementsData) return;
    

    let idxToShow = Math.floor(totalElapsedMS / 1000) % this.elementsData.length;
    if (idxToShow !== this.currentElementIdx) {
      this.displayElement(idxToShow);
    }
  }
}