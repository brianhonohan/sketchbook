class CellViewer {
  constructor(x, y, p_nWidth, p_nHeight, p_xCell){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
    this.cell = p_xCell;

    // TODO: Move this into a config / style
    this.minColor = color(0,0,255);
    this.midColor = color(255);
    this.maxColor = color(255,0,0);
  }

  renderOnScale(minTemp, midPoint, maxTemp){
    if (this.cell.isWall){
      fill(50);
    } else {
      this.setFillColorForTemp(minTemp, midPoint, maxTemp);
    }
    noStroke();
    rect(this._x, this._y, this._width, this._height);
  }

  setFillColorForTemp(minTemp, midPoint, maxTemp){
    let fillColor = color(0);
    let normalizedTmp = 0;

    if (this.cell.temp < midPoint){
      normalizedTmp = norm( this.cell.temp, minTemp, midPoint);
      fillColor = lerpColor(this.minColor, this.midColor, normalizedTmp);
    }else{
      normalizedTmp = norm( this.cell.temp, midPoint, maxTemp);
      fillColor = lerpColor(this.midColor, this.maxColor, normalizedTmp);
    }

    fill(fillColor);
  }
}
