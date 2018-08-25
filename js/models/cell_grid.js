class CellGrid {
  constructor (rect, cellProvider, cellWidth){
    this._x = rect._x;
    this._y = rect._y;
    this._width = rect._width;
    this._height = rect._height;
    this.cellProvider = cellProvider;

    this.cellWidth = cellWidth;
    this.cellHeight = cellWidth;
    this.cellSpacing = 0;

    this.initCells();
    this.wrap = false;
  }

  initCells() {
    this.cells = [];
    this.cellViewers = [];

    let effectCellWidth = this.cellWidth + this.cellSpacing;
    let effectCellHeight = this.cellHeight + this.cellSpacing;

    // Note, by using 'ceil' we will overstep the bounds of the width/height;
    this.numCols = Math.ceil( (1.0 * this._width)  / effectCellWidth );
    this.numRows = Math.ceil( (1.0 * this._height) / effectCellHeight );
    this.numCells = this.numCols * this.numRows;

    let tmpCell;
    let tmpCellViewer;
    let tmpRow;
    let tmpCol;

    let tmpX;
    let tmpY;

    for(let i=0; i<this.numCells; i++){
      tmpCol = i % this.numCols;
      tmpRow = Math.floor(i / this.numCols);
      tmpCell = this.cellProvider.createCell(tmpRow, tmpCol, i);

      tmpX = tmpCol * effectCellWidth;
      tmpY = tmpRow * effectCellHeight;

      tmpCellViewer = new CellViewer(tmpX, tmpY, this.cellWidth, this.cellHeight, tmpCell);

      this.cells.push(tmpCell);
      this.cellViewers.push(tmpCellViewer);
    }
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

  renderViews(){
    push();
    translate(this._x, this._y);

    let cellViewer;
    for(let i=0; i<this.cellViewers.length; i++){
      cellViewer = this.cellViewers[i];
      cellViewer.renderOnScale(-300, 0, 300);
    }
    pop();
  }
}
