class Ridge {
  constructor(startingPoint, elev){
    this.pos = startingPoint;
    this.elev = elev;
    this.prevRidge   = undefined;
    this.nextRidges = [];
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

  attachTo(otherRidge){
    this.prevRidge = otherRidge;
    otherRidge.nextRidges.push(this);
  }
}
