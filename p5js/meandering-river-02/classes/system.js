// Effectively the FloodPlain through which the river is meandering
class System {
  constructor(p_xSizeAndPos, params){
    this.area = p_xSizeAndPos;
    this.params = params;

    let start = createVector(this.area.minX, this.area.centerY);
    let end = createVector(this.area.maxX, this.area.centerY);
    this.river = new River(start, end, params);
  }

  tick(){
  }

  draw(){
    this.river.draw();
  }
}
