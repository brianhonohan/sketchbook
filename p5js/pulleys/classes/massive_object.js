class MassiveObject extends Particle {
  constructor(x, y, mass = 10){
    super(x, y);
    this.mass = mass;
    this.ropeSegment = null;
    this.halfWidth = 10;
    this.coeffOfRestitution = 0.3; // with concrete
  }

  get minX(){ return this.pos.x - this.halfWidth; }
  get maxX(){ return this.pos.x + this.halfWidth; }
  get minY(){ return this.pos.y - this.halfWidth; }
  get maxY(){ return this.pos.y + this.halfWidth; }

  hasTieOffPoint(){ 
    return !this.ropeSegment;
  }

  ropeAttachmentPoint(from){
    return createVector(this.x, this.y - 10);
  }

  attachRopeSegment(ropeSegment){
    this.ropeSegment = ropeSegment;
  }

  isPulley(){
    return false;
  }

  applyForce(force){
    Physics.applyForce(this, force);
  }

  containsXY(x, y){
    return (this.x - 10) <= x && x < (this.x + 10) 
           &&  (this.y - 10) <= y && y < (this.y + 10);
  }

  preTick(){
    if (!this.ropeSegment){
      return;
    }

    this.ropeSegment.addTension(this.weight().mag(), this);
  }

  weight(){
    // could be computed once, but thinking that timescale may be 
    // changed, and thus accelDueToGravity value would change.
    return system.physics.accelDueToGravity.copy().mult(this.mass);
  }

  tick(){
    this.accel.add(system.physics.accelDueToGravity);
    if (this.ropeSegment){
      const tensionForce = this.ropeSegment.tensionOn(this);
      tensionForce.x = 0; // Hack for simplicity for now.
      this.applyForce(tensionForce);
    }

    super.tick();
  }

  draw(){
    rectMode(CENTER);
    stroke(230);
    strokeWeight(2);

    if (this.containsXY(system.mouseX, system.mouseY)){
      fill(colorScheme.hover);
    } else {
      fill(colorScheme.object);
    }
    rect(this.x, this.y, 20, 20);
  }
}
