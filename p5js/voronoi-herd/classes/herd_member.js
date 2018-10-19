class HerdMember {
  constructor(x, y, herd){
    this.herd = herd;
    this.loc = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.state = HerdMember.STATE_GRAZING;
  }

  get x(){ return this.loc.x; }
  get y(){ return this.loc.y; }

  get color(){ return HerdMember.colorForState(this.state); }

  static get STATE_GRAZING() { return 0; }
  static get STATE_AVOIDING_PREDATOR() { return 1; }

  avoidPredator(){
    this.state = HerdMember.STATE_AVOIDING_PREDATOR;
  }

  updateBehavior(neighbors){
    this.accel.add(this.herd.flocking.calcAccel(this, neighbors));
  }

  applyBehavior(){
    this.velocity.add(this.accel);
    this.loc.add(this.velocity);
    this.accel.mult(0);
  }

  static colorForState(state) { 
    return ({
      0: color(50, 200, 50),
      1: color(200, 50, 50),
    })[state];
  }

  draw(){
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}