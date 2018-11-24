class RiverSegment {
  constructor(end, parent){
    this.end = end;
    this.parent = parent; 
    this.start = parent.end;
  }

  draw(){
    stroke(80, 120, 230);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}