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
  }

  initCells() {
    this.cells = [];
    this.cellViewers = [];

    let effectCellWidth = this.cellWidth + this.cellSpacing;
    let effectCellHeight = this.cellHeight + this.cellSpacing;

    // Note, by using 'ceil' we will overstep the bounds of the width/height;
    this.numCols = Math.ceil( (1.0 * this._width)  / effectCellWidth );
    this.numRows = Math.ceil( (1.0 * this._height) / effectCellHeight );

    let numCells = this.numCols * this.numRows;

    let tmpCell;
    let tmpCellViewer;
    let tmpRow;
    let tmpCol;

    let tmpX;
    let tmpY;

    for(let i=0; i<numCells; i++){
      tmpCol = i % this.numCols;
      tmpRow = Math.floor(i / this.numCols);
      tmpCell = this.cellProvider.createCell(tmpRow, tmpCol);

      tmpX = tmpCol * effectCellWidth;
      tmpY = tmpRow * effectCellHeight;

      tmpCellViewer = new CellViewer(tmpX, tmpY, this.cellWidth, this.cellHeight, tmpCell);

      this.cells.push(tmpCell);
      this.cellViewers.push(tmpCellViewer);
    }
  }

  cellIndexToRight(idx){
    let idxRight;
    if (idx == (this.numCols * this.numRows - 1)){
      idxRight =  0;
    } else if (idx % this.numCols == (this.numCols - 1)){
      idxRight = idx - (this.numCols - 1);
    }else {
      idxRight = idx + 1;
    }
    return idxRight;
  }

  cellIndexBelow(idx){
    let idxBelow = idx + this.numCols;
    if (idxBelow > (this.numCols * this.numRows - 1)){
      idxBelow %= this.numCols;
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
