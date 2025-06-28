class BezierCurve {
  // Accepts:
  // Point1, Point2, Point3, Point4
  // x1, y1, x2, y2, x3, y3, x4, y4
  constructor(a, b, c, d, x3, y3, x4, y4){
    this.p1 = new Point(0, 0);
    this.p2 = new Point(0, 0);
    this.p3 = new Point(0, 0);
    this.p4 = new Point(0, 0);
    this.updatePoints(a, b, c, d, x3, y3, x4, y4);

    this.dragEnabled = false;
    this.noFill = true;
    this.initPoints();
  }

  updatePoints(a, b, c, d, x3, y3, x4, y4){
    if (a.x && a.y){
      this.p1.set(a.x, a.y);
      this.p2.set(b.x, b.y);
      this.p3.set(c.x, c.y);
      this.p4.set(d.x, d.y);
    } else {
      this.p1.set(a, b);
      this.p2.set(c, d);
      this.p3.set(x3, y3);
      this.p4.set(x4, y4);
    }
  }

  static defaultCurve(){
    return new BezierCurve(0.2 * width, 0.8 * height,
                            0.4 * width, 0.8 * height,
                            0.6 * width, 0.2 * height,
                            0.8 * width, 0.2 * height);
  }

  static fromPoints(p1, p2, p3, p4){
    return new BezierCurve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }

  // Expected range of numSumples 1+ 
  // 1 would be very coarse, just the distance from start to end point
  // 10 (default) would subdivide the curve into 10 steps and tally the segment lengths
  approximateLength(numSamples = 10){
    numSamples = Math.floor( (numSamples < 1) ? 1 : numSamples);

    const stepSize = 1 / numSamples;
    let lengthTally = 0;
    let currentPoint = this.p1;
    let samplePoint;

    for (let i = 1; i <= numSamples; i++){
      samplePoint = this.pointAt(i * stepSize);
      lengthTally += currentPoint.distTo(samplePoint);

      currentPoint = samplePoint;
    }
    return lengthTally;
  }

  pointAt(percent){
    return new Point( bezierPoint(this.p1.x, this.p2.x, this.p3.x, this.p4.x, percent),
                      bezierPoint(this.p1.y, this.p2.y, this.p3.y, this.p4.y, percent));
  }

  // returns a line, perpendicular to the curve at the point
  perpendicularAt(percent, length = undefined){
    let lineSeg = this.tangentAt(percent);
    lineSeg.rotate90AroundStart();

    if (length != undefined){
      lineSeg.setLength(length);
    }
    return lineSeg;
  }

  outwardPerpendiculAt(percent, length = undefined){
    let lineSeg = this.tangentAt(percent);
    let pointAhead = this.pointAt(percent + 0.01);
    let segToPointAhead = new LineSegment(lineSeg.start, pointAhead);
    let rotation = lineSeg.rotationBetween(segToPointAhead);

    if (rotation < 0){
      lineSeg.rotate90AroundStart();
    } else {
      lineSeg.rotateNegative90AroundStart();
    }

    if (length != undefined){
      lineSeg.setLength(length);
    }
    return lineSeg;
  }

  inwardPerpendiculAt(percent, length = undefined){
    let lineSeg = this.outwardPerpendiculAt(percent, length);
    // rotate18o() does not work for very short line segments
    lineSeg.rotate90AroundStart();
    lineSeg.rotate90AroundStart();
    return lineSeg;
  }

  // Returns a LineSegment that is tangent to the curve at the given percent.
  // The  midpoint of the line returned is at the point on the curve at that percent.
  tangentAround(percent){
    //  consider shifting to bezierTangent(...)
    const delta = 0.0001;
    const pointJustBefore = this.pointAt(percent - delta);
    const pointJustAfter = this.pointAt(percent + delta);

    return new LineSegment(pointJustBefore, pointJustAfter);
  }

  // This implementaiton uses the bezierTangent function
  // to calculate the tangent at a given percent along the curve.
  //
  // it is comparable to the tangentAt(percent) method,
  // but returns a line segment that starts at the point on the curve 
  tangentAt(percent){
    const pointAtPercent = this.pointAt(percent);
    let tx = bezierTangent(this.p1.x, this.p2.x, this.p3.x, this.p4.x, percent);
    let ty = bezierTangent(this.p1.y, this.p2.y, this.p3.y, this.p4.y, percent);
    const tangentEnd = new Point(pointAtPercent.x + tx, pointAtPercent.y + ty);
    return new LineSegment(pointAtPercent, tangentEnd);
  }
  
  // See: https://en.wikipedia.org/wiki/Curvature#Curvature_of_plane_curves_defined_explicitly
  curvatureAt(percent) {
    const { p1, p2, p3, p4 } = this;

    // First derivative
    const dxdt =
      3 * (1 - percent) ** 2 * (p2.x - p1.x) +
      6 * (1 - percent) * percent * (p3.x - p2.x) +
      3 * percent ** 2 * (p4.x - p3.x);

    const dydt =
      3 * (1 - percent) ** 2 * (p2.y - p1.y) +
      6 * (1 - percent) * percent * (p3.y - p2.y) +
      3 * percent ** 2 * (p4.y - p3.y);

    // Second derivative
    const d2xdt2 =
      6 * (1 - percent) * (p3.x - 2 * p2.x + p1.x) +
      6 * percent * (p4.x - 2 * p3.x + p2.x);

    const d2ydt2 =
      6 * (1 - percent) * (p3.y - 2 * p2.y + p1.y) +
      6 * percent * (p4.y - 2 * p3.y + p2.y);

    const numerator = Math.abs(dxdt * d2ydt2 - dydt * d2xdt2);
    const denominator = Math.pow(dxdt ** 2 + dydt ** 2, 1.5);

    return denominator === 0 ? 0 : numerator / denominator;
  }

  toggleDragEnabled(){
    this.dragEnabled = !this.dragEnabled;
  }

  static circularQuarterArc(x, y, radius, startAt){
    let curve = new BezierCurve(0,0,0,0,0,0,0,0);
    curve.makeCircleQuarterArc(x, y, radius, startAt);
    return curve;
  }

  makeCircleQuarterArc(x, y, radius, startAt){
    // From: https://spencermortensen.com/articles/bezier-circle/
    // P0=(0,1), P1=(c,1), P2=(1,c), P3=(1,0)
    // c=0.551915024494
    const unitC = 0.551915024494;
    const scaledC = unitC * radius;
    let c = scaledC;
    let l = radius;

    this.updatePoints( l,  0,  l,  c,  c,  l,  0,  l);
    this.rotateAbout(0, 0, startAt);
    this.move(x, y);
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
    this.points[0] = this.p1;
  }

  attachTailTo(curve){
    this.p4 = curve.p1;
    this.points[4] = this.p4;
  }

  makeLinear(){
    this.p2.set(this.p1.x, this.p1.y);
    this.p3.set(this.p4.x, this.p4.y);
  }

  handleMousePressed(){
    // HMMM: Consider how to handle draggable points when curves are attached
    // and they share points; risk is two curves response TRUE (eg. handling mouse input)
    // but maybe non-issue if once the first curve responds true, processing stops
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

    code.push(`const bezierCurve = new BezierCurve(${xJS(this.p1.x)}, ${yJS(this.p1.y)},`);
    code.push(`                                  ${xJS(this.p2.x)}, ${yJS(this.p2.y)},`);
    code.push(`                                  ${xJS(this.p3.x)}, ${yJS(this.p3.y)},`);
    code.push(`                                  ${xJS(this.p4.x)}, ${yJS(this.p4.y)});`);
    return code.join(char(10));
  }
}