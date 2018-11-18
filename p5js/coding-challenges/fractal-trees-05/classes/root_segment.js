class RootSegment {
  constructor(x, y, parent){
    this.pos = createVector(x, y);
    this.parent = parent;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  static setStyle(){
    stroke(230);
  }

  draw(){
    line(this.parent.x, this.parent.y, this.x, this.y);
  }
}
