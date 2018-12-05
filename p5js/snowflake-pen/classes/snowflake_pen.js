class SnowflakePen {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.slope = Math.tan(2 * Math.PI / 12);
    this.prevX = null;
    this.prevY = null;
  }

  isPointInFirstSegment(x, y){
    // assumes Snowflakw has a segment pointing directly upward
    return x > this.x 
        && y < this.y
        && (x - this.x) < (this.y - y) * this.slope;
  }

  draw(){
    if (mouseIsPressed && this.isPointInFirstSegment(mouseX, mouseY)){
      if (this.prevX){
        line(this.prevX, this.prevY, mouseX, mouseY);
      }
      this.prevX = mouseX;
      this.prevY = mouseY;
    }else{
      this.prevX = null;
      this.prevY = null;
    }
  }
}
