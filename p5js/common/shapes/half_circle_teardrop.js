class HalfCircleTeardrop {
  constructor(startX, startY, endX, endY) {
    this.start = createVector(startX, startY);
    this.end = createVector(endX, endY);
    this._calcDimensions();
  }

  _calcDimensions(){
    this.direction = createVector(this.end.x - this.start.x, this.end.y - this.start.y);
    this.dist = this.direction.mag();
    this.direction.normalize();
    this.radius = 2 / 3.0 * this.dist;
    this.diameter = this.radius * 2;

    this.quarterLength = p5.Vector.mult(this.direction, this.radius / 2);
    this.p1 = p5.Vector.add(this.start, this.quarterLength); // center of the void
    this.p2 = p5.Vector.add(this.p1, this.quarterLength);  // center of the teardrop
    this.p3 = p5.Vector.add(this.end, this.quarterLength); // the point opposite the start

    this.heading = this.direction.heading();
    this.rendered = false;
  }

  static createAt(centerX, centerY, radius){
    let startX = centerX - radius;
    let startY = centerY;
    let endX = centerX + radius/2;
    let endY = centerY;
    return new HalfCircleTeardrop(startX, startY, endX, endY);
  }

  static util_rotateVectorAround(v, center, angle) {
    let offset = p5.Vector.sub(v, center);
    offset.rotate(angle);
    return p5.Vector.add(center, offset);
  }

  rotateAboutCenter(angle){
    this.start = HalfCircleTeardrop.util_rotateVectorAround(this.start, this.p2, angle);
    this.end = HalfCircleTeardrop.util_rotateVectorAround(this.end, this.p2, angle);
    this._calcDimensions();
  }

  get x() { return this.end.x; }
  get y() { return this.end.y; }

  containsXY(x, y){
    // Check if point (x, y) is within the teardrop shape
    // distance to p2 needs to be less than radius, return false if not
    if (dist(x, y, this.p2.x, this.p2.y) > this.radius) {
      return false;
    }

    // return true if its within radius of p3 (bulb)
    if (dist(x, y, this.end.x, this.end.y) <= (this.radius / 2 )) {
      return true;
    }

    // return false if its within radius of p1 (void)
    if (dist(x, y, this.p1.x, this.p1.y) <= (this.radius / 2)) {
      return false;
    }

    let fromStartToXY = createVector(x - this.start.x, y - this.start.y);
    let rotationDiff = P5JsUtils.rotationBetweenVectors(this.direction, fromStartToXY);
    return (rotationDiff < 0);
  }

  move(x, y){
    this.start.add(x, y);
    this.end.add(x, y);
    this._calcDimensions();
  }

  static createViaPoints(start, end){
    return new HalfCircleTeardrop(start.x, start.y, end.x, end.y);
  }

  draw(){
    if (this.rendered == false) {
      this._render();
    }
    image(this.graphics, 0, 0, width, height);
  }

  _render(){
    this.graphics = createGraphics(width, height);
    P5JsUtils.applyStyleSet(this, this.graphics);

    this.graphics.noStroke();
    this.graphics.arc(this.p2.x, this.p2.y, this.diameter, this.diameter, this.heading + Math.PI, this.heading);
    this.graphics.ellipse(this.end.x, this.end.y, this.radius, this.radius);

    this.graphics.erase();
    this.graphics.ellipse(this.p1.x, this.p1.y, this.radius, this.radius);
    this.graphics.noErase();
    this.rendered = true;
  }
}