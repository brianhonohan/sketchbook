class Circle {
  constructor(x, y, radius){
    this.pos = createVector(x, y);
    this.radius = radius;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

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

  draw(){
    stroke(230);
    noFill();

    point(this.x, this.y);

    strokeWeight(2);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}