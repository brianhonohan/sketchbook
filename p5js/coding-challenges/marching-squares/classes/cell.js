class Cell {
  constructor(row, col, index, system){
    // variable names are dictated by CellGrid
    this._row = row;
    this._col = col;

    this._idx = index;
    this.system = system;
    this.grid = this.system.grid;
  }

  get cellAbove() { return this.grid.cellAbove(this._idx); }
  get cellToRight() { return this.grid.cellToRight(this._idx); }
  get cellBelow() { return this.grid.cellBelow(this._idx); }
  get cellToLeft() { return this.grid.cellToLeft(this._idx); }

  computeMarchingSquareTile(){
    if (this._row == (this.grid.numRows - 1)) { return; }
    if (this._col == (this.grid.numCols - 1)) { return; }

    const neighborsIdx = this.grid.neighborsOfIdx(this._idx);

    const cellToRight = this.grid.cellAtIdx(neighborsIdx[4]);
    const cellBelow = this.grid.cellAtIdx(neighborsIdx[6]);
    const cellDownToRight = this.grid.cellAtIdx(neighborsIdx[7]);

    this.mgCase = 0;

    // We are able to multiply by true/false because JS will implicitly convert to 1/0
    // and want to have a value from 0-15
    // corresponding to the tile, 
    // see basic algorithm: https://en.wikipedia.org/wiki/Marching_squares#Basic_algorithm
    this.mgCase += 1 * (this.value == 1);
    this.mgCase += 2 * (cellToRight.value == 1);
    this.mgCase += 4 * (cellDownToRight.value == 1);
    this.mgCase += 8 * (cellBelow.value == 1);
  }
}
