class Cell {
  constructor(x, y, index, parent){
    this.pos = createVector(x, y);
    this._idx = index;
    this.parent = parent;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
}
