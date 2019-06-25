class Cell {
  constructor(x, y, index, system){
    this.pos = createVector(x, y);
    this._idx = index;
    this.system = system;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
}
