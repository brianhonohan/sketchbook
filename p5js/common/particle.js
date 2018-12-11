class Particle {
  constructor(x, y){
    this.pos    = createVector(x, y);
    this.vel    = createVector(0, 0);
    this.accel  = createVector(0, 0);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  applyForce(force){
    this.accel.add(force);
  }

  tick(){
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.accel.setMag(0);
  }

  draw(){
    point(this.x, this.y);
  }
}
