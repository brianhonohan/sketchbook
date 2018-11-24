class RiverSource {
  constructor(pos){
    this.pos = pos;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  get end() { return this.pos; }

  draw(){
    noStroke();
    fill(200, 200, 50);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);
  }
}
