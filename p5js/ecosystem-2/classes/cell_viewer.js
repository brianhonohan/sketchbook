class CellViewer {
  constructor(x, y, p_nWidth, p_nHeight, p_xCell){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
    this.cell = p_xCell;

    // TODO: Move this into a config / style
    this.minColor = color(0,20,80);
    this.color2 = color(20,130,190);
    this.midColor = color(255);
    this.color4 = color(20,100,40);
    this.color5 = color(180,190,120);
    this.color6 = color(255, 255, 255);

    this._minElev = -300;
    this._midPoint = 0;
    this._maxElev = 300;

    this.resourceColors = [
      color(230, 0, 0),
      color(230, 0, 230),
      color(230, 230, 0),
      color(230, 150, 0),
    ];
    this.showResources = false;
    this.useColorRamp = true;
    this.fullRedrawRequested = false;
    this.updateSettings();
  }
  
  updateSettings(){
    this.colorRamp = P5jsColorRamp.elevation();
  }

  renderCell(cell, x, y, p_nWidth, p_nHeight){
    let fillColor = color(0);
    let normalizedTmp = 0;

    if (this.useColorRamp) {
      normalizedTmp = cell.elevation < 0 ? -1 * cell.elevation / this._minElev 
                                         : cell.elevation / 500;
      fillColor = this.colorRamp.getColorForValue(normalizedTmp);
    } else {
      if (cell.elevation < this._midPoint){
        normalizedTmp = norm(cell.elevation, this._minElev, this._midPoint);
        fillColor = lerpColor(this.minColor, this.color2, normalizedTmp);
      }else if(cell.elevation < this._maxElev){
        normalizedTmp = norm(cell.elevation, this._midPoint, this._maxElev);
        fillColor = lerpColor(this.color4, this.color5, normalizedTmp);
      } else{
        normalizedTmp = norm(cell.elevation, this._maxElev, 500);
        fillColor = lerpColor(this.color5, this.color6, normalizedTmp);
      }
    }

    noStroke();
    fill(fillColor);
    rect(x, y, p_nWidth, p_nHeight);

    if (this.showResources && cell.hasResource()){
      fill( this.resourceColors[ cell.resources[0] - 1]);
      ellipse(x + p_nWidth / 2, y  + p_nHeight / 2, 3, 3);
    }
  }

}
