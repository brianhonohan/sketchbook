class RootTip {
  constructor(x, y, parent, primaryDirection, plant){
    this.pos = createVector(x, y);
    this.parent = parent;
    this.direction = primaryDirection;
    this.plant = plant;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  length(){
    return p5.Vector.mag( p5.Vector.sub(this.pos, this.parent.pos) );
  }

  tick(){
    if (this.y > height * 0.8){
      return;
    }

    if (this.length() > 50) {
      this.startNewSegment();
    }
    this.pos.add(this.direction);
  }

  startNewSegment(){
    let rootSeg = new RootSegment(this.x, this.y, this.parent);
    this.parent = rootSeg;
    this.plant.addRootSegment(rootSeg);
  }

  static setStyle(){
    stroke(240, 240, 30);
  }

  draw(){
    line(this.parent.x, this.parent.y, this.x, this.y);
  }
}
