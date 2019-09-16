class Particle {
  constructor(x, y){
    this.pos    = createVector(x, y);
    this.vel    = createVector(0, 0);
    this.accel  = createVector(0, 0);

    this.setDefaultBounds();
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

  setDefaultBounds(){
    // TODO: Replace with Rect and refactor collision checks
    this.bounds = {
      minX: 0,
      minY: 0,
      maxX: width,
      maxY: height 
    };
  }

  setBounds(rect){
    this.bounds = rect;
  }

  static get BOUNDARY_MODE_WRAP() { return 0; }
  static get BOUNDARY_MODE_BOUNCE() { return 1; }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }
  get minX(){ return this.pos.x; }
  get maxX(){ return this.pos.x; }
  get minY(){ return this.pos.y; }
  get maxY(){ return this.pos.y; }

  applyForce(force){
    this.accel.add(force);
  }

  isOutOfYBounds(){
    return this.minY < this.bounds.minY
        || this.maxY > this.bounds.maxY;
  }

  isOutOfXBounds(){
    return this.minX < this.bounds.minX 
        || this.maxX > this.bounds.maxX;
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
