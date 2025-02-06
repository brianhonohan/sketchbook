class BezierCurve {
  // Accepts:
  // Point1, Point2, Point3, Point4
  // x1, y1, x2, y2, x3, y3, x4, y4
  constructor(a, b, c, d, x3, y3, x4, y4){
    if (a.x && a.y){
      this.p1 = new Point(a.x, a.y);
      this.p2 = new Point(b.x, b.y);
      this.p3 = new Point(c.x, c.y);
      this.p4 = new Point(d.x, d.y);
    } else {
      this.p1 = new Point(a, b);
      this.p2 = new Point(c, d);
      this.p3 = new Point(x3, y3);
      this.p4 = new Point(x4, y4);
    }

    this.dragEnabled = false;
    this.noFill = true;
    this.initPoints();
  }

  static fromPoints(p1, p2, p3, p4){
    return new BezierCurve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }

  pointAt(percent){
    return new Point( bezierPoint(this.p1.x, this.p2.x, this.p3.x, this.p4.x, percent),
                      bezierPoint(this.p1.y, this.p2.y, this.p3.y, this.p4.y, percent));
  }

  // returns a line, perpendicular to the curve at the point
  perpendicularAt(percent){
    let lineSeg = this.tangentAt(percent);
    lineSeg.rotate90AroundStart();
    return lineSeg;
  }

  tangentAt(percent){
    const delta = 0.0001;
    const pointJustBefore = this.pointAt(percent - delta);
    const pointJustAfter = this.pointAt(percent + delta);

    return new LineSegment(pointJustBefore, pointJustAfter);
  }

  toggleDragEnabled(){
    this.dragEnabled = !this.dragEnabled;
  }

  static circularQuarterArc(x, y, radius, startAt){
    // From: https://spencermortensen.com/articles/bezier-circle/
    // P0=(0,1), P1=(c,1), P2=(1,c), P3=(1,0)
    // c=0.551915024494
    const unitC = 0.551915024494;
    const scaledC = unitC * radius;
    let c = scaledC;
    let l = radius;

    let curve = new BezierCurve( l,  0,  l,  c,  c,  l,  0,  l);
    curve.rotateAbout(0, 0, startAt);
    curve.move(x, y);
    return curve;
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
    P5JsUtils.applyStyleSet(this);
    bezier(this.p1.x, this.p1.y,
           this.p2.x, this.p2.y,
           this.p3.x, this.p3.y,
           this.p4.x, this.p4.y);

    if (this.dragEnabled) {
      this.drawDragControls();
    }
  }

  drawDragControls(){
    this.drawGuideLines();
    P5JsUtils.drawControlPoints(this.points);
  }

  drawGuideLines(){
    push();
    stroke(100, 200, 100);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    line(this.p4.x, this.p4.y, this.p3.x, this.p3.y);
    pop();
  }

  toCode(proportionalToCanvas = false){
    let code = []
    const xJS = !proportionalToCanvas ? x => x : (x) => P5JsUtils.jsCodeAsWidthFraction(x);
    const yJS = !proportionalToCanvas ? y => y : (y) => P5JsUtils.jsCodeAsHeightFraction(y);

    code.push(`let bezierCurve = new BezierCurve(${xJS(this.p1.x)}, ${yJS(this.p1.y)},`);
    code.push(`                                  ${xJS(this.p2.x)}, ${yJS(this.p2.y)},`);
    code.push(`                                  ${xJS(this.p3.x)}, ${yJS(this.p3.y)},`);
    code.push(`                                  ${xJS(this.p4.x)}, ${yJS(this.p4.y)});`);
    return code.join(char(10));
  }
}