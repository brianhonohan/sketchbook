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