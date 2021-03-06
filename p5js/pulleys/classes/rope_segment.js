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

  detach(){
    this.detachStart();
    this.detachEnd();
  }

  detachStart(){
    if (this.startObj) {
      this.startObj.detachRopeSegment(this);
      this.startObj = null;
    }
  }

  detachEnd(){
    console.log(`detaching end`);
    if (this.endObj) {
      this.endObj.detachRopeSegment(this);
      this.endObj = null;
    }
  }

  endPt(){
    if (this.endObj) {
      return this.endObj.ropeAttachmentPoint(this.startObj);
    }else{
      return system.mousePt;
    }
  }

  vectorStartToEnd(){
    let nextPoint = this.endPt();
    let startTieOff = this.startObj.ropeAttachmentPoint(nextPoint);
    return createVector(nextPoint.x - startTieOff.x,
                        nextPoint.y - startTieOff.y);
  }

  addTension(pullingForce, fromObject){
    if (fromObject == this.startObj) {
      this.rope.addTension(pullingForce * -1);
    } else if (fromObject == this.endObj){
      this.rope.addTension(pullingForce);
    }
  }

  tensionOn(object){
    if (this.rope.tension == 0){
      return createVector(0, 0);
    }
    const tensionVector = this.vectorStartToEnd()
                                      .copy()
                                      .normalize()
                                      .mult(this.rope.tension);

    if (object == this.startObj) {
      return tensionVector;
    } else if (object == this.endObj){
      return tensionVector; // .mult(-1); // Think it should be reversed ... 
    }
  }

  draw(){
    let nextPoint = this.endPt();
    let startTieOff = this.startObj.ropeAttachmentPoint(nextPoint);

    line(startTieOff.x, startTieOff.y, nextPoint.x, nextPoint.y);
  }
}
