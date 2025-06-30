class Polygon extends Polygon2D {
  constructor() {
    super();
  }

  setPoints(points){
    this.points = [];
    for (let p of points) {
      this.addPoint( new Point(p.x, p.y) );
    }
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
    P5JsUtils.applyStyleSet(this);
    
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

    if (this.dragEnabled) {
      P5JsUtils.drawControlPoints(this.points);
    }
  }
}