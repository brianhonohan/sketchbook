class Particle {
  constructor(x, y){
    this.pos    = createVector(x, y);
    this.vel    = createVector(0, 0);
    this.accel  = createVector(0, 0);

    this.bound_mode = Particle.BOUNDARY_MODE_BOUNCE;
  }

  static get BOUNDARY_MODE_WRAP() { return 0; }
  static get BOUNDARY_MODE_BOUNCE() { return 1; }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  applyForce(force){
    this.accel.add(force);
  }

  isOutOfYBounds(){
    return this.pos.y < 0
        || this.pos.y > height;
  }

  isOutOfXBounds(){
    return this.pos.x < 0 
        || this.pos.x > width;
  }

  tick(){
    this.vel.add(this.accel);
    this.pos.add(this.vel);

    if (this.isOutOfXBounds()){
      this.hitXBoundary();
    }
    if (this.isOutOfYBounds()){
      this.hitYBoundary();
    }

    this.accel.setMag(0);
  }

  hitXBoundary(){
    switch(this.bound_mode) {
      case Particle.BOUNDARY_MODE_WRAP:
        this.wrapX();
        break;
      case Particle.BOUNDARY_MODE_BOUNCE:
        this.bounceX();
        break;
    }
  }

  hitYBoundary(){
    switch(this.bound_mode) {
      case Particle.BOUNDARY_MODE_WRAP:
        this.wrapY();
        break;
      case Particle.BOUNDARY_MODE_BOUNCE:
        this.bounceY();
        break;
    }
  }

  bounceX(){
    this.vel.x *= -1;
    this.pos.x = (this.x < 0) ? Math.abs(this.x) : width  - (this.x  - width);
  }

  bounceY(){
    this.vel.y *= -1;
    this.pos.y = (this.y < 0) ? Math.abs(this.y) : height  - (this.y  - height);
  }

  wrapX(){
    this.pos.x = (this.pos.x + width) % width;
  }

  wrapY(){
    this.pos.y = (this.pos.y + height) % height;
  }

  draw(){
    point(this.x, this.y);
  }
}
