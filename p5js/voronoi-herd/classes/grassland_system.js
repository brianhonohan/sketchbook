class GrasslandSystem {
  constructor(){
    this.herd = new Herd();
    this.predator = new Predator(random(width), random(height));
  }

  tick(){

  }

  draw(){
    this.herd.draw();
    this.predator.draw();
  }
}