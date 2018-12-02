class RiverSource {
  constructor(pos, heading){
    this.pos = pos;
    this.directionalVector = null;
    this.heading = heading;
    this.id = 'source';
  }

  set heading(newHeading){
    this._heading = newHeading;
    this.directionalVector = createVector(20, 0).rotate(newHeading);
  }

  vectorFromParent(){
    return this.directionalVector;
  }

  halve(){
    return;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  get end() { return this.pos; }

  draw(){
    noStroke();
    fill(60, 75, 78);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);

    stroke(60, 75, 78);
    P5JsUtils.drawArrow(this.pos, p5.Vector.add(this.pos, this.directionalVector) );
  }
}
