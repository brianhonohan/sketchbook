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

  get start(){ return {x: this.startX, y: this.startY }; }
  get end()  { return {x: this.endX,   y: this.endY }; }

  isMouseOverPoint(x, y){
    return dist(x, y, mouseX, mouseY) < 10;
  }

  handleMousePressed(){
    this.draggingStart = this.isMouseOverPoint(this.startX, this.startY);
    this.draggingEnd = !this.draggingStart && this.isMouseOverPoint(this.endX, this.endY);
  }

  handleMouseDragged(){
    if (this.draggingStart){
      this.startX = mouseX;
      this.startY = mouseY;
    }

    if (this.draggingEnd){
      this.endX = mouseX;
      this.endY = mouseY;
    }
  }

  handleMouseReleased(){
    this.draggingStart = false;
    this.draggingEnd = false;
  }

  draw(){
    line(this.startX, this.startY, this.endX, this.endY);
  }

  drawDraggablePoints(){
    this.drawPointAt(this.startX, this.startY);
    this.drawPointAt(this.endX, this.endY);
  }

  drawPointAt(x, y){
    if (this.isMouseOverPoint(x, y)){
      fill(200, 200, 100);
    }else {
      fill(100, 200, 100);
    }
    noStroke();
    ellipse(x, y, 10, 10);
  }
}
