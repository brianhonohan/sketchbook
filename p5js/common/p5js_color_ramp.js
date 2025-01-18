class P5jsColorRamp {
  static get RANGE_MODE_NORMALIZED() { return 1; }
  static get RANGE_MODE_MIN_MAX() { return 2; }

  static get SPACING_MODE_UNIFORM() { return 1; }
  static get SPACING_MODE_BREAKPOINTS() { return 2; }

  static elevation(){
    const _newRamp = new P5jsColorRamp();
    _newRamp.setRange(-1,1);
    _newRamp.setColors(
      [
        {color: color(0,20,80), breakpoint: _newRamp.minValue},
        {color: color(20,130,190), breakpoint: 0},
        {color: color(20,100,40), breakpoint: 0},
        {color: color(180,190,120), breakpoint: 0.6 * _newRamp.maxValue},
        {color: color(255, 255, 255), breakpoint: _newRamp.maxValue}
      ]
    );

    return _newRamp;
  }

  constructor(range_mode, spacing_mode){
    this.rangeMode = range_mode || P5jsColorRamp.RANGE_MODE_NORMALIZED;
    this.spacingMode = spacing_mode|| P5jsColorRamp.SPACING_MODE_UNIFORM;
    this.colors = [];
    this.breakpoints = [];
    this.minValue = 0;
    this.maxValue = 1;

    return this;
  }

  // This should be set before setting breakpoints
  setRange(minValue, maxValue){
    this.rangeMode = P5jsColorRamp.RANGE_MODE_MIN_MAX;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  get rangeMagnitude(){ return this.maxValue - this.minValue; }


  // Accept multiple forms 
  // Color Format: p5.js colors, hex-codes (with,without #)
  setColors(colors){
    if(colors == undefined){ return; }

    if (typeof colors === 'string' || colors instanceof String){
      this._parseStringColors(colors);
      return this;
    }

    if (colors.constructor !== Array){ return; }

    this.colorCount = colors.length;
    for(let i = 0; i<this.colorCount; i++){
      this.colors.push(colors[i].color);

      if(colors[i].breakpoint != undefined){
        this.rangeMode = P5jsColorRamp.RANGE_MODE_MIN_MAX;
        this.spacingMode = P5jsColorRamp.SPACING_MODE_BREAKPOINTS;
        this.breakpoints.push(colors[i].breakpoint);
        this.minValue = min(this.minValue || Number.MAX_VALUE, colors[i].breakpoint);
        this.maxValue = max(this.maxValue || Number.MIN_VALUE, colors[i].breakpoint);
      }
    }
    if (this.spacingMode == P5jsColorRamp.SPACING_MODE_BREAKPOINTS){
      this._computeProporationalRanges();
    }
    return this;
  }

  _computeProporationalRanges(){
    this._proporationalRanges = [];

    if (this.spacingMode == P5jsColorRamp.SPACING_MODE_UNIFORM){
      this._proporationalRanges.fill(1.0 / this.colorCount, 0, this.colorCount);
    }

    for (let i = 0; i < this.colorCount; i++){
      let rangeBefore = (i == 0) ? 0 : (this.breakpoints[i] -this.breakpoints[i-1]) / 2.0;
      let rangeAfterBP = (i == this.colorCount - 1) ? 0 : (this.breakpoints[i+1] - this.breakpoints[i]) / 2.0;
      this._proporationalRanges[i] = (rangeAfterBP + rangeBefore) / this.rangeMagnitude;
    }
  }

  _parseStringColors(colors_string){
    
  }

  // addColor(color, breakpoint){ }

  getColorForValue(value){
    if(value < this.minValue){
      return this.colors[0];
    }

    for (let i = 1; i < this.colorCount; i++){
      if (value < this.breakpoints[i]){
        const normalizedInRange = norm(value, this.breakpoints[i-1], this.breakpoints[i]);
        return lerpColor(this.colors[i-1], this.colors[i], normalizedInRange);
      }
    }
    return this.colors[this.colorCount-1];
  }


  draw(x,y,_width, _height, smooth = false){
    if (smooth == true){
      this._drawGradient(x,y,_width,_height);
      return;
    }

    noStroke();
    let cellHeight;
    let currentY = y + _height;
    for (let i = 0; i < this.colorCount; i++){
      fill(this.colors[i]);
      cellHeight = this._proporationalRanges[i] * _height;
      rect(x, currentY - cellHeight, _width, cellHeight);

      currentY -= cellHeight;
    }
  }

  _drawGradient(x,y,_width, _height){
    if (this._gradientBuffer == undefined){
      this._renderGradient(_width, _height);
    }
    image(this._gradientBuffer, x, y);
  }

  _renderGradient(_width, _height){
    this._gradientBuffer = createImage(_width, _height);
    this._gradientBuffer.loadPixels();

    // Assumes vertical rendering
    let colorVal;
    for (let y = 0; y < _height; y += 1) {
      colorVal = this.getColorForValue(this.minValue + y * 1.0 / _height * this.rangeMagnitude);
      for (let x = 0; x < _width; x += 1) {
        this._gradientBuffer.set(x, _height - y, colorVal);
      }
    }
    this._gradientBuffer.updatePixels();
  }
}