class RopeSegment {
  constructor(rope, start, end){
    this.rope = rope;
    this.startObj = start;
    this.endObj   = end;
  }

  endPt(){
    if (this.endObj) {
      return this.endObj.ropeAttachmentPoint(this.startObj);
    }else{
      return {x: system.mouseX, y: system.mouseY};
    }
  }

  draw(){
    let nextPoint = this.endPt();
    let startTieOff = this.startObj.ropeAttachmentPoint(nextPoint);

    line(startTieOff.x, startTieOff.y, nextPoint.x, nextPoint.y);
  }
}
