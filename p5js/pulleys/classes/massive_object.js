class MassiveObject extends Particle {
  constructor(x, y, mass = 10){
    super(x, y);
    this.mass = mass;
  }

  applyForce(force){
    this.accel.add(force.copy().div(this.masss));
  }

  containsXY(x, y){
    return (this.x - 10) <= x && x < (this.x + 10) 
           &&  (this.y - 10) <= y && y < (this.y + 10);
  }

  draw(){
    rectMode(CENTER);
    stroke(230);
    strokeWeight(2);

    if (this.containsXY(system.mouseX, system.mouseY)){
      fill(200, 200, 50);
    } else {
      fill(50, 50, 200);
    }
    rect(this.x, this.y, 20, 20);
  }
}
