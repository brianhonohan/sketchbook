class CrowdMember {
  constructor(x, y, publicSpace){
    this.publicSpace = publicSpace;
    this.loc = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.target = createVector(0, 0);
    this.color = color(0, 100, 100);
    this.id = undefined;
  }

  setTarget(x, y){
    this.target.x = x;
    this.target.y = y;
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
    this.velocity.add(this.accel);
    this.loc.add(this.velocity);
    this.accel.mult(0);

    // don't be fancy for now 
    // if (this.id % 30 !== frameCount % 30){
    //   return;
    // }

    if (this.loc.dist(this.target) < 1){
      // reached target, so set a new one
      this.publicSpace.removeCrowdMember(this);
    }
  }

  draw(){
    fill(this.color);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y, CrowdMember.size, CrowdMember.size);
  }
}