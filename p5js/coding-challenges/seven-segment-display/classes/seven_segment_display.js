class SevenSegmentDisplay {
  constructor(sizeAndPosition){
    this.sizeAndPosition = sizeAndPosition;
    this.value = 0;
    this.calcDimensions();
    this.initColors();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get maxX(){ return this.sizeAndPosition.maxX; }
  get maxY(){ return this.sizeAndPosition.maxY; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

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

  draw(){
    noStroke();
    this.drawSegmentA(true);
    this.drawSegmentB(true);
    this.drawSegmentC(true);
    this.drawSegmentD(true);
    this.drawSegmentE(true);
    this.drawSegmentF(true);
    this.drawSegmentG(true);
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
