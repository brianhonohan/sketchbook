class LineSeg {
  constructor(x1, y1, x2, y2){
    if (typeof x1 == "object" && typeof y1){
      this.start = x1;
      this.end = y1;
    } else {
      this.start = new Vector2D(x1, y1);
      this.end = new Vector2D(x2, y2);
    }
  }

  set startX(val) { this.start.x = val; }
  set startY(val) { this.start.y = val; }
  set endX(val) { this.end.x = val; }
  set endY(val) { this.end.y = val; }
  get startX() { return this.start.x; }
  get startY() { return this.start.y; }
  get endX() { return this.end.x; }
  get endY() { return this.end.y; }

  // So that it can be used as a Rect
  get x() { return Math.min(this.startX, this.endX); }
  get y() { return Math.min(this.startY, this.endY); }
  get width() { return Math.abs(this.endX - this.startX); }
  get height() { return Math.abs(this.endY - this.startY); }

  dx() { return this.endX - this.startX; }
  dy() { return this.endY - this.startY; }
  get slope() { return this.dy() / this.dx(); }

  centerX() { return (this.start.x + this.end.x) / 2; }
  centerY() { return (this.start.y + this.end.y) / 2; }
  centerPoint() { return new Vector2D(this.centerX(), this.centerY()); }
  boundingRect(){ return new Rect(this.x, this.y, this.width, this.width); }

  get offset() {
    if (this.slope == Infinity) {
      return undefined;
    }
    return this.startY + this.slope * (0 - this.startX);
  }

  asVector(){
    return createVector(this.end.x - this.start.x,
                          this.end.y - this.start.y);
  }

  getLength(){
    return Math.sqrt( Math.pow(this.dx(), 2), Math.pow(this.dy(), 2));
  }

  setLength(newValue){
    let delta = this.asVector();
    delta.setMag(newValue);
    this.end.x = this.start.x + delta.x;
    this.end.y = this.start.y + delta.y;
  }

  getLine(){
    let slope = this.slope;
    if (slope == Infinity || slope == -Infinity){
      return new VerticalLine(this.startX);
    } else if (slope == 0){
      return new HorizontalLine(this.startY);
    }

    let line = new Line(slope);
    line.offset = this.startY + slope * (0 - this.startX);
    return line;
  }

  intersectionPoint(otherLineSegment){
    const coord = Line.intersectionPoint(this.getLine(), otherLineSegment.getLine());
    if (coord == undefined) {
      return undefined;
    }

    // TODO: consider implemented lineSegment.containsXY() 
    // only true if the line is along the segment (not beyond its bounds)
    const inThisBounds = Rect.pointsContainXY(this.startX, this.startY,
                                      this.endX, this.endY, 
                                      coord.x, coord.y);
    if (!inThisBounds){
      return undefined;
    }

    const inOtherBounds = Rect.pointsContainXY(otherLineSegment.startX, otherLineSegment.startY,
                                      otherLineSegment.endX, otherLineSegment.endY, 
                                      coord.x, coord.y);
    if (!inOtherBounds){
      return undefined;
    }
    return coord;
  }

  translate(x, y){
    this.start.move(x, y);
    this.end.move(x, y);
  }

  rotate90AroundStart(){
    let deltaX = this.dx();
    let deltaY = this.dy();

    this.end.x = this.start.x - deltaY;
    this.end.y = this.start.y + deltaX;
  }

  rotate180(){
    const tempX = this.start.x;
    const tempY = this.start.y;

    this.start.x = this.end.x;
    this.start.y = this.end.y;

    this.end.x = tempX;
    this.end.y = tempY;
    return this;
  }
}
