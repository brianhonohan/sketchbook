class PaletteViewer {
  constructor(_palette){
    this.palette = _palette;
  }

  set palette(_palette){
    this._palette = _palette;
    this.minValue = Number.MAX_VALUE;
    this.maxValue = Number.MIN_VALUE;

    for (let i = 0; i < this._palette.length; i++){
      if (this.minValue > this._palette[i][1]){
        this.minValue = this._palette[i][1];
      }
      if (this.maxValue < this._palette[i][1]){
        this.maxValue = this._palette[i][1];
      }
    }
    this.rangeMagnitude = this.maxValue - this.minValue;
    this._gradientBuffer = undefined;
    this._computeProporationalRanges();
  }

  _computeProporationalRanges(){
    this._proporationalRanges = [];

    for (let i = 0; i < this._palette.length; i++){
      let rangeBefore = (i == 0) ? 0 : (this._palette[i][1] - this._palette[i-1][1]) / 2.0;
      let rangeAfter = (i == this._palette.length - 1) ? 0 : (this._palette[i+1][1] - this._palette[i][1]) / 2.0;
      this._proporationalRanges[i] = (rangeAfter + rangeBefore) / this.rangeMagnitude;
    }
  }
  
  drawProportional(x, y, _width, _height, bottomUP = true){
    let cellHeight;
    let currentY = (bottomUP) ? y + _height : y;
    const direction = (bottomUP) ? -1 : 1;
    for (let i = 0; i < this._palette.length; i++){
      fill(this._palette[i][0]);
      cellHeight = this._proporationalRanges[i] * _height;
      rect(x, currentY - cellHeight, _width, cellHeight);
      currentY += cellHeight * direction;
    }
  }

  // draw gradient
  drawGradient(x, y, _width, _height){
    if (this._gradientBuffer == undefined){
      this._renderGradient(_width, _height);
    }
    image(this._gradientBuffer, x, y);
  }

  _renderGradient(_width, _height){
    _width = Math.floor(_width);
    _height = Math.floor(_height);
    this._gradientBuffer = createImage(_width, _height);
    this._gradientBuffer.loadPixels();

    // Assumes vertical rendering
    let colorVal;
    for (let y = 0; y < _height; y += 1) {
      // Leaving for posterity: this was from my earlier ColorRamp() class
      // colorVal = this.getColorForValue(this.minValue + y * 1.0 / _height * this.rangeMagnitude);
      colorVal = paletteLerp(this._palette, this.minValue + y * 1.0 / _height * this.rangeMagnitude );

      for (let x = 0; x < _width; x += 1) {
        this._gradientBuffer.set(x, _height - y, colorVal);
      }
    }
    this._gradientBuffer.updatePixels();
  }

  drawBins(x,y,_width, _height, binCount, bottomUp = true){
    noStroke();
    let cellHeight = _height / binCount;
    let currentY = (bottomUp) ? y + _height : y;
    const direction = (bottomUp) ? -1 : 1;

    let tmpColor;
    for (let i = 0; i < binCount; i++){
      tmpColor = paletteLerp(this._palette, this.minValue + (i + 0.5) / binCount * this.rangeMagnitude);
      
      fill(tmpColor);
      rect(x, currentY - cellHeight, _width, cellHeight);
      currentY += cellHeight * direction;
    }
  }

}