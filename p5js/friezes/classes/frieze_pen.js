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

  resetPen(){
    this.pos.set(mouseX, mouseY);
    this.prevPos.set(pmouseX, pmouseY);
  }

  drawRepeatedly(){
    this.resetPen();

    this.drawTranslations();
    // this.drawHorizReflection();
    // this.drawVerticalRelectionTranslations();
  }

  drawVerticalRelectionTranslations(){
    this.resetPen();

    let xToReflectOver = this.area.maxX;

    for (var i = 0; i < this.numCols; i++){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);

      this.applyVerticalReflection(xToReflectOver);
      xToReflectOver += this.width;
    }
  }

  applyVerticalReflection(aboutX){
    this.pos.x += 2 * (aboutX - this.pos.x);
    this.prevPos.x += 2 * (aboutX - this.prevPos.x);
  }

  applyTranslation(){
    this.pos.x += this.width;
    this.prevPos.x += this.width;
  }

  drawHorizReflection(){
    this.resetPen();

    this.pos.y += 2 * (this.area.maxY - this.pos.y);
    this.prevPos.y += 2 * (this.area.maxY - this.prevPos.y);
    this.drawTranslations();
  }

  drawTranslations(){
    for (var i = 0; i < this.numCols; i++){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);

      this.applyTranslation();
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