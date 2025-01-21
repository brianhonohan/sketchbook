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

    this.precomputeVerticesForCase();
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


  precomputeVerticesForCase(){
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

    this.verticesForCase = [];

    this.verticesForCase[0] = [];
    this.verticesForCase[15] = [];

    this.verticesForCase[1] = [0, 3];
    this.verticesForCase[14] = [0, 3];
    
    this.verticesForCase[2] = [0, 1];
    this.verticesForCase[13] = [0, 1];
    
    this.verticesForCase[3] = [3, 1];
    this.verticesForCase[12] = [3, 1];

    this.verticesForCase[4] = [1, 2];
    this.verticesForCase[11] = [1, 2];

    this.verticesForCase[5] = [[0, 1], [2,3]];
    this.verticesForCase[10] = [[0, 3], [1,2]];

    this.verticesForCase[6] = [0, 2];
    this.verticesForCase[9] = [0, 2];

    this.verticesForCase[7] = [3, 2];
    this.verticesForCase[8] = [3, 2];
  }

  
  renderMarchingGridTile(tmpCell, x, y){
    if (tmpCell.mgCase == undefined) { return; }
    if (tmpCell.mgCase == 0 || tmpCell.mgCase == 15) { 
      return;
    }

    if (tmpCell.mgCase == 5 || tmpCell.mgCase == 10) { 
      this._drawFromTo(x, y, this.verticesForCase[tmpCell.mgCase][0][0], this.verticesForCase[tmpCell.mgCase][0][1]);
      this._drawFromTo(x, y, this.verticesForCase[tmpCell.mgCase][1][0], this.verticesForCase[tmpCell.mgCase][1][1]);
      this._drawFromTo(x, y, 2, 3);
      return;
    }
    this._drawFromTo(x, y, this.verticesForCase[tmpCell.mgCase][0], this.verticesForCase[tmpCell.mgCase][1]);
  }

  _drawFromTo(x, y, fromIdx, toIdx){
    line(x + this.mgXOffsets[fromIdx], y + this.mgYOffsets[fromIdx],
         x + this.mgXOffsets[toIdx], y + this.mgYOffsets[toIdx]);
  }
}
