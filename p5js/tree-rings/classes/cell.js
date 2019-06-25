class Cell {
  constructor(x, y, index, parent){
    this.pos = createVector(x, y);
    this._idx = index;
    this.parent = parent;
    this.type = Cell.TYPE_OTHER;
  }

  static get TYPE_PITH(){ return 0; }
  static get TYPE_OTHER(){ return 100; }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
}
