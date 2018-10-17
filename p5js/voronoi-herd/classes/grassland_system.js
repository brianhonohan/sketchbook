class GrasslandSystem {
  constructor(params){
    this.params = params;
    this.herd = new Herd(params);
    this.predator = new Predator(random(width), random(height));
  }

  tick(){

  }

  draw(){
    this.herd.draw();
    this.predator.draw();
  }
}