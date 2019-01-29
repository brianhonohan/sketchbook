class FriezePen {
  constructor(sizeAndPos){
    this.area = sizeAndPos;
    this.currentTile = sizeAndPos.copy();
    this.numCols = this.calcNumTilesWide();

    this.pos = createVector(0, 0);
    this.prevPos = createVector(0, 0);
    this.transforms = [FriezePen.TRANSFORM_VERTICAL_FLIP, 
                       FriezePen.TRANSFORM_TRANSLATION];
  }

  get x(){ return this.area.x; }
  get y(){ return this.area.y; }
  get width(){ return this.area.width; }
  get height(){ return this.area.height; }

  static get TRANSFORM_TRANSLATION() { return 't'; }
  static get TRANSFORM_VERTICAL_FLIP() { return 'v'; }

  calcNumTilesWide(){
    const allowedWidth = width - 2 * this.x;
    const numCols = Math.floor(allowedWidth / this.width);
    return numCols;
  }

  resetPen(){
    this.currentTile = this.area.copy();
    this.pos.set(mouseX, mouseY);
    this.prevPos.set(pmouseX, pmouseY);
  }

  drawRepeatedly(){
    this.resetPen();

    this.drawTranslations();
    this.drawHorizReflection();
    // this.drawVerticalRelectionTranslations();
    this.resetPen();
  }

  applyTransforms(){
    this.transforms.forEach(t => this.applyTransform(t));
  }

  applyTransform(transformId){
    switch(transformId){
      case FriezePen.TRANSFORM_TRANSLATION: 
        this.applyTranslation();
        return;
      case FriezePen.TRANSFORM_VERTICAL_FLIP: 
        this.applyVerticalFlip();
        return;
    }
  }

  applyVerticalFlip(){
    this.applyVerticalReflection(this.currentTile.centerX);
  }

  applyVerticalReflection(aboutX){
    this.pos.x += 2 * (aboutX - this.pos.x);
    this.prevPos.x += 2 * (aboutX - this.prevPos.x);
  }

  applyHorizontalReflection(aboutY){
    this.pos.y += 2 * (aboutY - this.pos.y);
    this.prevPos.y += 2 * (aboutY - this.prevPos.y);
  }

  applyTranslation(){
    this.currentTile.move(this.width, 0);
    this.pos.x += this.width;
    this.prevPos.x += this.width;
  }

  drawHorizReflection(){
    this.resetPen();

    this.applyHorizontalReflection(this.area.maxY);
    this.drawTranslations();
  }

  drawTranslations(){
    for (var i = 0; i < this.numCols; i++){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
      this.applyTransforms();
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