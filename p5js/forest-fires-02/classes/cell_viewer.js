class CellViewer {
  constructor (){
    this._colors = this.colorScheme();
    this.initColorSchemeLookup();
    this.isPixelRenderer = false;
    this.pxDensity = pixelDensity();
  }

  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    if (this.isPixelRenderer) {
      this.renderCellViaPixels(tmpCell, tmpX, tmpY, cellWidth, cellHeight);
    } else {
      this.renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight);
    }
  }

  renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    fill(this.colorLookup[tmpCell.terrainType]);
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }

  renderCellViaPixels(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    let pixelIdx;
    let redValue = this.redLookup[tmpCell.terrainType];
    let greenVal = this.greenLookup[tmpCell.terrainType];
    let blueVal  = this.blueLookup[tmpCell.terrainType];
    
    let maxX = tmpX + cellWidth;
    let maxY = tmpY + cellHeight;

    for(var x = tmpX; x < maxX; x++){
      for(var y = tmpY; y < maxY; y++){
        pixelIdx = 4 * (y * width * this.pxDensity * this.pxDensity + x * this.pxDensity);
        pixels[pixelIdx + 0] = redValue;
        pixels[pixelIdx + 1] = greenVal;
        pixels[pixelIdx + 2] = blueVal;
        pixels[pixelIdx + 3] = 255;
      }
    }
  }

  colorScheme(){
    return {
      water: color(52, 127, 207),
      soil: color(117, 55, 40),
      sand: color(232, 210, 131),
      foliage: color(54, 143, 36),
      burning: color(255,181,36),
      engulfed: color(245, 50, 50),
      smoldering: color(230, 100, 50),
      burnt: color(50, 50, 50),
      partial_burn: color(70, 70, 70)
    };
  }
  
  terrainForColor(forColor){
    return this.colorLookup.findIndex(tmpC => { 
      return P5JsUtils.colorsMatch(forColor, tmpC); 
    });
  }

  initColorSchemeLookup(){
    this.colorLookup = [];
    this.colorLookup[System.TERRAIN_SOIL] = this._colors.soil;
    this.colorLookup[System.TERRAIN_WATER] = this._colors.water;
    this.colorLookup[System.TERRAIN_FOLLIAGE] = this._colors.foliage;
    this.colorLookup[System.TERRAIN_BURNING] = this._colors.burning;
    this.colorLookup[System.TERRAIN_ENGULFED] = this._colors.engulfed;
    this.colorLookup[System.TERRAIN_SMOLDERING] = this._colors.smoldering;
    this.colorLookup[System.TERRAIN_BURNT] = this._colors.burnt;
    this.colorLookup[System.TERRAIN_PARTIAL_BURN] = this._colors.partial_burn;

    this.redLookup    = this.colorLookup.map(c => red(c));
    this.greenLookup  = this.colorLookup.map(c => green(c));
    this.blueLookup   = this.colorLookup.map(c => blue(c));
  }
}
