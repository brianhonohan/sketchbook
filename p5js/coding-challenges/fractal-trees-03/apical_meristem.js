class ApicalMeristem {
  constructor(segment){
    this.segment = null;
    this.attachToSegment(segment);
    this.attachDir = 1;
    this.attachAngle = PI / 4;
  }

  attachToSegment(segment){
    if (this.segment) {
      this.segment.disassociateFromAM();
    }
    this.segment = segment;
    this.segment.attachAM(this);
  }

  tick(){
    if (frameCount % 200 == 0){
      this.addBranch();
      this.startNewSegment();
    }

    this.extendSegment();

    // todo: spawn buds
    // transmit auxin
  }

  addBranch(){
    let branch = new TreeSegment(this.attachAngle * this.attachDir, this.segment);
    let meristem = this.meristemOfSameType(branch);
    tree.addApicalMeristem(meristem);
    this.attachDir *= -1;
  }

  extendSegment(){
    this.segment.lengthen(0.1);

    if (this.segment.length > TreeSegment.MAX_LENGTH){
      this.startNewSegment();
    }
  }

  startNewSegment(){
    const childSeg = new TreeSegment(0, this.segment);
    this.segment.attachToSegment
    this.attachToSegment(childSeg);
  }

  draw(){
    noStroke();
    fill(160, 230, 80);
    ellipse(0, 0, 5, 5);
  }
}
