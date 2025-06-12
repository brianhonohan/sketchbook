class CrowdMember {
  constructor(x, y, publicSpace){
    this.publicSpace = publicSpace;
    this.loc = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.target = createVector(0, 0);
    this.color = color(0, 100, 100);
    this.id = undefined;
    this.startDoorway = undefined;
    this.targetDoorway = undefined;
  }

  setStart(doorwayStart){
    this.startDoorway = doorwayStart;
  }

  setTarget(doorwayEnd){
    this.targetDoorway = doorwayEnd;
    this.target = this.targetDoorway.position;
    this.velocity = p5.Vector.sub(this.target, this.loc);
    this.velocity.normalize();
    this.velocity.mult(0.5);
  }

  get x(){ return this.loc.x; }
  get y(){ return this.loc.y; }
  get minX(){ return this.loc.x - Crowd.size; }
  get minY(){ return this.loc.y - CrowdMember.size; }
  get maxX(){ return this.loc.x + CrowdMember.size; }
  get maxY(){ return this.loc.y + CrowdMember.size; }

  static get size() { return 10; }

  tick(){
    this.neighbors = this.publicSpace.crowdNearby(this.x, this.y);
    this.publicSpace.defaultFlowBehavior.calcAccel(this, this.neighbors);

    this.velocity.add(this.accel);
    this.loc.add(this.velocity);
    this.accel.mult(0);
  }

  draw(){
    fill(this.color);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y, CrowdMember.size, CrowdMember.size);
  }
}