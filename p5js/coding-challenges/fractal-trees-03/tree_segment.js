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

  lengthen(delta){
    this.length += delta;
  }

  tick(){
    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.tick());
    }
    this.width += 0.005;
  }

  draw(){
    push();
    rotate(this.attachAngle);
    strokeWeight(this.width);
    line(0, 0, this.length, 0);
    
    translate(this.length, 0);
    if (this.apicalMeristem) {
      this.apicalMeristem.draw();
    }

    this.leaves.forEach(leaf => leaf.draw());

    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.draw());
    }
    pop();
  }
}
