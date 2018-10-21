class Predator {
  constructor(x, y){
    this.loc = createVector(x, y);
  }

  get x(){ return this.loc.x; }
  get y(){ return this.loc.y; }

  draw(){
    fill(200, 200, 50);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}