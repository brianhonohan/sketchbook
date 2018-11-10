class ApicalMeristem {
  constructor(segment){
    this.segment = null;
    this.attachToSegment(segment);
    this.attachDir = 1;
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

    if (frameCount % 200 == 0){
      this.segment.attachLeaf(new Leaf(PI/4 * this.attachDir));
      this.attachDir  *= -1;
      this.startNewSegment();
    }

    // todo: spawn buds
    // transmit auxin
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
    fill(40, 230, 40);
    ellipse(0, 0, 5, 5);
  }
}
