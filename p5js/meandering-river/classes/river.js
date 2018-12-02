class River {
  constructor(start, end, floodPlain){
    this.source = new RiverSource(start, 0);
    this.end = end;
    this.plain = floodPlain;
    this.params = params;

    this.segments = [];
    this.numStartingSegments = this.params.num_segments;
    this.initWithSinuousSegments();
    this.smooth();
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
    const curveTolerance = 0.2;
    for (var i = (this.segments.length-1); i > 0; i--){
      let segment = this.segments[i];
      let parent = segment.parent;

      let segmentVector = segment.vectorFromParent();
      let parentVector = segment.parent.vectorFromParent();
      let rotation = P5JsUtils.rotationBetweenVectors(parentVector, segmentVector);

      if (abs(rotation) < curveTolerance) {
        continue;
      }

      // store some values that will be modified
      let origParentLength = parentVector.mag();
      let origSegmentLength = segmentVector.mag();
      let vertex = parent.end.copy();
      let segmentEnd = segment.end.copy();

      // step 1: halve the parent segment
      parent.halve();

      // step 2: shorten the segment, and have it prep for broader curve
      let thetaOne = abs(rotation * 0.25);
      let newSegmentLength =  0.25 * origParentLength * Math.cos(thetaOne);
      let tmpVector = parentVector.copy().setMag(newSegmentLength);
      let curvature = Math.sign(rotation);
      tmpVector.rotate(thetaOne * curvature * -1);
      segment.end = parent.end.copy().add(tmpVector);

      // step 3: add 3 new segments curving back to original point
      let newSegments = [];
      tmpVector.rotate(thetaOne * curvature * 2);
      let seg2 = new RiverSegment(vertex, segment);
      newSegments.push(seg2);

      newSegmentLength =  0.25 * origSegmentLength * Math.cos(thetaOne);
      tmpVector.setMag(newSegmentLength);
      tmpVector.rotate(thetaOne * curvature * 2);
      let pos3 = vertex.copy().add(tmpVector);
      let seg3 = new RiverSegment(pos3, seg2);
      newSegments.push(seg3);

      tmpVector.rotate(thetaOne * curvature);
      let pos4 = vertex.copy().add(segmentVector.mult(0.5));
      let seg4 = new RiverSegment(pos4, seg3);
      newSegments.push(seg4);

      // step 4: add 1 final segment, connecting to the original segment End
      let seg5 = new RiverSegment(segmentEnd, seg4);
      newSegments.push(seg5);

      this.segments.splice(i + 1, 0, ...newSegments);

      // break;
    }
  }

  draw(){
    this.source.draw();
    let hue = 0;
    this.segments.forEach(s => {
      stroke(hue % 255, 65, 90);
      hue += 10;
      s.draw();
    });

    noStroke();
    fill(60, 75, 78);
    ellipseMode(CENTER);
    ellipse(this.mouth.x, this.mouth.y, 10, 10);
  }
}