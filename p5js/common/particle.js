class Particle {
  constructor(x, y){
    this.pos    = createVector(x, y);
    this.vel    = createVector(0, 0);
    this.accel  = createVector(0, 0);

    this.boundaryMode = Particle.BOUNDARY_MODE_WRAP;
  }

  set boundaryMode(mode){
    this._boundaryMode = mode;
    switch(this._boundaryMode) {
      case Particle.BOUNDARY_MODE_WRAP:
        this.boundaryBehavior = BoundaryWrapper;
        break;
      case Particle.BOUNDARY_MODE_BOUNCE:
        this.boundaryBehavior = BoundaryBouncer;
        break;
    }
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
    this.boundaryBehavior.hitXBoundary(this);
  }

  hitYBoundary(){
    this.boundaryBehavior.hitYBoundary(this);
  }

  draw(){
    point(this.x, this.y);
  }
}
