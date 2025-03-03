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
  }

  renderCell(cell, x, y, p_nWidth, p_nHeight){
    let fillColor = color(0);
    let normalizedTmp = 0;

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

    noStroke();
    fill(fillColor);
    rect(x, y, p_nWidth, p_nHeight);

    if (cell.hasResource()){
      fill(255, 0, 0);
      // ellipseMode(CORNERS);
      ellipse(x + p_nWidth / 2, y  + p_nHeight / 2, 2, 2);
    }
  }

}
