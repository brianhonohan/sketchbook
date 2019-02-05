class Rectangle extends Rect {
  constructor(x, y, p_nWidth, p_nHeight){
    super(x, y, p_nWidth, p_nHeight);
    this.initPoints();
    this.computePoints();
    this.dragEnabled = false;
  }

  initPoints(){
    this.topLeft      = new Point(0, 0);
    this.topRight     = new Point(0, 0);
    this.bottomRight  = new Point(0, 0);
    this.bottomLeft   = new Point(0, 0);

    this.points = [];
    this.points.push(this.topLeft);
    this.points.push(this.topRight);
    this.points.push(this.bottomRight);
    this.points.push(this.bottomLeft);
  }

  computePoints(){
    this.topLeft.set(this.minX, this.minY);
    this.topRight.set(this.maxX, this.minY);
    this.bottomRight.set(this.maxX, this.maxY);
    this.bottomLeft.set(this.minX, this.maxY);
  }

  draw(){
    rect(this.x, this.y, this.width, this.height);

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