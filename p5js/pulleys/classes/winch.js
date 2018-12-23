class Winch {
  constructor(x, y){
    this.pos = createVector(x, y);
    this.radius = 10;
  }

  get height() { return this.radius * 3; }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

  ropeTieOffPoint(from){
    return this.tangentPoint(from);
  }

  isPulley(){
    return false;
  }

  // Warning: Duplicate of Pully.tangentPoint()
  tangentPoint(point, clockwiseWrap = true){
    const vec = createVector(this.x - point.x, this.y - point.y);
    const dist = vec.mag();
    const theta = Math.asin(this.radius / dist);

    const rotationAngle = clockwiseWrap ? -1 * theta : theta;
    vec.rotate(rotationAngle);
    vec.setMag(dist * Math.cos(theta));
    return {x: point.x + vec.x, y: point.y + vec.y};
  }

  containsXY(x, y){
    return  dist(x, y, this.x, this.y) < this.radius;
  }

  draw(){
    strokeWeight(2);
    fill(colorScheme.background);

    // draw base
    const tan30 = 0.57735026919;
    const xDelta = this.height * tan30;
    triangle(this.x - xDelta, this.y + this.height,
              this.x, this.y,
              this.x + xDelta, this.y + this.height);

    // draw outer ring
    ellipse(this.x, this.y, this.radius * 4, this.radius * 4);

    if (this.containsXY(system.mouseX, system.mouseY)){
      fill(colorScheme.hover);
    }else{
      noFill();
    }

    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
