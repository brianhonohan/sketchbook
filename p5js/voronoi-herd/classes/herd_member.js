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
  get maxX(){ return this.loc.x + HerdMember.size; }
  get maxY(){ return this.loc.y + HerdMember.size; }

  get color(){ return HerdMember.colorForState(this.state); }

  static get STATE_GRAZING() { return 0; }
  static get STATE_AVOIDING_PREDATOR() { return 1; }
  static get size() { return systemParams.memberSize; } // WARNING: External dependency

  isGrazing(){ return this.state === HerdMember.STATE_GRAZING; }
  isAvoiding(){ return this.state === HerdMember.STATE_AVOIDING_PREDATOR; }

  avoidPredator(){
    this.state = HerdMember.STATE_AVOIDING_PREDATOR;
  }

  returnToGrazing(){
    this.state = HerdMember.STATE_GRAZING;
  }

  updateBehavior(neighbors){
    let weights;
    if (this.state === HerdMember.STATE_AVOIDING_PREDATOR){
      weights = this.avoidingFlockingWeights();
    }else {
      weights = this.grazingFlockingWeights();
    }

    this.accel.add(this.herd.flocking.calcAccel(this, neighbors, weights));
  }

  grazingFlockingWeights(){
    return {
      separationFactor: 2,
      alignFactor: 1.0,
      cohesionFactor: 1.0,
    };
  }

  avoidingFlockingWeights(){
    return {
      separationFactor: 1.0,
      alignFactor: 0.0,
      cohesionFactor: 2.0,
    };
  }

  borders(){
    // wraps - but assumes bounds is width/height (of canvas) 
    // this.radius = HerdMember.size;
    // if (this.x < -this.radius) this.loc.x = width+this.radius;
    // if (this.y < -this.radius) this.loc.y = height+this.radius;
    // if (this.x > width+this.radius) this.loc.x = -this.radius;
    // if (this.y > height+this.radius) this.loc.y = -this.radius;

    // soft bounce off walls
    // should be a 'steering' force
    if (! this.herd.grassland.bounds.contains(this)){
      this.velocity.mult(-0.5);
      this.loc.x = constrain(this.loc.x, HerdMember.size, width - HerdMember.size);
      this.loc.y = constrain(this.loc.y, HerdMember.size, height - HerdMember.size);      
    }
  }

  applyBehavior(){
    this.velocity.add(this.accel);
    this.loc.add(this.velocity);
    this.accel.mult(0);
    this.borders();
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
    ellipse(this.x, this.y, HerdMember.size, HerdMember.size);
  }
}