class LineSegment {
  constructor(x1, y1, x2, y2){
    this.startX = x1;
    this.startY = y1;
    this.endX   = x2;
    this.endY   = y2;
  }

  translate(x, y){
    this.startX += x;
    this.startY += y;
    this.endX   += x;
    this.endY   += y;
  }

  draw(){
    line(this.startX, this.startY, this.endX, this.endY);
  }
}
