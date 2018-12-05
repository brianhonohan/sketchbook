class SnowflakePen {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.slope = Math.tan(2 * Math.PI / 12);
    this.prevPos = createVector(0, 0);
    this.penWasDown = false;
  }

  isPointInFirstSegment(x, y){
    // assumes Snowflakw has a segment pointing directly upward
    return x > this.x 
        && y < this.y
        && (x - this.x) < (this.y - y) * this.slope;
  }

  draw(){
    if (mouseIsPressed && this.isPointInFirstSegment(mouseX, mouseY)){
      if (this.penWasDown){
        line(this.prevPos.x, this.prevPos.y, mouseX, mouseY);
      }
      this.penWasDown = true;
      this.prevPos.x = mouseX;
      this.prevPos.y = mouseY;
    }else{
      this.penWasDown = false;
    }
  }
}
