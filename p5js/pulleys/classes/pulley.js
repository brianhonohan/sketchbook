class Pulley {
  constructor(x, y, radius = 10){
    this.pos = createVector(x, y);
    this.radius = 10;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
  
  ropeTieOffPoint(){
    return null;
  }

  tangentPoint(point, clockwiseWrap = true){
    const vec = createVector(this.x - point.x, this.y - point.y);
    const dist = vec.mag();
    const theta = Math.asin(this.radius / dist);

    const rotationAngle = clockwiseWrap ? -1 * theta : theta;
    vec.rotate(rotationAngle);
    return {x: point.x + vec.x, y: point.y + vec.y};
  }

  containsXY(x, y){
    return  dist(x, y, this.x, this.y) < this.radius;
  }

  draw(){
    if (this.containsXY(system.mouseX, system.mouseY)){
      fill(colorScheme.hover);
    }else{
      noFill();
    }

    strokeWeight(2);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
