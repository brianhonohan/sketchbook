class LineSegment {
  float startX;
  float startY;
  float endX;
  float endY;
  
  // for Mouse Interactions
  boolean draggingStart;
  boolean draggingEnd;

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
  
  PVector getVector(){
    return new PVector(this.dx(), this.dy());
  }
  
  boolean isMouseOverPoint(float x, float y){
    return dist(x, y, mouseX, mouseY) < 10;
  }

  void handleMousePressed(){
    this.draggingStart = this.isMouseOverPoint(this.startX, this.startY);
    this.draggingEnd = !this.draggingStart && this.isMouseOverPoint(this.endX, this.endY);
  }

  void handleMouseDragged(){
    if (this.draggingStart){
      this.startX = mouseX;
      this.startY = mouseY;
    }

    if (this.draggingEnd){
      this.endX = mouseX;
      this.endY = mouseY;
    }
  }

  void handleMouseReleased(){
    this.draggingStart = false;
    this.draggingEnd = false;
  }

  void draw(){
    line(this.startX, this.startY, this.endX, this.endY);
  }

  void drawDraggablePoints(){
    this.drawPointAt(this.startX, this.startY);
    this.drawPointAt(this.endX, this.endY);
  }

  void drawPointAt(float x, float y){
    if (this.isMouseOverPoint(x, y)){
      fill(200, 200, 100);
    }else {
      fill(100, 200, 100);
    }
    noStroke();
    ellipse(x, y, 10, 10);
  }
}
