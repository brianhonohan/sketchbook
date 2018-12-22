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

  radialVector(point){
    return createVector(point.x - this.x, point.y - this.y);
  }

  static get TANGENT_MODE_POS_TO_POS() { return 0; }
  // static get TANGENT_MODE_POS_TO_NEG() { return 1; }
  // static get TANGENT_MODE_NEG_TO_NEG() { return 2; }
  static get TANGENT_MODE_NEG_TO_POS() { return 3; }

  tangentToCircle(other, mode = Circle.TANGENT_MODE_POS_TO_POS){
    const bigger  = (this.radius >= other.radius) ? this : other;
    const smaller = (this.radius >= other.radius) ? other : this;

    const innerRadius = bigger.radius - smaller.radius; 
    const innerCircle = new Circle(bigger.x, bigger.y, innerRadius);

    const wrap = (mode == Circle.TANGENT_MODE_POS_TO_POS);
    const tangentPtOnInner = innerCircle.tangentPoint(smaller, wrap);
    const radialLine = innerCircle.radialVector(tangentPtOnInner);
    radialLine.setMag(smaller.radius);

    const tangentSegment = new LineSegment(smaller.x, smaller.y, 
                                  tangentPtOnInner.x, tangentPtOnInner.y);
    tangentSegment.translate(radialLine.x, radialLine.y);
    return tangentSegment;
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