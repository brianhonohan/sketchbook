class FriezePen {
  constructor(sizeAndPos){
    this.area = sizeAndPos;
    this.numCols = this.calcNumTilesWide();

    this.pos = createVector(0, 0);
    this.prevPos = createVector(0, 0);
  }

  get x(){ return this.area.x; }
  get y(){ return this.area.y; }
  get width(){ return this.area.width; }
  get height(){ return this.area.height; }

  calcNumTilesWide(){
    const allowedWidth = width - 2 * this.x;
    const numCols = Math.floor(allowedWidth / this.width);
    return numCols;
  }

  drawRepeatedly(){
    this.pos.set(mouseX, mouseY);
    this.prevPos.set(pmouseX, pmouseY);

    for (var i = 0; i < this.numCols; i++){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);

      this.pos.x += this.width;
      this.prevPos.x += this.width;
    }
    this.drawHorizReflection();
  }

  drawHorizReflection(){
    this.pos.set(mouseX, mouseY);
    this.prevPos.set(pmouseX, pmouseY);

    this.pos.y += 2 * (this.area.maxY - this.pos.y);
    this.prevPos.y += 2 * (this.area.maxY - this.prevPos.y);

    for (var i = 0; i < this.numCols; i++){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);

      this.pos.x += this.width;
      this.prevPos.x += this.width;
    }
  }

  draw(){
    if (mouseIsPressed && this.area.containsXY(mouseX, mouseY)){
      if (this.penWasDown){
        stroke(230);
        this.drawRepeatedly();
      }
      this.penWasDown = true;
    } else{
      this.penWasDown = false;
    }
  }
}