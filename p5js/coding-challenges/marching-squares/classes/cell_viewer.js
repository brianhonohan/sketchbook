class CellViewer {
  constructor(cellWidth, cellHeight, grid){
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.grid = grid;

    this.halfCellWidth = cellWidth / 2;
    this.halfCellHeight = cellHeight / 2;

    this.mgXOffsets = [];
    this.mgYOffsets = [];
    this.mgXOffsets[0] = cellWidth;
    this.mgXOffsets[1] = cellWidth + this.halfCellWidth;
    this.mgXOffsets[2] = cellWidth;
    this.mgXOffsets[3] = this.halfCellWidth;
    
    this.mgYOffsets[0] = this.halfCellHeight;
    this.mgYOffsets[1] = cellHeight;
    this.mgYOffsets[2] = cellHeight + this.halfCellHeight;
    this.mgYOffsets[3] = cellHeight;
  }

  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    stroke(50, 200, 200);

    if (tmpCell.system.settings.drawGrid){
      rect(tmpX, tmpY, cellWidth, cellHeight);
    }
    
    if (tmpCell.value > 0) {
      fill(50, 200, 200);
      rect(tmpX + 0.25 * this.cellWidth, tmpY + 0.25 * this.cellHeight,
                   this.halfCellWidth, this.halfCellHeight);
    }
    // noFill();
    // text("" + tmpCell.value, tmpX + cellWidth / 2, tmpY + cellHeight/2);

    stroke(200, 200, 40);
    this.renderMarchingGridTile(tmpCell, tmpX, tmpY);
  }

  renderMarchingGridTile(tmpCell, x, y){
    if (tmpCell.mgCase == undefined) { return; }

    // 0  nothing
    // 1  /..
    // 2  ..\
    // 3  ---
    // 4  ../
    // 5  \\
    // 6  .|.  single vert line
    // 7  \..
    // 8  \..
    // 9  .|.   single vert line
    // 10 //
    // 11 ../
    // 12 ---
    // 13 ..\
    // 14 /..
    // 15 nothing

    if (tmpCell.mgCase == 0 || tmpCell.mgCase == 15) { 
      return;
    }

    if (tmpCell.mgCase == 1 || tmpCell.mgCase == 14) {
      this._drawFromTo(x, y, 0, 3);
      return;
    }
    if (tmpCell.mgCase == 2 || tmpCell.mgCase == 13) {
      this._drawFromTo(x, y, 0, 1);
      return;
    }
    if (tmpCell.mgCase == 3 || tmpCell.mgCase == 12) {
      this._drawFromTo(x, y, 3, 1);
      return;
    }
    if (tmpCell.mgCase == 4 || tmpCell.mgCase == 11) {
      this._drawFromTo(x, y, 1, 2);
      return;
    }
    if (tmpCell.mgCase == 5) {
      this._drawFromTo(x, y, 0, 1);
      this._drawFromTo(x, y, 2, 3);
      return;
    }
    if (tmpCell.mgCase == 10) {
      this._drawFromTo(x, y, 0, 3);
      this._drawFromTo(x, y, 1, 2);
      return;
    }
    if (tmpCell.mgCase == 6 || tmpCell.mgCase == 9) {
      this._drawFromTo(x, y, 0, 2);
      return;
    }
    if (tmpCell.mgCase == 7 || tmpCell.mgCase == 8) {
      this._drawFromTo(x, y, 3, 2);
      return;
    }
  }

  _drawFromTo(x, y, fromIdx, toIdx){
    line(x + this.mgXOffsets[fromIdx], y + this.mgYOffsets[fromIdx],
         x + this.mgXOffsets[toIdx], y + this.mgYOffsets[toIdx]);
  }
}
