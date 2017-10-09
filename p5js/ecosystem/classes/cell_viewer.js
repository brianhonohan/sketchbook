class CellViewer {
  constructor(x, y, p_nWidth, p_nHeight, p_xCell){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
    this.cell = p_xCell;

    // TODO: Move this into a config / style
    this.minColor = color(0,40,190);
    this.color2 = color(190,190,220);
    this.midColor = color(255);
    this.color4 = color(210,210,190);
    this.maxColor = color(40,130,40);
  }

  renderOnScale(minElev, midPoint, maxElev){
    let fillColor = color(0);
    let normalizedTmp = 0;

    if (this.cell.elevation < midPoint){
      normalizedTmp = norm( this.cell.elevation, minElev, midPoint);
      fillColor = lerpColor(this.minColor, this.color2, normalizedTmp);
    }else{
      normalizedTmp = norm( this.cell.elevation, midPoint, maxElev);
      fillColor = lerpColor(this.color4, this.maxColor, normalizedTmp);
    }

    noStroke();
    fill(fillColor);
    rect(this._x, this._y, this._width, this._height);

    if (this.cell.hasResource()){
      fill(255, 0, 0);
      // ellipseMode(CORNERS);
      ellipse(this._x + this._width / 2, this._y  + this._height / 2, 2, 2);
    }
  }
}
