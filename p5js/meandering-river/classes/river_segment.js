class RiverSegment {
  constructor(start, end, river){
    this.start = start; 
    this.end = end;
    this.river = river;
  }

  draw(){
    stroke(50, 50, 230);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}