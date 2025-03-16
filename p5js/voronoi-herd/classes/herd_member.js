class HerdMember {
  constructor(x, y, herd){
    this.herd = herd;
    this.loc = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.state = HerdMember.STATE_GRAZING;
    this.fear = 0;
  }

  get x(){ return this.loc.x; }
  get y(){ return this.loc.y; }
  get minX(){ return this.loc.x - HerdMember.size/1; }
  get minY(){ return this.loc.y - HerdMember.size/1; }
  get maxX(){ return this.loc.x + HerdMember.size/1; }
  get maxY(){ return this.loc.y + HerdMember.size/1; }

  get color(){ 
    return lerpColor(HerdMember.colorForState(HerdMember.STATE_GRAZING),
                     HerdMember.colorForState(HerdMember.STATE_AVOIDING_PREDATOR),
                     this.fear);
  }

  static get STATE_GRAZING() { return 0; }
  static get STATE_AVOIDING_PREDATOR() { return 1; }
  static get size() { return systemParams.memberSize; } // WARNING: External dependency

  isGrazing(){ return this.state === HerdMember.STATE_GRAZING; }
  isAvoiding(){ return this.state === HerdMember.STATE_AVOIDING_PREDATOR; }

  avoidPredator(){
    this.fear = constrain((this.fear + 0.03), 0, 1);

    let vecAwayFromPredator = p5.Vector.sub(this.loc, this.herd.predator.loc);
    vecAwayFromPredator.setMag(this.herd.params.flocking.fleeSpeed);
    this.accel.add(vecAwayFromPredator);
    this.state = HerdMember.STATE_AVOIDING_PREDATOR;
  }

  returnToGrazing(){
    this.fear = constrain((this.fear - 0.015), 0, 1);
    this.state = HerdMember.STATE_GRAZING;
  }

  updateBehavior(neighbors){
    const behaviorName = this.isGrazing() ? 'grazing' : 'avoiding';
    let weights = this.herd.flocking.getWeightsFor(behaviorName)

    this.accel.add(this.herd.flocking.calcAccel(this, neighbors, weights));
    if (!this.herd.params.wrapEdges){ this.accel.add(this.steerFromBorders()); }
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

  steerFromBorders(){
    const steer = createVector(0, 0);
    const threshold = 100;
    const maxForce = 2;

    const minDistToEdgeX = min((this.x - this.herd.grassland.bounds.minX), 
                               (this.herd.grassland.bounds.maxX - this.x));
    if (minDistToEdgeX < threshold) {
      steer.x = -1 * this.velocity.x * map(threshold - minDistToEdgeX, 0, threshold, 0, maxForce);
    }

    const minDistToEdgeY = min((this.y - this.herd.grassland.bounds.minY), 
                               (this.herd.grassland.bounds.maxY - this.y));
    if (minDistToEdgeY < threshold) {
      steer.y = -1 * this.velocity.y * map(threshold - minDistToEdgeY, 0, threshold, 0, maxForce);
    }
    return steer;
  }

  borders(){
    if (this.herd.params.wrapEdges){
      // wraps - but assumes bounds is width/height (of canvas) 
      this.radius = HerdMember.size / 2;
      if (this.x < -this.radius) this.loc.x = width+this.radius;
      if (this.y < -this.radius) this.loc.y = height+this.radius;
      if (this.x > width+this.radius) this.loc.x = -this.radius;
      if (this.y > height+this.radius) this.loc.y = -this.radius;
    }else {
      // soft bounce off walls
      if (! this.herd.grassland.bounds.contains(this)){
        this.velocity.mult(-0.5);
        this.loc.x = constrain(this.loc.x, HerdMember.size, width - HerdMember.size);
        this.loc.y = constrain(this.loc.y, HerdMember.size, height - HerdMember.size);      
      }
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
    ellipseMode(CENTER);
    ellipse(this.x, this.y, HerdMember.size, HerdMember.size);
  }
}