class LineSegment {
  float startX;
  float startY;
  float endX;
  float endY;

  LineSegment(float x1, float y1, float x2, float y2){
    this.startX = x1;
    this.startY = y1;
    this.endX   = x2;
    this.endY   = y2;
  }

  float dx() { return this.endX - this.startX; }
  float dy() { return this.endY - this.startY; }
  float slope() { return this.dy() / this.dx(); }

  Line getLine(){
    float slope = this.slope();
    if (slope == Float.POSITIVE_INFINITY || slope == Float.NEGATIVE_INFINITY){
      return new VerticalLine(this.startX);
    } else if (slope == 0){
      return new HorizontalLine(this.startY);
    }

    Line line = new Line(slope);
    line.offset = this.startY + slope * (0 - this.startX);
    return line;
  }
}
