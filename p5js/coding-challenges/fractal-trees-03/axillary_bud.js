class AxillaryBud {
  constructor(attachAngle, segment){
    this.attachAngle = attachAngle;
    this.segment = segment;
    this.counter = 0;
  }

  tick(){
    if (this.counter > 100){
      this.startShoot();
    }
    this.counter++;
  }

  startShoot(){
    let branch = new TreeSegment(this.attachAngle, this.segment);
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