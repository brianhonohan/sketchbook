class RootTip {
  constructor(x, y, growingSegment, primaryDirection, plant){
    this.pos = createVector(x, y);
    this.growingSegment = growingSegment;
    this.primaryDirection = primaryDirection;
    this.plant = plant;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  length(){
    return p5.Vector.mag( p5.Vector.sub(this.pos, this.growingSegment.pos) );
  }

  tick(){
    if (this.y > height * 0.8){
      return;
    }

    if (this.length() > 50) {
      this.startNewSegment();
    }
    this.pos.add(this.primaryDirection);
  }

  startNewSegment(){
    let rootSeg = new RootSegment(this.x, this.y, this.growingSegment);
    this.growingSegment = rootSeg;
    this.plant.addRootSegment(rootSeg);
  }

  static setStyle(){
    stroke(240, 240, 30);
  }

  draw(){
    line(this.growingSegment.x, this.growingSegment.y, this.x, this.y);
  }
}
