class RiverSegment {
  constructor(end, parent){
    this.end = end;
    this.parent = parent; 
    this.start = parent.end;
  }

  draw(){
    stroke(50, 50, 230);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}