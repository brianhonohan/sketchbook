class ApicalMeristem {
  constructor(segment){
    this.segment = null;
    this.attachToSegment(segment);
  }

  attachToSegment(segment){
    if (this.segment) {
      this.segment.disassociateFromAM();
    }
    this.segment = segment;
    this.segment.attachAM(this);
  }

  tick(){
    this.extendSegment();

    // todo: spawn buds
    // transmit auxin
  }

  extendSegment(){
    this.segment.lengthen(0.1);

    if (this.segment.length > TreeSegment.MAX_LENGTH){
      const childSeg = new TreeSegment(0, this.segment);
      this.segment.attachToSegment
      this.attachToSegment(childSeg);
    }
  }

  draw(){
    noStroke();
    fill(40, 230, 40);
    ellipse(0, 0, 5, 5);
  }
}
