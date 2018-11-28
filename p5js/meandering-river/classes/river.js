class River {
  constructor(start, end, floodPlain){
    this.source = new RiverSource(start, 0);
    this.end = end;
    this.plain = floodPlain;
    this.params = params;

    this.segments = [];
    this.numStartingSegments = this.params.num_segments;
    this.initWithSinuousSegments();
  }

  get x(){ return this.source.pos.x; }
  get y(){ return this.source.pos.y; }

  get mouth(){ return this.segments[this.segments.length - 1].end; }

  initSegments(){
    if (this.numStartingSegments == 1){
      this.initWithOneSegment();
    }else{
      this.initWithSinuousSegments();
    }
  }

  initWithOneSegment(){
    this.segments.push( new RiverSegment(this.end.copy(), this.source) );
  }

  initWithSinuousSegments(){
    let amplitude = this.params.wave_amplitude;
    let frequency = this.params.wave_frequency;
    
    let length = this.end.x - this.x;

    let xOffset = this.x;
    let xIncrement = length / this.numStartingSegments;
    let thetaPerX = TWO_PI / length;
    let parent = this.source;

    for (var i = 1; i <= this.numStartingSegments; i++){
      let x = this.x + i * xIncrement;
      let y = this.y + amplitude * sin(frequency * thetaPerX * (x - xOffset));
      let pos = createVector(x, y);
      let segment = new RiverSegment(pos, parent);
      this.segments.push(segment);
      parent = segment;
    }
  }

  smooth(){
    
  }

  draw(){
    this.source.draw();
    this.segments.forEach(s => s.draw());

    noStroke();
    fill(200, 200, 50);
    ellipseMode(CENTER);
    ellipse(this.mouth.x, this.mouth.y, 10, 10);
  }
}