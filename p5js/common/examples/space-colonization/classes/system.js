class System {
  constructor(p_xSizeAndPos, params){
    this.area = p_xSizeAndPos;
    this.params = params;
  } 

  init(){
    this.space = new Space(this.area, this.params);
  }

  tick(){
    this.space.tick();
  }

  draw(){
    this.space.draw();
  }
}