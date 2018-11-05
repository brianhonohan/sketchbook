class ApicalMeristem {
  constructor(attachAngle){
    this.attachAngle = attachAngle;
    this.length = 0;
  }

  tick(){
    this.length += 0.1;
  }

  draw(){
    push();
    rotate(this.attachAngle);
    line(0, 0, this.length, 0);
    pop();
  }
}
