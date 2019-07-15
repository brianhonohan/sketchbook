class Ridge {
  constructor(startingPoint, elev){
    this.pos = startingPoint;
    this.elev = elev;
    this.uphill   = undefined;
    this.downhill = [];
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

  attachTo(uphillRidge){
    this.uphill = uphillRidge;
    uphillRidge.downhill.push(this);
  }
}
