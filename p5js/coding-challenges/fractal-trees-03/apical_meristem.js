class ApicalMeristem {
  constructor(segment){
    this.segment = null;
    this.attachToSegment(segment);
    this.attachDir = 1;
    this.attachAngle = PI / 8;
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

    // this.extendSegment();
    this.transmitAuxin();
    if (this.segment.length > TreeSegment.MAX_LENGTH){
      this.startNewSegment();
    }
  }

  addBranch(){
    let branch = new TreeSegment(this.attachAngle * this.attachDir, this.segment);
    let meristem = this.meristemOfSameType(branch);
    tree.addApicalMeristem(meristem);
    this.attachDir *= -1;
  }

  transmitAuxin(){
    this.segment.receiveAuxin(1);
  }

  extendSegment(){
    this.segment.lengthen(.2);
  }

  startNewSegment(){
    let angleRange = random(-0.4, 0.4) * this.attachDir;
    const childSeg = new TreeSegment(angleRange, this.segment);
    this.attachToSegment(childSeg);
  }

  draw(){
    noStroke();
    fill(160, 230, 80);
    ellipse(0, 0, 5, 5);
  }
}
