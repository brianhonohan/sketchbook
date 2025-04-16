import {ElementViewer} from './element_viewer.mjs';
import {Container, Color} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';

export class PeriodicTableViewer extends Container {
  static LAYOUT_STANDARD = 0;

  static COLOR_VIA_TRIVIAL_GROUP = 'Trivial Group';
  static COLOR_VIA_MELTING_POINT = 'Melting Point';
  static COLOR_VIA_BOILING_POINT = 'Boiling Point';

  static COLOR_OPTIONS = [
    PeriodicTableViewer.COLOR_VIA_TRIVIAL_GROUP,
    PeriodicTableViewer.COLOR_VIA_MELTING_POINT,
    PeriodicTableViewer.COLOR_VIA_BOILING_POINT
   ];

  static dimForColorOption(colorOption){ 
    switch(colorOption){
      case PeriodicTableViewer.COLOR_VIA_TRIVIAL_GROUP: return 'trivial_group';
      case PeriodicTableViewer.COLOR_VIA_MELTING_POINT: return 'melting_point';
      case PeriodicTableViewer.COLOR_VIA_BOILING_POINT: return 'boiling_point';
    }
  }

  constructor(elements){
    super({isRendererGroup: true});
    this.system = undefined;
    this._width = 360;
    this._height = 200;
    this.eventMode = 'static';
    this.layoutMode = PeriodicTableViewer.LAYOUT_STANDARD;

    this.colorizeDim = PeriodicTableViewer.COLOR_VIA_TRIVIAL_GROUP;
  }

  setElements(elements){
    this.elements = elements;
    this.elementViewers = [];
    this.buildElementViewers();

    this.setLayoutMode(this.layoutMode);
    this.summaryStats = {};
  }

  buildElementViewers(){
    for (let i = 0; i < this.elements.length; i++){
      let elemViewer = new ElementViewer(this.elements[i]);

      elemViewer.eventMode = 'static';
      this.elementViewers.push( elemViewer);
      this.addChild(elemViewer);
    }
  }

  applyColorDim(){
    let dim = PeriodicTableViewer.dimForColorOption(this.colorizeDim);
    let summary = this.getSummaryStats(dim);

    for (let i = 0; i < this.elements.length; i++){
      let elemViewer = this.elementViewers[i];
      let dimVal = elemViewer.elementData[dim];

      let newColor = 0xFF00FF;
      if (this.colorizeDim == PeriodicTableViewer.COLOR_VIA_TRIVIAL_GROUP){
        newColor = ElementViewer.COLOR_MAP_TRIVIAL_GROUP[dimVal];;
      } else {
        let percentAlongRange = (dimVal - summary['min']) / ( summary['max'] -  summary['min']);
        newColor = new Color({ h: percentAlongRange * 360, s: 100, l: 25, a: 1 });
      }
      elemViewer.setBackgroundColor( newColor );
    }
  }
  
  getSummaryStats(dimension){
    if (this.summaryStats[dimension] != undefined){
      return this.summaryStats[dimension];
    }
    this.summaryStats[dimension] = {};

    let minVal = Number.MAX_VALUE;
    let maxVal = Number.MIN_VALUE;
    let minIdx = undefined;
    let maxIdx = undefined;

    for (let i = 0; i < this.elements.length; i++){
      let val = this.elements[i][dimension];
      let numericVal = this.cleanNumericValue(val);

      if (minVal > numericVal) { 
        minVal = numericVal;
        minIdx = i;
      }
      if (maxVal < numericVal){
        maxVal = numericVal;
        maxIdx = i;
      }
    }
    this.summaryStats[dimension]['min'] = minVal;
    this.summaryStats[dimension]['minIdx'] = minIdx;
    this.summaryStats[dimension]['max'] = maxVal;
    this.summaryStats[dimension]['maxIdx'] = maxIdx;
    return this.summaryStats[dimension];
  }

  cleanNumericValue(value){
    let cleanedVal = value;
    if ("–" === cleanedVal || cleanedVal == undefined){
      return NaN;
    } 

    if ( cleanedVal.indexOf('±') > 0){
      cleanedVal = (cleanedVal.split("±"))[0];
    }
    cleanedVal = cleanedVal.replace(/\(|\)|\[|\]/g,'');
    let numericVal = Number(cleanedVal);
      
    return numericVal;
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
    this.elementSize = elementSize;
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

  bubbleUpClickedElement(element){
    this.system.highlightElement(element);
  }
}