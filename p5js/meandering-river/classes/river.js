class River {
  constructor(start, end, floodPlain){
    this.source = new RiverSource(start);
    this.end = end;
    this.plain = floodPlain;

    this.segments = [];
    this.segments.push( new RiverSegment(end, this.source) );
  }

  draw(){
    this.segments.forEach(s => s.draw());
  }
}