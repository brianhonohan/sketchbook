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
  }

  renderOnScale(minElev, midPoint, maxElev){
    this.renderCell(this.cell, this._x, this._y, this._width, this._height, 
                      minElev, midPoint, maxElev);
  }

  renderCell(cell, x, y, p_nWidth, p_nHeight, minElev, midPoint, maxElev){
    let fillColor = color(0);
    let normalizedTmp = 0;

    if (this.cell.elevation < midPoint){
      normalizedTmp = norm( this.cell.elevation, minElev, midPoint);
      fillColor = lerpColor(this.minColor, this.color2, normalizedTmp);
    }else if(this.cell.elevation < maxElev){
      normalizedTmp = norm( this.cell.elevation, midPoint, maxElev);
      fillColor = lerpColor(this.color4, this.color5, normalizedTmp);
    } else{
      normalizedTmp = norm( this.cell.elevation, maxElev, 500);
      fillColor = lerpColor(this.color5, this.color6, normalizedTmp);
    }

    noStroke();
    fill(fillColor);
    rect(x, y, p_nWidth, p_nHeight);

    if (this.cell.hasResource()){
      fill(255, 0, 0);
      // ellipseMode(CORNERS);
      ellipse(x + p_nWidth / 2, y  + p_nHeight / 2, 2, 2);
    }
  }

}
