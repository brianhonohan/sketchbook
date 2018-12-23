class Circle {
  constructor(x, y, radius){
    this.pos = createVector(x, y);
    this.radius = radius;
    this.debugMode = false;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

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
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}