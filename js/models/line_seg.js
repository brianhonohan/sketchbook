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

  copy(){
    return new LineSeg(this.start.x, this.start.y, this.end.x, this.end.y);
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

  cacheOriginalPoints(){
    // Cache the original points so that we can restore them if needed
    this.originalStart = this.start.copy();
    this.originalEnd = this.end.copy();
  }

  scaleAboutCenter(scaleFactor, useCache = false){
    let center;
    let deltaX, deltaY;

    if (useCache) {
      center = new Point(
        (this.originalStart.x + this.originalEnd.x) / 2,
        (this.originalStart.y + this.originalEnd.y) / 2
      );
      deltaX = Math.abs(this.originalEnd.x - center.x) * scaleFactor;
      deltaY = Math.abs(this.originalEnd.y - center.y) * scaleFactor
    } else {
      center = this.centerPoint();
      deltaX = Math.abs(this.endX - center.x) * scaleFactor;
      deltaY = Math.abs(this.endY - center.y) * scaleFactor;
    }

    this.startX = center.x + deltaX * Math.sign(this.startX - center.x);
    this.startY = center.y + deltaY * Math.sign(this.startY - center.y);
    this.endX = center.x + deltaX * Math.sign(this.endX - center.x);
    this.endY = center.y + deltaY * Math.sign(this.endY - center.y);
  }

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
    return Math.sqrt( Math.pow(this.dx(), 2) + Math.pow(this.dy(), 2));
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

  // threshold is in pixel dimensions on same scale as x, y
  containsXY(x, y, threshold = 0.1){
    if (false == this.boundingRectContainsXY(x, y)){
      return false;
    }

    if (this.slope == Infinity || this.slope == -Infinity) {
      // already passed the 'rect' bounds check
      return true;
    } else if (Math.abs(this.slope) > 1) {
      const diffX = x - (this.startX + (y - this.startY) / this.slope);
      return Math.abs(diffX) < threshold;
    }

    const diffY = y - (this.startY + (x - this.startX) * this.slope);
    return Math.abs(diffY) < threshold;

    // Too precise, and doesn't lend itself to intuitive threshold
    // const slopeToXY = (y - this.startY) / (x - this.startX);
    // return (threshold > (Math.abs(slopeToXY - this.slope)));    
  }
  
  boundingRectContainsXY(x, y){
    return  Rect.pointsContainXY(this.startX, this.startY,
                                        this.endX, this.endY, 
                                        x, y);
  }

  intersects(otherLineSegment){
    const coord = Line.intersectionPoint(this.getLine(), otherLineSegment.getLine());
    return !(coord == undefined);
  }

  intersectionPoint(otherLineSegment, onThisLineOnly = true, onOtherLineOnly = true){
    const coord = Line.intersectionPoint(this.getLine(), otherLineSegment.getLine());
    if (coord == undefined) {
      return undefined;
    }

    if (onThisLineOnly && !this.boundingRectContainsXY(coord.x, coord.y)){
      return undefined;
    }

    if (onOtherLineOnly && !otherLineSegment.boundingRectContainsXY(coord.x, coord.y)){
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
