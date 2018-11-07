class ApicalMeristem {
  constructor(segment){
    this.segment = null;
    this.attachToSegment(segment);
  }

  attachToSegment(segment){
    this.segment = segment;
    this.segment.attachAM(this);
  }

  tick(){
    this.segment.lengthen(0.1);

    // todo: spawn buds
    // transmit auxin
  }

  draw(){
    fill(40, 230, 40);
    ellipse(0, 0, 5, 5);
  }
}
