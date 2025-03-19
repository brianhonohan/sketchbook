class AxillaryBud {
  constructor(attachAngle, segment){
    this.attachAngle = attachAngle;
    this.segment = segment;
    this.counter = 0;
  }

  tick(){
    if (this.segment.auxinLevel < 0.1){
      this.startShoot();
    }
    this.counter++;
  }

  startShoot(){
    let branch = new TreeSegment(this.attachAngle, this.segment);
    branch.maxTrunkLength *= 0.95;
    let meristem = new ShootApicalMeristem(branch);
    tree.addApicalMeristem(meristem);
    this.segment.bud = null;
  }

  draw(){
    noStroke();
    fill(200,210,120);
    ellipse(0,0,5,5);
  }
}