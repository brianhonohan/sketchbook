class GridViewController {
  constructor (x, y, p_nWidth, p_nHeight){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;

    this.cellWidth = 20;
    this.cellHeight = 20;
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
      tmpCell = new Cell();
      tmpCol = i % this.numCols;
      tmpRow = Math.floor(i / this.numCols);
      // tmpCell.temp = map(tmpCol, 0, this.numCols, -300, 300);
      // tmpCell.temp = 100 * randomGaussian();
      tmpCell.temp = 300 * ( noise(tmpCol, tmpRow) - 0.5);

      tmpX = tmpCol * effectCellWidth;
      tmpY = tmpRow * effectCellHeight;

      tmpCellViewer = new CellViewer(tmpX, tmpY, this.cellWidth, this.cellHeight, tmpCell);

      this.cells.push(tmpCell);
      this.cellViewers.push(tmpCellViewer);
    }
  }

  addWallAt(globalX, globalY){
    let idxOfCell = this.getIdxForXY(globalX, globalY);

    if (idxOfCell < 0 || idxOfCell > (this.cells.length - 1)){
      return;
    }

    let tmpCell = this.cells[idxOfCell];
    tmpCell.isWall = true;
  }

  addHeatAt(globalX, globalY){
    this._deltaHeatAt(true, globalX, globalY);

  }
  removeHeatAt(globalX, globalY){
    this._deltaHeatAt(false, globalX, globalY);
  }

  _deltaHeatAt(addingHeat, globalX, globalY){
    let idxOfCell = this.getIdxForXY(globalX, globalY);

    if (idxOfCell < 0 || idxOfCell > (this.cells.length - 1)){
      return;
    }

    let tmpCell = this.cells[idxOfCell];

    let deltaTmp = 300;
    if (addingHeat == false){
      deltaTmp *= -1;
    }
    tmpCell.temp = constrain( tmpCell.temp + deltaTmp, -300, 300);
  }

  getIdxForXY(globalX, globalY){
    let inCol = (globalX - this._x) / (this.cellWidth + this.cellSpacing);
    let inRow = (globalY - this._y) / (this.cellHeight + this.cellSpacing);

    inCol = Math.floor(inCol);
    inRow = Math.floor(inRow);

    let idxOfCell = Math.floor(inCol + inRow * this.numCols);
    return idxOfCell;
  }

  step(){
    let tmpCell;
    let cellToRight;
    let cellBelow;
    for(let i=0; i < this.cells.length; i++){
      tmpCell = this.cells[i];
      cellToRight = this.cells[this.cellIndexToRight(i)];
      cellBelow = this.cells[this.cellIndexBelow(i)];

      tmpCell.exchangeHeat(cellToRight);
      tmpCell.exchangeHeat(cellBelow);
    }

    this.resolveHeatExchange();
  }

  resolveHeatExchange(){
    let tmpCell;
    for(let i=0; i < this.cells.length; i++){
      tmpCell = this.cells[i];
      tmpCell.resolveHeatExchange();
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
