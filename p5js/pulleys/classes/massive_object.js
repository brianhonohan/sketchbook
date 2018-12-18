class MassiveObject extends Particle {
  constructor(x, y, mass = 10){
    super(x, y);
    this.mass = mass;
  }

  applyForce(force){
    this.accel.add(force.copy().div(this.masss));
  }

  draw(){
    rectMode(CENTER);
    stroke(230);
    strokeWeight(2);
    fill(50, 50, 200);
    rect(this.x, this.y, 20, 20);
  }
}
