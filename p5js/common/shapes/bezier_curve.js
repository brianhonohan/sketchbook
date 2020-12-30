class BezierCurve {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4){
    this.p1 = new Point(x1, y1);
    this.p2 = new Point(x2, y2);
    this.p3 = new Point(x3, y3);
    this.p4 = new Point(x4, y4);
    this.initPoints();
  }

  move(x, y){
    this.points.forEach(p => p.move(x, y));
  }

  rotateAbout(a, b, c){
    this.points.forEach(p => p.rotateAbout(a, b, c));
  }

  initPoints(){
    this.points = [];
    this.points.push(this.p1);
    this.points.push(this.p2);
    this.points.push(this.p3);
    this.points.push(this.p4);
  }

  attachHeadTo(curve){
    this.p1 = curve.p4;
    this.points.shift();
  }

  attachTailTo(curve){
    this.p4 = curve.p1;
    this.points.pop();
  }

  makeLinear(){
    this.p2.set(this.p1.x, this.p1.y);
    this.p3.set(this.p4.x, this.p4.y);
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
    } else {
      noFill();
    }
    if (this.strokeColor) {
      stroke(this.strokeColor);
    } else {
      stroke(255);
    }
    bezier(this.p1.x, this.p1.y,
           this.p2.x, this.p2.y,
           this.p3.x, this.p3.y,
           this.p4.x, this.p4.y);

    if (this.dragEnabled) {
      this.drawGuideLines();
      this.drawDraggablePoints();
    }
  }

  drawGuideLines(){
    stroke(100, 200, 100);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    line(this.p4.x, this.p4.y, this.p3.x, this.p3.y);
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