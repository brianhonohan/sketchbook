class FriezePen {
  constructor(sizeAndPos){
    this.setDrawableArea(sizeAndPos);
    this.transforms = [
                       FriezePen.TRANSFORM_VERTICAL_FLIP,
                       FriezePen.TRANSFORM_HORIZONTAL_FLIP,
                       FriezePen.TRANSFORM_TRANSLATION];
    this.shouldDrawHorizReflection = true;

    this.clear();
  }

  clear(){
    this.history = [];
    this.undoneHistory = [];
    this.currentPenPath = [];
    this.pathCursor = 0;
    this.pointCursor = 0;

    // strokeWight history
    this.swHistory = [];
    this.swUndoHistory = [];
  }

  get x(){ return this.area.x; }
  get y(){ return this.area.y; }
  get width(){ return this.area.width; }
  get height(){ return this.area.height; }

  static get TRANSFORM_TRANSLATION() { return 't'; }
  static get TRANSFORM_VERTICAL_FLIP() { return 'v'; }
  static get TRANSFORM_HORIZONTAL_FLIP() { return 'z'; }

  static get VALID_TRANSFORMS() {
    return [
            FriezePen.TRANSFORM_VERTICAL_FLIP,
            FriezePen.TRANSFORM_HORIZONTAL_FLIP,
            FriezePen.TRANSFORM_TRANSLATION
           ];
  }

  setStrokeWeight(_strokeWeight){
    this.currentStrokeWeight = _strokeWeight;
  }

  setDrawableArea(sizeAndPos){
    this.area = sizeAndPos;
    this.currentTile = sizeAndPos.copy();
    this.numCols = this.calcNumTilesWide();

    this.pos = createVector(0, 0);
    this.prevPos = createVector(0, 0);
  }

  setTransform(transformAsStr){
    this.transforms = transformAsStr.split('');
    this.transforms.filter(t => FriezePen.VALID_TRANSFORMS.includes(t));
  }

  calcNumTilesWide(){
    const allowedWidth = width - 2 * this.x;
    const numCols = Math.floor(allowedWidth / this.width);
    return numCols;
  }

  resetPen(){
    this.currentTile = this.area.copy();
    this.pos.set(this.currentX(), this.currentY());
    this.prevPos.set(this.prevX(), this.prevY());
  }

  currentX(){
    return this.history[this.pathCursor][this.pointCursor][0];
  }
  currentY(){
    return this.history[this.pathCursor][this.pointCursor][1];
  }
  prevX(){
    return this.history[this.pathCursor][this.pointCursor-1][0];
  }
  prevY(){
    return this.history[this.pathCursor][this.pointCursor-1][1];
  }

  drawRepeatedly(){
    if (this.pointCursor == 0) { return; }
    this.resetPen();

    this.drawTranslations();
    if (this.shouldDrawHorizReflection) {
      this.drawHorizReflection();
    }
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
      case FriezePen.TRANSFORM_HORIZONTAL_FLIP: 
        this.applyHorizontalFlip();
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

  applyHorizontalFlip(){
    this.applyHorizontalReflection(this.currentTile.centerY);
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
    this.currentTile.move(0, this.height);
    this.drawTranslations();
  }

  drawTranslations(){
    for (var i = 0; i < this.numCols; i++){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
      this.applyTransforms();
    }
  }

  draw(){
    this.renderUndrawnPoints();
  }

  renderUndrawnPoints(){
    if (this.hasPointsToRender() == false){
      return;
    }
    stroke(230);
    strokeWeight(this.swHistory[this.pathCursor]);
    while(this.hasPointsToRender()){
      this.drawRepeatedly();
      this.stepToNextPoint();
    }
  }

  hasPointsToRender(){
    return this.history.length > 0 
          && (
            (this.pointCursor < (this.history[this.pathCursor].length - 1)
              && this.history[this.pathCursor].length > 1)
            || this.pathCursor < (this.history.length - 1)
          );
  }

  stepToNextPoint(){
    if (this.pointCursor < (this.history[this.pathCursor].length - 1)){
      this.pointCursor++;
      return;
    }

    if (this.pathCursor < (this.history.length - 1)){
      this.pathCursor++;
      strokeWeight(this.swHistory[this.pathCursor]);
      this.pointCursor = 0;
    }
  }

  flagForRedraw(){
    this.pathCursor = 0;
    this.pointCursor = 0; 
  }

  startDrawing(){
    if (this.area.containsXY(mouseX, mouseY) == false){
      return;
    }
    this.currentPenPath = [];
    this.history.push(this.currentPenPath);
    this.swHistory.push(this.currentStrokeWeight);
    this.undoneHistory = [];
    this._captureMousePoint();
  }

  _captureMousePoint(){
    if (this.area.containsXY(mouseX, mouseY) == false){
      return;
    }
    this.currentPenPath.push([mouseX, mouseY]);
  }

  handleMouseDrag(){
    this._captureMousePoint();
  }

  stopDrawing(){
    //
  }

  undo(){
    if (this.history.length == 0) {
      return false;
    }
    this.undoneHistory.push(this.history.pop());
    this.swUndoHistory.push(this.swHistory.pop());
    this.flagForRedraw();
    return true;
  }

  redo(){
    if (this.undoneHistory.length == 0) { 
      return false; 
    }
    this.history.push(this.undoneHistory.pop());
    this.swHistory.push(this.swUndoHistory.pop());
    this.flagForRedraw();
    return true;
  }
}