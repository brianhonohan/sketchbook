// Effectively the FloodPlain through which the river is meandering
class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;

    let start = createVector(this.area.minX, this.area.centerY);
    let end = createVector(this.area.maxX, this.area.centerY);
    this.river = new River(start, end);
  }

  tick(){
  }

  draw(){
    background(50);
    this.river.draw();
  }
}
