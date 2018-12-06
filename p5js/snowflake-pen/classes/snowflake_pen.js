class SnowflakePen {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.prevPos = createVector(0, 0);
    this.penWasDown = false;
    this.numSlices = 6;
    this.rotationPerSlice = 2 * Math.PI / this.numSlices;
    this.halfRotation = this.rotationPerSlice / 2;
    this.slope = Math.tan(this.halfRotation);
    this.sliceBisector = new Line(this.slope, 0);
  }

  isPointInFirstSegment(x, y){
    // assumes Snowflakw has a segment pointing directly upward
    return x > this.x 
        && y < this.y
        && (x - this.x) < (this.y - y) * this.slope;
  }

  drawRepeatedly(newX, newY){
    let penLocation = createVector(newX - this.x, newY - this.y);
    let reflectedPenLoc = this.sliceBisector.reflectPoint(penLocation);
    let reflectedPrevLoc = this.sliceBisector.reflectPoint(this.prevPos);

    for(var i = 0; i < this.numSlices; i++){
      line(this.prevPos.x, this.prevPos.y, penLocation.x, penLocation.y);

      penLocation.rotate(this.rotationPerSlice);
      this.prevPos.rotate(this.rotationPerSlice);
    }

    this.prevPos.rotate(this.rotationPerSlice);

    let reflectedPenVector = createVector(reflectedPenLoc.x, reflectedPenLoc.y);
    let reflectedPrevector = createVector(reflectedPrevLoc.x, reflectedPrevLoc.y);

    for(var i = 0; i < this.numSlices; i++){
      line(reflectedPrevector.x, reflectedPrevector.y, reflectedPenVector.x, reflectedPenVector.y);

      reflectedPenVector.rotate(this.rotationPerSlice);
      reflectedPrevector.rotate(this.rotationPerSlice);
    }
  }

  draw(){
    push();
    translate(this.x, this.y);

    if (mouseIsPressed && this.isPointInFirstSegment(mouseX, mouseY)){
      if (this.penWasDown){
        this.drawRepeatedly(mouseX, mouseY);
      }
      this.penWasDown = true;
      this.prevPos.x = mouseX - this.x;
      this.prevPos.y = mouseY - this.y;
    }else{
      this.penWasDown = false;
    }

    pop();
  }
}
