class RiverSegment {
  constructor(end, parent){
    this.end = end;
    this.parent = parent; 
    this.start = parent.end;
  }

  vectorFromParent(){
    return createVector(this.end.x - this.start.x, this.end.y - this.start.y);
  }

  halve(){
    this.end.x = this.start.x + (this.end.x - this.start.x) / 2;
    this.end.y = this.start.y + (this.end.y - this.start.y) / 2;
  }

  draw(){
    // stroke(224, 65, 90);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}