class RootSegment {
  constructor(x, y, parent){
    this.x = x;
    this.y = y;
    this.parent = parent;
  }

  static setStyle(){
    stroke(230);
  }

  draw(){
    line(this.parent.x, this.parent.y, this.x, this.y);
  }
}
