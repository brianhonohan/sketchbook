class MassiveObject extends Particle {
  constructor(x, y, mass = 10){
    super(x, y);
    this.mass = mass;
  }

  ropeTieOffPoint(from){
    return createVector(this.x, this.y - 10);
  }

  isPulley(){
    return false;
  }

  applyForce(force){
    this.accel.add(force.copy().div(this.mass));
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
      fill(colorScheme.hover);
    } else {
      fill(colorScheme.object);
    }
    rect(this.x, this.y, 20, 20);
  }
}
