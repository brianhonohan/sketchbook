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
  
  static terrainAspect(){
    const _newRamp = new P5jsColorRamp();
    _newRamp.setRange(-1,360);
    _newRamp.setColors(
      [
        {color: color(150, 150, 150), breakpoint: _newRamp.minValue},
        {color: color(150, 150, 150), breakpoint: 0},
        {color: color(220, 0, 0), breakpoint: 0},
        {color: color(220, 110, 0), breakpoint: 45},
        {color: color(220, 220, 0), breakpoint: 90},
        {color: color(0, 220, 0), breakpoint: 135},
        {color: color(0, 220, 220), breakpoint: 180},
        {color: color(0, 180, 180), breakpoint: 225},
        {color: color(0, 0, 160), breakpoint: 270},
        {color: color(220, 0, 220), breakpoint: 315},
        {color: color(230, 0, 0), breakpoint: _newRamp.maxValue}
      ]
    );
    return _newRamp;
  }

  static visibleSpectrum(){
    const _newRamp = new P5jsColorRamp();
    _newRamp.setRange(380,750);

    // Numbers pulled from: https://en.wikipedia.org/wiki/Visible_spectrum
    // with breakpoints set at the min-points of the wavelength ranges
    _newRamp.setColors(
      [
        {color: color(0,0,0), breakpoint: _newRamp.minValue},
        {color: color(200,0,200), breakpoint: 415},
        {color: color(0,0,230), breakpoint: 466.5},
        {color: color(0,230,230), breakpoint: 492},
        {color: color(0,230,0), breakpoint: 532.5},
        {color: color(230, 230, 0), breakpoint: 577.5},
        {color: color(230, 115, 0), breakpoint: 607.5},
        {color: color(220,0,0), breakpoint: 687.5},
        {color: color(0,0,0), breakpoint: _newRamp.maxValue},
      ]
    );
    return _newRamp;
  }

  static visibleSpectrum(){
    const _newRamp = new P5jsColorRamp();
    _newRamp.setRange(380,750);

    // Numbers pulled from: https://en.wikipedia.org/wiki/Visible_spectrum
    // with breakpoints set at the min-points of the wavelength ranges
    _newRamp.setColors(
      [
        {color: color(0,0,0), breakpoint: _newRamp.minValue},
        {color: color(200,0,200), breakpoint: 415},
        {color: color(0,0,230), breakpoint: 466.5},
        {color: color(0,230,230), breakpoint: 492},
        {color: color(0,230,0), breakpoint: 532.5},
        {color: color(230, 230, 0), breakpoint: 577.5},
        {color: color(230, 115, 0), breakpoint: 607.5},
        {color: color(220,0,0), breakpoint: 687.5},
        {color: color(0,0,0), breakpoint: _newRamp.maxValue},
      ]
    );
    return _newRamp;
  }

  static temperatureScale(){
    const _newRamp = new P5jsColorRamp();
    _newRamp.setRange(-50,50);

    // Based on Celsius scale
    _newRamp.setColors(
      [
        {color: color(120,0,120), breakpoint: _newRamp.minValue},
        {color: color(200,0,200), breakpoint: -35},
        {color: color(0,0,200), breakpoint: -22},
        {color: color(0,230,230), breakpoint: -10},
        {color: color(230,230,230), breakpoint: 0},
        {color: color(0,230,0), breakpoint: 7},
        {color: color(230, 230, 0), breakpoint: 12},
        {color: color(230, 115, 0), breakpoint: 30},
        {color: color(180,0,0), breakpoint: 40},
        {color: color(150,0,0), breakpoint: _newRamp.maxValue},
      ]
    );
    return _newRamp;
  }

  static colorColors(){
    const _newRamp = new P5jsColorRamp();
    _newRamp.setRange(0,1);

    _newRamp.setColors(
      [
        {color: color(50, 200, 50)},
        {color: color(50, 200, 200)},
        {color: color(50, 50, 200)},
        {color: color(200, 50, 200)},
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

  setRange(minValue, maxValue){
    this.rangeMode = P5jsColorRamp.RANGE_MODE_MIN_MAX; 

    let oldRange = this.rangeMagnitude;
    let oldMin = this.minValue;


    this.minValue = minValue;
    this.maxValue = maxValue;

    if (oldRange == undefined){
      return;
    }

    const newRange = this.rangeMagnitude;
    
    for (let i = 0; i < this.breakpoints.length; i++){
      let oldBP = this.breakpoints[i];
      this.breakpoints[i] = this.minValue + (oldBP - oldMin) / oldRange * newRange;
    }
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
    this.colors = [];
    this.breakpoints = [];

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

    if (this.spacingMode == P5jsColorRamp.SPACING_MODE_UNIFORM){
      const bpStepSize = this.rangeMagnitude / (this.colorCount - 1);
      for(let i = 0; i<this.colorCount; i++){
        this.breakpoints[i] = i * bpStepSize;
      }
    }

    this._computeProporationalRanges();
    return this;
  }

  _computeProporationalRanges(){
    this._proporationalRanges = [];
    this._proporationalRanges.length = this.colorCount;

    for (let i = 0; i < this.colorCount; i++){
      let rangeBefore = (i == 0) ? 0 : (this.breakpoints[i] -this.breakpoints[i-1]) / 2.0;
      let rangeAfterBP = (i == this.colorCount - 1) ? 0 : (this.breakpoints[i+1] - this.breakpoints[i]) / 2.0;
      this._proporationalRanges[i] = (rangeAfterBP + rangeBefore) / this.rangeMagnitude;
    }
  }

  _parseStringColors(colors_string){
    
  }

  setBinCount(numberOfBins){
    this.binCount = numberOfBins;
    this.binnedColors = [];
    this.binStepSize = this.rangeMagnitude / numberOfBins;
    for(let i = 0; i < numberOfBins; i++){
      this.binnedColors.push(this.getColorForValue(this.minValue + this.binStepSize * i));
    }
    return this.binnedColors;
  }

  getColorForBin(binNumber){
    return this.binnedColors[binNumber];
  }

  getBinnedColorForValue(value){
    if (value <= this.minValue) { return this.getColorForBin(0); }
    if (value >= this.maxValue) { return this.getColorForBin(this.binCount - 1); }
    const binNumber = Math.floor((value - this.minValue)/this.binStepSize);
    return this.getColorForBin(binNumber);
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
    _width = Math.floor(_width);
    _height = Math.floor(_height);
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
  
  drawBins(x,y,_width, _height){
    noStroke();
    let cellHeight = _height / this.binCount;
    let currentY = y + _height;

    for (let i = 0; i < this.binCount; i++){
      fill(this.binnedColors[i]);
      rect(x, currentY - cellHeight, _width, cellHeight);
      currentY -= cellHeight;
    }
  }
}