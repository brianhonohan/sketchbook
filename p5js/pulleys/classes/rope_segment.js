class RopeSegment {
  constructor(rope){
    this.rope = rope;
    this.startObj = null;
    this.endObj   = null;
  }

  startAt(object){
    this.startObj = object;
    object.attachRopeSegment(this);
  }

  endAt(object){
    this.endObj = object;
    object.attachRopeSegment(this);
  }

  endPt(){
    if (this.endObj) {
      return this.endObj.ropeAttachmentPoint(this.startObj);
    }else{
      return system.mousePt;
    }
  }

  draw(){
    let nextPoint = this.endPt();
    let startTieOff = this.startObj.ropeAttachmentPoint(nextPoint);

    line(startTieOff.x, startTieOff.y, nextPoint.x, nextPoint.y);
  }
}
