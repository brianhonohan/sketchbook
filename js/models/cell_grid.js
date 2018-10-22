class CellGrid {
  constructor (rect, cellProvider, cellWidth, cellViewer){
    this._x = rect._x;
    this._y = rect._y;
    this._width = rect._width;
    this._height = rect._height;
    this.cellProvider = cellProvider;

    this.cellWidth = cellWidth;
    this.cellHeight = cellWidth;
    this.cellSpacing = 0;

    this.effectCellWidth = this.cellWidth + this.cellSpacing;
    this.effectCellHeight = this.cellHeight + this.cellSpacing;

    this.cellViewer = cellViewer || new CellViewer();

    this.wrap = false;

    // Note, by using 'ceil' we will overstep the bounds of the width/height;
    this.numCols = Math.ceil( (1.0 * this._width)  / this.effectCellWidth );
    this.numRows = Math.ceil( (1.0 * this._height) / this.effectCellHeight );
    this.numCells = this.numCols * this.numRows;
  }

  initCells() {
    this.cells = [];

    let tmpRow;
    let tmpCol;
    let tmpCell;

    for(let i=0; i<this.numCells; i++){
      tmpCol = i % this.numCols;
      tmpRow = Math.floor(i / this.numCols);
      tmpCell = this.cellProvider.createCell(tmpRow, tmpCol, i);
      this.cells.push(tmpCell);
    }
  }

  isEdgeRowCol(tmpRow, tmpCol){
    let isEdgeCell = tmpRow == 0 || tmpCol == 0;
    isEdgeCell |= tmpCol == (this.numCols-1);
    isEdgeCell |= tmpRow == (this.numRows-1);
    return isEdgeCell;
  }

  isEdgeIdx(idx){
    let rowCol = this.rowColForIdx(idx);
    return this.isEdgeCell(rowCol.row, rowCol.col);
  }

  rowColForIdx(idx){
    return {row: floor(idx / this.numRows), col: idx % this.numCols};
  }

  idxForRowCol(row, col){
    return row * this.numCols + col;
  }

  cellForXY(x, y){
    return this.cells[ this.idxForXY(x, y) ];
  }

  idxForXY(x, y){
    let col = floor(x / this.cellWidth);
    let row = floor(y / this.cellWidth);
    return this.idxForRowCol(row, col);
  }

  neighborsOfIdx(idx){
    let neighbors = [
        idx - this.numCols - 1
      , idx - this.numCols
      , idx - this.numCols + 1

      , idx - 1
      // idx itself
      , idx + 1

      , idx + this.numCols - 1
      , idx + this.numCols
      , idx + this.numCols + 1
    ];

    // if in first row
    if (idx < this.numCols){
      neighbors[0] = (this.wrap) ? neighbors[0] + this.numCells : undefined;
      neighbors[1] = (this.wrap) ? neighbors[1] + this.numCells : undefined;
      neighbors[2] = (this.wrap) ? neighbors[2] + this.numCells : undefined;
    }

    // if in left most column
    if (idx % this.numCols == 0){
      neighbors[0] = (this.wrap) ? neighbors[0] + this.numCols : undefined;
      neighbors[3] = (this.wrap) ? neighbors[3] + this.numCols : undefined;
      neighbors[5] = (this.wrap) ? neighbors[5] + this.numCols : undefined;
    }

    // if in right most column
    if (idx % this.numCols == (this.numCols - 1)){
      neighbors[2] = (this.wrap) ? neighbors[2] - this.numCols : undefined;
      neighbors[4] = (this.wrap) ? neighbors[4] - this.numCols : undefined;
      neighbors[7] = (this.wrap) ? neighbors[7] - this.numCols : undefined;
    }

    // if in bottom row
    if ((this.numCells - idx) <= this.numCols){
      neighbors[5] = (this.wrap) ? neighbors[5] - this.numCells : undefined;
      neighbors[6] = (this.wrap) ? neighbors[6] - this.numCells : undefined;
      neighbors[7] = (this.wrap) ? neighbors[7] - this.numCells : undefined;
    }
    return neighbors;
  }

  cellToRight(idx){
    return this.cells[this.cellIndexToRight(idx)];
  }

  cellIndexToRight(idx){
    let idxRight = idx + 1;
    if (idx % this.numCols == (this.numCols - 1)){
      if (this.wrap) {
        idxRight = idx - (this.numCols - 1);
      }else{
        idxRight = undefined;
      }
    }
    return idxRight;
  }

  cellToLeft(idx){
    return this.cells[this.cellIndexToLeft(idx)];
  }

  cellIndexToLeft(idx){
    let idxLeft = idx - 1;
    if (idx % this.numCols == 0){
      if (this.wrap) {
        idxLeft = idx + (this.numCols - 1);
      }else{
        idxLeft = undefined;
      }
    }
    return idxLeft;
  }

  cellBelow(idx){
    return this.cells[this.cellIndexBelow(idx)];
  }

  cellIndexBelow(idx){
    let idxBelow = idx + this.numCols;
    if (idxBelow > (this.numCols * this.numRows - 1)){
      if (this.wrap) {
        idxBelow %= this.numCols;
      }else{
        idxRight = undefined;
      }
    }
    return idxBelow;
  }

  cellAbove(idx){
    return this.cells[this.cellIndexAbove(idx)];
  }

  cellIndexAbove(idx){
    let idxAbove = idx - this.numCols;
    if (idxAbove < 0){
      if (this.wrap) {
        idxAbove = this.numCells - (idx % this.numCols);
      }else{
        idxAbove = undefined;
      }
    }
    return idxAbove;
  }

  renderViews(){
    push();
    translate(this._x, this._y);

    let tmpX;
    let tmpY;
    let tmpCell;

    for(let i=0; i<this.cells.length; i++){
      tmpCell = this.cells[i];
      tmpX = tmpCell._col * this.effectCellWidth;
      tmpY = tmpCell._row * this.effectCellHeight;

      this.cellViewer.renderCell(tmpCell, tmpX, tmpY, 
                              this.cellWidth, this.cellHeight);
    }
    pop();
  }
}
