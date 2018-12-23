class Rope {
  constructor(){
    this.startObj = null;
    this.endObj   = null;
    this.pulleys = [];
    this.segments = [];
  }

  tieTo(object){
    if (this.startObj == null){
      this.startObj = object;
      this.activeSegment = new RopeSegment(this, object);
      this.segments.push(this.activeSegment);
    } else if (this.endObj == null){
      this.endObj = object;
      this.activeSegment.endObj = object;
      this.activeSegment = null;
    } else {
      console.log(`ERROR: Rope was tied off 3 or more times`);
      return;
    }
  }

  containsXY(x, y){
    return false;
  }

  wrapAround(pulley){
    this.pulleys.push(pulley);
  }

  draw(){
    stroke(colorScheme.rope);
    strokeWeight(1);

    this.segments.forEach(s => s.draw());
  }
}
