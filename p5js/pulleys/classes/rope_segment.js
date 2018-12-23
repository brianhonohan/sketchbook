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
      nextPoint = this.endObj.ropeTieOffPoint(this.startObj);
    } else {
      nextPoint = mouseLoc;
    }
    let startTieOff = this.startObj.ropeTieOffPoint(nextPoint);

    line(startTieOff.x, startTieOff.y, nextPoint.x, nextPoint.y);
  }
}
