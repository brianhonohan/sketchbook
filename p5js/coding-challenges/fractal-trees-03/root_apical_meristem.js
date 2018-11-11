class RootApicalMeristem extends ApicalMeristem {
  constructor(segment){
    super(segment);
    this.attachAngle = PI / 2.2;
    this.direction = RootApicalMeristem.DIRECTION_DOWN;
  }

  static get DIRECTION_DOWN(){ return 0; }
  static get DIRECTION_LEFT(){ return 1; }
  static get DIRECTION_RIGHT(){ return 2; }

  addBranch(){
    let branch = new TreeSegment(this.attachAngle * this.attachDir, this.segment);
    let meristem = this.meristemOfSameType(branch);

    if (this.direction == RootApicalMeristem.DIRECTION_DOWN) {
      if (this.attachDir > 0){
        meristem.direction = RootApicalMeristem.DIRECTION_RIGHT;
        meristem.attachDir = -1;  
      } else {
        meristem.direction = RootApicalMeristem.DIRECTION_LEFT;
        meristem.attachDir = 1;  
      }
      this.attachDir *= -1;  
    }
    tree.addApicalMeristem(meristem);
  }

  startNewSegment(){
    let angleRange = random(-0.1, 0.1) * this.attachDir;
    const childSeg = new TreeSegment(angleRange, this.segment);
    this.segment.attachToSegment
    this.attachToSegment(childSeg);
  }

  meristemOfSameType(segment){
    return new RootApicalMeristem(segment);
  }
}
