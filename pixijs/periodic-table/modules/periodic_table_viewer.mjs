import {ElementViewer} from './element_viewer.mjs';
import {Container} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';

export class PeriodicTableViewer {
  static LAYOUT_STANDARD = 0;

  constructor(elements){
    this.elements = elements;
    this.container = new Container({isRendererGroup: true});
    
    this.elementViewers = [];
    this.buildElementViewers();

    this._width = 360;
    this._height = 200;

    this.layoutMode = PeriodicTableViewer.LAYOUT_STANDARD;
    this.setLayoutMode(this.layoutMode);
  }

  buildElementViewers(){
    for (let i = 0; i < this.elements.length; i++){
      let elemViewer = new ElementViewer(this.elements[i]);
      this.elementViewers.push( elemViewer);
      this.container.addChild(elemViewer.container);
    }
  }

  setSize(size_or_w, _height){
    if (_height != undefined){ 
      this._width = size_or_w;
      this._height = _height;
    } else { 
      this._width = size_or_w.width;
      this._height = size_or_w.height;
    }

    this.relayout();
  }

  relayout(){
    this.setLayoutMode(this.layoutMode);
  }

  setLayoutMode(mode){
    this.layoutMode = mode;

    switch(this.layoutMode){
      case PeriodicTableViewer.LAYOUT_STANDARD:
          this.displayStandardTable();
          return;
    }
  }

  displayStandardTable(){
    const numCols = 18;
    const numRows = 10;
    let elementSize = undefined;

    // Determine limiting dimension
    if ((this._width / this._height) > (numCols * 1.0 / numRows)){
      // It is wider than the default aspect ratio, so height is limiting
      elementSize = this._height / numRows;
    } else {
      elementSize = this._width / numCols;
    }
    const elemSizeObj = {width: elementSize, height: elementSize};

    let fBlockAtomWeightOffset = {'6': 57, '7': 89};

    for (let i = 0; i < this.elements.length; i++){
      let elemViewer = this.elementViewers[i];
      elemViewer.setSize( elemSizeObj );

      let chemical = elemViewer.elementData;
      let x = undefined;
      let y = undefined;

      if (chemical.group == 'f-block groups'){        
        x = elementSize * (3 + parseInt(chemical.atomic_number) - fBlockAtomWeightOffset[chemical.period]);
        y = elementSize * (2 + parseInt(chemical.period));

      } else {
        x = elementSize * (parseInt(chemical.group) - 1);
        y = elementSize * (parseInt(chemical.period) - 1); ;
      }
      elemViewer.x = x;
      elemViewer.y = y;
    }
  }

  get x() { return this.container.x; }
  set x(value) { this.container.x = value; }
  get y() { return this.container.y; }
  set y(value) { this.container.y = value; }

  get width() { return this.container.width; }
  get height() { return this.container.height; }
}