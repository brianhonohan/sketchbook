class Triangle {
  constructor (x1, y1, x2, y2, x3, y3){
    this.p1 = new Point(x1, y1);
    this.p2 = new Point(x2, y2);
    this.p3 = new Point(x3, y3);

    this.dragEnabled = false;
    this.isDragged = false;

    this.fillColor = undefined;
    this.points = [this.p1, this.p2, this.p3];
  }

  handleMousePressed(){
    const pointPressed = this.points.find(p => p.containsXY(mouseX, mouseY));

    if (pointPressed){
      pointPressed.isBeingDragged = true;
      this.isDragged = true;
      return true;
    }
    return false;
  }

  handleMouseDragged(){
    const pointDragged = this.points.find(p => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(mouseX, mouseY);
    }
  }

  handleMouseReleased(){
    this.points.forEach(p => { p.isBeingDragged = false; });
    this.isDragged = false;
  }

  draw(){
    if (this.fillColor){
      fill(this.fillColor);
    }
    triangle(this.p1.x, this.p1.y,
             this.p2.x, this.p2.y,
             this.p3.x, this.p3.y);

    if (this.dragEnabled) {
      this.drawDraggablePoints();
    }
  }

  drawDraggablePoints(){
    this.points.forEach(p => this.drawPoint(p));
  }

  drawPoint(point){
    if (point.containsXY(mouseX, mouseY)){
      fill(200, 200, 100);
    }else {
      fill(100, 200, 100);
    }
    noStroke();
    ellipse(point.x, point.y, point.radius, point.radius);
  }
}