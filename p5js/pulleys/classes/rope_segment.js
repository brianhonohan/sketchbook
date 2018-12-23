class RopeSegment {
  constructor(rope, start, end){
    this.rope = rope;
    this.startObj = start;
    this.endObj   = end;
  }

  draw(){
    let mouseLoc = {x: system.mouseX, y: system.mouseY};
    let nextPoint;

    if (this.endObj) {
      nextPoint = this.endObj.ropeAttachmentPoint(this.startObj);
    } else {
      nextPoint = mouseLoc;
    }
    let startTieOff = this.startObj.ropeAttachmentPoint(nextPoint);

    line(startTieOff.x, startTieOff.y, nextPoint.x, nextPoint.y);
  }
}
