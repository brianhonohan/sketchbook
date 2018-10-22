class Cell {
  constructor(row, col, index, system){
    // variable names are dictated by CellGrid
    this._row = row;
    this._col = col;

    this._idx = index;
    this.system = system;
    this.grid = this.system.grid;

    this.a = 0; //random(1);
    this.b = 0; //random(1);
    this.nextA = 0;
    this.nextB = 0;
  }

  get cellAbove() { return this.grid.cellAbove(this._idx); }
  get cellToRight() { return this.grid.cellToRight(this._idx); }
  get cellBelow() { return this.grid.cellBelow(this._idx); }
  get cellToLeft() { return this.grid.cellToLeft(this._idx); }

}
