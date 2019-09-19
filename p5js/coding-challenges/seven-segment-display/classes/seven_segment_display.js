class SevenSegmentDisplay {
  constructor(sizeAndPosition){
    this.sizeAndPosition = sizeAndPosition;
    this.value = 0;
    this.calcDimensions();
    this.initColors();
    this.initBitFlags();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get maxX(){ return this.sizeAndPosition.maxX; }
  get maxY(){ return this.sizeAndPosition.maxY; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  setValue(newValue){
    if (this.flagsForValue(newValue) != undefined){
      this.value = newValue;
    }
  }

  calcDimensions(){
    this.horizBarWidth  = this.width  * 0.8;
    this.horizBarHeight = this.height * 0.1;
    this.vertBarWidth   = this.width  * 0.1;
    this.vertBarHeight  = this.height * 0.35;
  }

  initColors(){
    this.colors = {
      on: color(200, 50, 50),
      off: color(40, 20, 20),
    };
  }

  initBitFlags(){
    this.bitFlags = {
      digits: [
        [1, 1, 1, 1, 1, 1, 0], // 0
        [0, 1, 1, 0, 0, 0, 0], // 1
        [1, 1, 0, 1, 1, 0, 1], // 2
        [1, 1, 1, 1, 0, 0, 1], // 3
        [0, 1, 1, 0, 0, 1, 1], // 4
        [1, 0, 1, 1, 0, 1, 1], // 5
        [1, 0, 1, 1, 1, 1, 1], // 6
        [1, 1, 1, 0, 0, 0, 0], // 7
        [1, 1, 1, 1, 1, 1, 1], // 8
        [1, 1, 1, 1, 0, 1, 1], // 9
      ]
    }
  }

  flagsForValue(value){
    if (value >= 0 && value <= 9){
      return this.bitFlags.digits[value];
    }
    return undefined;
  }

  draw(){
    noStroke();
    let flags = this.flagsForValue(this.value);

    this.drawSegmentA(flags[0]);
    this.drawSegmentB(flags[1]);
    this.drawSegmentC(flags[2]);
    this.drawSegmentD(flags[3]);
    this.drawSegmentE(flags[4]);
    this.drawSegmentF(flags[5]);
    this.drawSegmentG(flags[6]);
  }

  fillForStatus(status){
    if (status) { 
      fill(this.colors.on);
    } else {
      fill(this.colors.off);
    }
  }

  drawSegmentA(status){
    this.fillForStatus(status);
    rect(this.x + this.vertBarWidth, this.y, 
         this.horizBarWidth, this.horizBarHeight);
  }

  drawSegmentB(status){
    this.fillForStatus(status);
    rect(this.maxX - this.vertBarWidth, this.y + this.horizBarHeight, 
         this.vertBarWidth, this.vertBarHeight);
  }

  drawSegmentC(status){
    this.fillForStatus(status);
    rect(this.maxX - this.vertBarWidth, this.maxY - this.vertBarHeight - this.horizBarHeight, 
         this.vertBarWidth, this.vertBarHeight);
  }

  drawSegmentD(status){
    this.fillForStatus(status);
    rect(this.x + this.vertBarWidth, this.maxY - this.horizBarHeight, 
         this.horizBarWidth, this.horizBarHeight);
  }

  drawSegmentE(status){
    this.fillForStatus(status);
    rect(this.x, this.maxY - this.vertBarHeight - this.horizBarHeight, 
         this.vertBarWidth, this.vertBarHeight);
  }

  drawSegmentF(status){
    this.fillForStatus(status);
    rect(this.x, this.y + this.horizBarHeight, 
         this.vertBarWidth, this.vertBarHeight);
  }

  drawSegmentG(status){
    this.fillForStatus(status);
    rect(this.x + this.vertBarWidth, this.y + this.vertBarHeight + this.horizBarHeight, 
         this.horizBarWidth, this.horizBarHeight);
  }
}
