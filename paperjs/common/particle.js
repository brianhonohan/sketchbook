class Particle {
  constructor(){
    this.pos    = new paper.Point(0, 0);
    this.vel    = new paper.Point(0, 0);
    this.accel  = new paper.Point(0, 0);
    this.jerk   = new paper.Point(0, 0);
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
  set x(newVal) { this.pos.x = newVal; }
  set y(newVal) { this.pos.y = newVal; }

  tick(){
    this.accel.add(this.jerk);
    this.velocity.add(this.accel);
    this.pos.add(this.velocity);
    this.jerk.multiply(0);
  }
}