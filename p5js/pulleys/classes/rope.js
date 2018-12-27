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

  containsXY(x, y){
    return false;
  }

  wrapAround(pulley){
    this.activeSegment.endAt(pulley);
    this.activeSegment = new RopeSegment(this);
    this.activeSegment.startAt(pulley);
    this.segments.push(this.activeSegment);
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
