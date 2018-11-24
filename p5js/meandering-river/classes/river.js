class River {
  constructor(start, end, floodPlain){
    this.start = start;
    this.end = end;
    this.plain = floodPlain;

    this.segments = [];
    this.segments.push( new RiverSegment(start, end) );
  }

  draw(){
    this.segments.forEach(s => s.draw());
  }
}