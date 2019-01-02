class Rope {
  constructor(){
    this.startObj = null;
    this.endObj   = null;
    this.segments = [];
    this.tension = 0;
  }

  startAt(object){
    this.startObj = object;
    this.activeSegment = new RopeSegment(this);
    this.activeSegment.startAt(object);
    this.segments.push(this.activeSegment);
  }

  endAt(object){
    this.endObj = object;
    this.activeSegment.endAt(object);
    this.activeSegment = null;
  }

  detach(){
    this.segments.forEach(seg => seg.detach());
  }

  containsXY(x, y){
    return false;
  }

  wrapOrUnwrap(pulley){
    if (this.previousObject() == pulley){
      this.unwrapAround(pulley);
    } else {
      this.wrapAround(pulley);
    }
  }

  wrapAround(pulley){
    if (pulley.hasRope()){
      return;
    }
    this.activeSegment.endAt(pulley);
    this.activeSegment = new RopeSegment(this);
    this.activeSegment.startAt(pulley);
    this.segments.push(this.activeSegment);
  }

  unwrapAround(pulley){
    pulley.detachRopeSegment(this);
    let x = this.segments.pop();
    this.activeSegment = this.segments[this.segments.length - 1];
    this.activeSegment.detachEnd();
  }

  previousObject(){
    return this.activeSegment.startObj;
  }

  addTension(tension){
    this.tension += tension;
  }

  postTick(){
    this.tension = 0;
  }

  draw(){
    stroke(colorScheme.rope);
    strokeWeight(1);

    this.segments.forEach(s => s.draw());
  }
}
