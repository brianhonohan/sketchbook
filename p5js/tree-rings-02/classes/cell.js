class Cell {
  constructor(x, y, index, parent){
    this.pos = createVector(x, y);
    this._idx = index;
    this.parent = parent;
    this.type = Cell.TYPE_OTHER;
  }

  static get TYPE_PITH(){ return 0; }
  static get TYPE_EARLY_GROWTH(){ return 1; }
  static get TYPE_LATE_GROWTH(){ return 2; }
  static get TYPE_SECONDARY_XYLEM(){ return 89; }
  static get TYPE_VASCULAR_CAMBIUM(){ return 90; }
  static get TYPE_SECONDARY_PHLOEM(){ return 91; }
  static get TYPE_OTHER(){ return 100; }
  static get TYPE_AIR(){ return 101; }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
}
