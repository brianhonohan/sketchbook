class CellGrid {
  /*
  Description: This class provides several functions to work with a 2D grid of cells
  - Determins number of rows / columns of a grid, given its area and cellWidth (square cells)
  - Utility functions around determining neighbors of cell (either as indices or cells themself) 
  - [Optionally] Initializer of a grid, calling the 'CellProvider' to build cells 
  - [Optionally] Renderer with the aide of the 'CellViewer' to display cells
  - [Optionally] Holder of the cell array

  An alternate usage is to have the surrounding context maintain the 'cells' and merely use this
  to walk through the array.

  @param rect - An object that has x,y, width, height properties
  @param CellProvider - Optional, only necessary if using initCells for callback to build each cell
  @param cellWidth - Optional, defaults to 20 px for each cell
  @param cellViewer - Optional, only necessary if using the renderViews functions
  */
  constructor (rect, cellProvider, cellWidth = 20, cellViewer){
    this._x = rect.x;
    this._y = rect.y;
    this._width = rect.width;
    this._height = rect.height;
    this.cellProvider = cellProvider;

    this.cellWidth = cellWidth;
    this.cellHeight = cellWidth;
    this.cellSpacing = 0;

    this.effectCellWidth = this.cellWidth + this.cellSpacing;
    this.effectCellHeight = this.cellHeight + this.cellSpacing;

    if (cellViewer){ 
      this.cellViewer = cellViewer;
    } else if (typeof CellViewer === 'function'){
      this.cellViewer = new CellViewer(cellWidth, this.cellHeight, this);
    }

    this.wrap = false;

    this.numCols = CellGrid.getColCount(rect, this.effectCellWidth);
    this.numRows = CellGrid.getRowCount(rect, this.effectCellHeight);
    this.numCells = this.numCols * this.numRows;
  }

  // Note, by using 'ceil' we will overstep the bounds of the width/height;
  static getColCount(rect, cellSize){
    return Math.ceil( (1.0 * rect.width)  / cellSize );
  }
  static getRowCount(rect, cellSize){
    return Math.ceil( (1.0 * rect.height)  / cellSize );
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
    return this.isEdgeRowCol(rowCol.row, rowCol.col);
  }

  rowColForIdx(idx){
    return {row: floor(idx / this.numCols), col: idx % this.numCols};
  }

  idxForRowCol(row, col){
    if (row >= this.numRows || col >= this.numCols){
      return undefined;
    }
    return row * this.numCols + col;
  }

  cellForXY(x, y){
    return this.cells[ this.idxForXY(x, y) ];
  }

  idxForXY(x, y){
    let col = floor( (x - this._x) / this.cellWidth);
    let row = floor( (y - this._y) / this.cellWidth);
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

  cellNeighborsOfIdx(idx){
    return this.neighborsOfIdx(idx).map(this.cellAtIdx, this);
  }

  cellAtIdx(idx){
    return this.cells[idx]; 
  }

  cellToRight(idx){
    return this.cellAtIdx(this.cellIndexToRight(idx));
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
    return this.cellAtIdx(this.cellIndexToLeft(idx));
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
    return this.cellAtIdx(this.cellIndexBelow(idx));
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
    return this.cellAtIdx(this.cellIndexAbove(idx));
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

  cellDownToRight(idx){
    return this.cells[this.cellIndexDownToRight(idx)];
  }

  cellIndexDownToRight(idx){
    let idxD2R = idx + this.numCols + 1;
    if (idxD2R > (this.numCells-1)){
      if (this.wrap) {
        idxD2R = idxD2R % this.numCells;
      }else{
        idxD2R = undefined;
      }
    }
    return idxD2R;
  }

  renderViews(){
    push();
    translate(this._x, this._y);

    let tmpX;
    let tmpY;
    let tmpCell;

    if (this.cellViewer.isPixelRenderer){
      loadPixels();
    }
    for(let i=0; i<this.cells.length; i++){
      tmpCell = this.cells[i];
      tmpX = tmpCell._col * this.effectCellWidth;
      tmpY = tmpCell._row * this.effectCellHeight;

      this.cellViewer.renderCell(tmpCell, tmpX, tmpY, 
                              this.cellWidth, this.cellHeight);
    }

    if (this.cellViewer.isPixelRenderer){
      updatePixels();
    }
    pop();
  }

  renderViewsAsNeeded(){
    const cellsToRender = this.cells.filter(cell => cell._needsRender);
    if (cellsToRender.length == 0){
      return;
    }

    push();
    translate(this._x, this._y);

    let tmpX;
    let tmpY;

    if (this.cellViewer.isPixelRenderer){
      loadPixels();
    }

    cellsToRender.forEach((cell) => {
                tmpX = cell._col * this.effectCellWidth;
                tmpY = cell._row * this.effectCellHeight;

                this.cellViewer.renderCell(cell, tmpX, tmpY, 
                              this.cellWidth, this.cellHeight);
                cell._needsRender = false;
              });

    if (this.cellViewer.isPixelRenderer){
      updatePixels();
    }
    pop();
  }
}
