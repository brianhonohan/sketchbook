class Leaf {
  constructor(attachAngle){
    this.attachAngle = attachAngle;
  }

  draw(){
    push();
    rotate(this.attachAngle);
    strokeWeight(0.25);
    stroke(255);
    line(0,0, 10, 0);
    noStroke();
    fill(50, 180, 50);
    ellipse(15, 0, 10, 5);
    pop();
  }
}
