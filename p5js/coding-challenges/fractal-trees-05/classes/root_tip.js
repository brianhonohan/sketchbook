class RootTip {
  constructor(x, y, growingSegment, primaryDirection){
    this.pos = createVector(x, y);
    this.growingSegment = growingSegment;
    this.primaryDirection = primaryDirection;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  tick(){
    if (this.y > height * 0.8){
      return;
    }
    this.pos.add(this.primaryDirection);
  }

  static setStyle(){
    stroke(240, 240, 30);
  }

  draw(){
    line(this.growingSegment.x, this.growingSegment.y, this.x, this.y);
  }
}
