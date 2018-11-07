class TreeSegment {
  constructor(attachAngle){
    this.attachAngle = attachAngle;
    this.length = 0;
    this.width = 0.25;
    this.apicalMeristem = null;
    this.childSegments = null;
  }

  static get MAX_LENGTH() { return 20; } // Purely in terms of data modeling

  attachAM(apicalMeristem){
    this.apicalMeristem = apicalMeristem;
  }

  lengthen(delta){
    this.length += delta;
  }

  tick(){
    if (this.length > TreeSegment.MAX_LENGTH){
      this.length = TreeSegment.MAX_LENGTH;
      this.refineDataModel();
    }

    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.tick());
    }
  }

  refineDataModel(){
    if (this.childSegments === null){
      this.childSegments = [];
    }
    const childSeg = new TreeSegment(0);
    if (this.apicalMeristem){
      this.apicalMeristem.attachToSegment(childSeg);
      this.apicalMeristem = null;
    }
    this.childSegments.push(childSeg);
  }

  draw(){
    push();
    rotate(this.attachAngle);
    line(0, 0, this.length, 0);
    
    translate(this.length, 0);
    if (this.apicalMeristem) {
      this.apicalMeristem.draw();
    }

    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.draw());
    }
    pop();
  }
}
