class TreeSegment {
  constructor(attachAngle, parent){
    this.attachAngle = attachAngle;
    this.length = 0;
    this.width = 0.25;
    this.apicalMeristem = null;
    this.childSegments = null;

    this.parent = parent;
    this.parent.addChildSegment(this);
    this.leaves = [];
    this.bud = null;
    this.auxinLevel = 0;
  }

  static get MAX_LENGTH() { return 20; } // Purely in terms of data modeling

  attachAM(apicalMeristem){
    this.apicalMeristem = apicalMeristem;
  }

  disassociateFromAM(){
    this.apicalMeristem = null;
  }

  attachLeaf(leaf){
    this.leaves.push(leaf);
  }

  addChildSegment(segment){
    if (this.childSegments === null){
      this.childSegments = [];
    }
    this.childSegments.push(segment);
  }

  receiveAuxin(auxin){
    this.auxinLevel = Math.min(this.auxinLevel + auxin, 1);
  }

  transmitAuxin(){
    if (this.auxinLevel == 0) {
      return;
    }

    let auxinAmt = 0.15 * this.auxinLevel; 
    this.auxinLevel -= auxinAmt;
    if (this.auxinLevel < 0.05) {
      this.auxinLevel = 0;
    }
    this.parent.receiveAuxin(auxinAmt);
  }

  lengthen(delta){
    this.length += delta;
  }

  tick(){
    if (this.bud) { 
      this.bud.tick();
    }
    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.tick());
    }

    if (this.auxinLevel > 0.95){
      this.lengthen(0.2);
    }else{
      this.width += 0.005;
    }
    this.auxinLevel *= 0.85;
    this.transmitAuxin();
  }

  draw(){
    push();
    rotate(this.attachAngle);

    const greenBlueAmt = 255 - this.auxinLevel * 255;
    stroke(255, greenBlueAmt, greenBlueAmt);

    strokeWeight(this.width);
    line(0, 0, this.length, 0);
    
    translate(this.length, 0);
    if (this.apicalMeristem) {
      this.apicalMeristem.draw();
    }

    this.leaves.forEach(leaf => leaf.draw());
    if (this.bud) { 
      this.bud.draw();
    }

    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.draw());
    }
    pop();
  }
}
