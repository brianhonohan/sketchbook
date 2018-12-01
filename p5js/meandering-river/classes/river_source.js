class RiverSource {
  constructor(pos, heading){
    this.pos = pos;
    this.heading = heading;
    this.virtualTarget = p5.Vector.add(pos, createVector(20, 0).rotate(heading));
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  get end() { return this.pos; }

  draw(){
    noStroke();
    fill(200, 200, 50);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);

    stroke(200, 200, 50);
    P5JsUtils.drawArrow(this.pos, this.virtualTarget);
  }
}
