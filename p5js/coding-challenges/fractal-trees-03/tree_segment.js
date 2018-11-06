class TreeSegment {
  constructor(attachAngle){
    this.attachAngle = attachAngle;
    this.length = 0;
    this.width = 0.25;
    this.apicalMeristem = null;
  }

  attachAM(apicalMeristem){
    this.apicalMeristem = apicalMeristem;
  }

  lengthen(delta){
    this.length += delta;
  }

  tick(){
  }

  draw(){
    push();
    rotate(this.attachAngle);
    line(0, 0, this.length, 0);
    
    if (this.apicalMeristem) {
      translate(this.length, 0);
      this.apicalMeristem.draw();
    }
    pop();
  }
}
