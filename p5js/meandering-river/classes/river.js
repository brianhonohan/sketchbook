class River {
  constructor(start, end, floodPlain){
    this.source = new RiverSource(start);
    this.end = end;
    this.plain = floodPlain;

    this.segments = [];
    this.numStartingSegments = 8;
    this.initWithSinuousSegments();
  }

  get x(){ return this.source.pos.x; }
  get y(){ return this.source.pos.y; }

  initSegments(){
    if (this.numStartingSegments == 1){
      this.initWithOneSegment();
    }else{
      this.initWithSinuousSegments();
    }
  }

  initWithOneSegment(){
    this.segments.push( new RiverSegment(this.end, this.source) );
  }

  initWithSinuousSegments(){
    let amplitude = 50;
    let frequency = 3;
    
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
    this.end = parent.end;
  }

  draw(){
    noStroke();
    fill(200, 200, 50);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);

    this.segments.forEach(s => s.draw());

    noStroke();
    fill(200, 200, 50);
    ellipseMode(CENTER);
    ellipse(this.end.x, this.end.y, 10, 10);
  }
}