class HalfCircleTeardrop {
  constructor(startX, startY, endX, endY) {
    this.start = createVector(startX, startY);
    this.end = createVector(endX, endY);
    this.fillColor = color(80);
    this._calcDimensions();
  }

  _calcDimensions(){
    this.direction = createVector(this.end.x - this.start.x, this.end.y - this.start.y);
    this.dist = this.direction.mag();
    this.direction.normalize();
    this.radius = 2 / 3.0 * this.dist;
    this.diameter = this.radius * 2;

    this.quarterLength = p5.Vector.mult(this.direction, this.radius / 2);
    this.p1 = p5.Vector.add(this.start, this.quarterLength);
    this.p2 = p5.Vector.add(this.p1, this.quarterLength);
    this.p3 = p5.Vector.add(this.end, this.quarterLength);

    this.heading = this.direction.heading();
  }

  get x() { return this.end.x; }
  get y() { return this.end.y; }

  move(x, y){
    this.start.add(x, y);
    this.end.add(x, y);
    this._calcDimensions();
  }

  static createViaPoints(start, end){
    return new Paisley(start.x, start.y, end.x, end.y);
  }

  draw(){
    noStroke();
    fill(255);
    arc(this.p2.x, this.p2.y, this.diameter, this.diameter, this.heading + Math.PI, this.heading);

    ellipse(this.end.x, this.end.y, this.radius, this.radius);
    // arc(this.end.x, this.end.y, this.radius, this.radius, this.heading-0.1, this.heading + Math.PI + 0.1);
    // fill(200, 100, 100);
    fill(50);
    
    ellipse(this.p1.x, this.p1.y, this.radius, this.radius);
    // arc(this.p1.x, this.p1.y, this.radius, this.radius, this.heading + Math.PI - 0.1, this.heading + 0.1);
  }
}