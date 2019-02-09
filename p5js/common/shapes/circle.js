class Circle {
  constructor(x, y, radius){
    this.pos = createVector(x, y);
    this.radius = radius;
    this.debugMode = false;
    this.dragEnabled = false;
    this.isDragged = false;

    this.fillColor = undefined;
    this.dragPos = new Point(0, 0);
    this.dragPos.pos = this.pos; 
    this.dragSize = new Point(this.x + this.radius, this.y);
    this.points = [this.dragPos, this.dragSize];
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
  get minX() { return this.pos.x - this.radius; }
  get maxX() { return this.pos.x + this.radius; }
  get minY() { return this.pos.y - this.radius; }
  get maxY() { return this.pos.y + this.radius; }

  pointsAtX(x) {
    if (x < this.minX || x > this.maxX) {
      return [];
    }

    // dx^2 + dy^2 = r^2
    // dy = (r^2 - dx^2) ^ 0.5
    const dx = this.x - x;
    const rSquared = Math.pow(this.radius, 2);
    const dy = Math.pow(rSquared - dx*dx, 0.5);

    return [{x: x, y: this.y + dy}, {x: x, y: this.y - dy}];
  }

  pointsAtY(y) {
    if (y < this.minY || y > this.maxY) {
      return [];
    }

    // dx^2 + dy^2 = r^2
    // dx = (r^2 - dy^2) ^ 0.5
    const dy = this.y - y;
    const rSquared = Math.pow(this.radius, 2);
    const dx = Math.pow(rSquared - dy*dy, 0.5);

    return [{x: this.x + dx, y: y}, {x: this.x - dx, y: y}];
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
      if (this.dragSize == pointDragged) {
        pointDragged.x = mouseX;
        this.radius = dist(pointDragged.x, pointDragged.y, this.x, this.y);

      } else if (this.dragPos == pointDragged) {
        pointDragged.set(mouseX, mouseY);
        this.dragSize.y = pointDragged.y;
        this.dragSize.x = pointDragged.x + this.radius;
      }
    }
  }

  handleMouseReleased(){
    this.points.forEach(p => { p.isBeingDragged = false; });
    this.isDragged = false;

  }

  containsXY(x, y){
    return  dist(x, y, this.x, this.y) < this.radius;
  }

  tangentPoint(point, clockwiseWrap = true){
    const vec = createVector(this.x - point.x, this.y - point.y);
    const dist = vec.mag();
    if (dist < this.radius){
      return point;
    }

    const theta = Math.asin(this.radius / dist);
    const rotationAngle = clockwiseWrap ? -1 * theta : theta;
    vec.rotate(rotationAngle);
    vec.setMag(dist * Math.cos(theta) );
    return {x: point.x + vec.x, y: point.y + vec.y};
  }

  radialVector(point){
    return createVector(point.x - this.x, point.y - this.y);
  }

  static get TANGENT_MODE_POS_TO_POS() { return 1; }
  static get TANGENT_MODE_POS_TO_NEG() { return -1; }
  static get TANGENT_MODE_NEG_TO_POS() { return -2; }
  static get TANGENT_MODE_NEG_TO_NEG() { return 2; }

  tangentToCircle(other, mode = Circle.TANGENT_MODE_POS_TO_POS){
    const wrap = (mode == Circle.TANGENT_MODE_POS_TO_POS 
                    || mode == Circle.TANGENT_MODE_NEG_TO_POS);
    if (other.radius == undefined || other.radius == 0){
      const tangentPt = this.tangentPoint(other, wrap);
      return new LineSegment(other.x, other.y, 
                                  tangentPt.x, tangentPt.y);
    }

    const bigger  = (this.radius >= other.radius) ? this : other;
    const smaller = (this.radius >= other.radius) ? other : this;

    const modifier = Math.sign(mode);
    const virtualRadius = bigger.radius - (smaller.radius * modifier);
    const virtualCircle = new Circle(bigger.x, bigger.y, virtualRadius);

    const tangentPtOnVirtual = virtualCircle.tangentPoint(smaller, wrap);
    const radialLine = virtualCircle.radialVector(tangentPtOnVirtual);
    radialLine.setMag(smaller.radius);

    if (this.debugMode) {
      this.debugHelperObjects(virtualCircle, smaller, tangentPtOnVirtual, radialLine);  
    }

    const tangentSegment = new LineSegment(smaller.x, smaller.y, 
                                  tangentPtOnVirtual.x, tangentPtOnVirtual.y);
    tangentSegment.translate(modifier * radialLine.x, modifier * radialLine.y);
    return tangentSegment;
  }

  debugHelperObjects(virtualCircle, smaller, tangentPtOnVirtual, radialLine){
    stroke(50, 200, 40);
    virtualCircle.draw();

    stroke(200, 200, 40);
    line(smaller.x, smaller.y, tangentPtOnVirtual.x, tangentPtOnVirtual.y);

    let debugRadialSegment = new LineSegment(smaller.x, smaller.y,
                                             radialLine.x+smaller.x, radialLine.y+smaller.y);
    stroke(40, 200, 200);
    debugRadialSegment.draw();
  }

  draw(){
    if (this.fillColor){
      fill(this.fillColor);
    }
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

    if (this.dragEnabled) {
      this.drawDraggablePoints();
    }
  }

  drawDraggablePoints(){
    this.drawPoint(this.dragPos);
    this.drawPoint(this.dragSize);
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