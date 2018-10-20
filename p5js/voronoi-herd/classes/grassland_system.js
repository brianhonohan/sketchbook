class GrasslandSystem {
  constructor(params){
    this.params = params;
    this.bounds = new Rect(HerdMember.size, HerdMember.size,
                            width - 2 * HerdMember.size, 
                            height - 2 * HerdMember.size);
    this.herd = new Herd(params, this);
    this.predator = new Predator(random(width), random(height));
    this.herd.noticePredator(this.predator);
  }

  tick(){
    this.herd.tick();
  }

  draw(){
    this.herd.draw();
    this.predator.draw();
  }
}