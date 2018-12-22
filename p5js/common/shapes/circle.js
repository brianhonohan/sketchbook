class Circle {
  constructor(x, y, radius){
    this.pos = createVector(x, y);
    this.radius = radius;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

  draw(){
    stroke(230);
    noFill();

    point(this.x, this.y);

    strokeWeight(2);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}