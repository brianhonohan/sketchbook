class RootTip {
  constructor(x, y, growingSegment){
    this.x = x;
    this.y = y;
    this.growingSegment = growingSegment;
  }

  static setStyle(){
    stroke(240, 240, 30);
  }

  draw(){
    line(this.growingSegment.x, this.growingSegment.y, this.x, this.y);
  }
}
