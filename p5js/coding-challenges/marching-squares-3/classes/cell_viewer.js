class CellViewer {
  constructor(cellWidth, cellHeight, grid){
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.grid = grid;

    this.halfCellWidth = cellWidth / 2;
    this.halfCellHeight = cellHeight / 2;

    this.renderMarginX = Math.floor(0.25 * cellWidth);
    this.renderMarginY = Math.floor(0.25 * cellHeight);

    this.isPixelRenderer = (cellWidth <= 6);
    this.rectRenderFunction = (this.isPixelRenderer) ? this._fillCellsViaPixels : this._fillCellsViaRect;

    this.fillColor = color(50, 200, 200);

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

    // class variables to avoid garbage collection
    // should not be used outside of this._drawInterpolatedLines()
    this.pt0 = createVector();
    this.pt1 = createVector();
    this.pt2 = createVector();
    this.pt3 = createVector();

    this.precomputeVerticesForCase();
    this.precomputePointsForCase();
  }

  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    stroke(50, 200, 200);

    if (tmpCell.system.settings.drawGrid){
      fill(50);
      strokeWeight(1);
      rect(tmpX, tmpY, cellWidth, cellHeight);
    }
    
    if (tmpCell.value > 0 && tmpCell.system.settings.fillRect) {
      fill(50, 200, 200);
      rect(tmpX + 0.25 * this.cellWidth, tmpY + 0.25 * this.cellHeight,
                   this.halfCellWidth, this.halfCellHeight);
    }
    // noFill();
    // text("" + tmpCell.value, tmpX + cellWidth / 2, tmpY + cellHeight/2);

    stroke(200, 200, 40);
    strokeWeight(2);
    this.renderMarchingGridTile(tmpCell, tmpX, tmpY);
  }

  renderCells(cells){
    if (this.system.settings.drawGrid){
      stroke(this.fillColor);
      strokeWeight(1);
      for(let i=1; i< (this.grid.numRows-1); i++){
        line(0, i * this.cellHeight, width, i * this.cellHeight);
      }
      for(let i=1; i< (this.grid.numCols-1); i++){
        line(i * this.cellWidth, 0, i * this.cellWidth, height);
      }
    }

    if (this.system.settings.fillRect ) {
      this.rectRenderFunction(cells);
    }
      
    if (this.system.settings.interpolate_lines){
      this._drawInterpolatedLines(cells);
    } else {
      this._drawSimpleLines(cells);
    }
  }

  _fillCellsViaRect(cells){
    if (this.cellWidth <= 4){
      return;
    }

    fill(this.fillColor);
    noStroke();
    for(let i=0; i<cells.length; i++){
      if (cells[[i]].value == 0){ continue; }
      rect( (i % this.grid.numCols) * this.cellWidth + 0.25 * this.cellWidth,
          Math.floor(i / this.grid.numCols) * this.cellHeight + 0.25 * this.cellHeight,
          this.halfCellWidth, this.halfCellHeight);
    }
  }
  _fillCellsViaPixels(cells){
    loadPixels();
    const r = red(this.fillColor);
    const g = green(this.fillColor);
    const b = blue(this.fillColor);

    let cellX;
    let cellY;
    let j;
    let k;
    let pixelX;
    let pixelY;
    let pixelIndex;

    for(let i=0; i<cells.length; i++){
      if (cells[[i]].value == 0){ continue; }

      cellX = Math.floor((i % this.grid.numCols) * this.cellWidth + this.renderMarginX);
      cellY = Math.floor(Math.floor(i / this.grid.numCols) * this.cellHeight + this.renderMarginY);

      for (j = 0; j < this.halfCellWidth; j++){
        for (k = 0; k < this.halfCellHeight; k++){
          pixelX = cellX + j;
          pixelY = cellY + k;
          pixelIndex = ((pixelY * width) + pixelX) * 4;
          pixels[pixelIndex + 0] = r;
          pixels[pixelIndex + 1] = g;
          pixels[pixelIndex + 2] = b;
          pixels[pixelIndex + 3] = 255;
        }
      }
    } 
    updatePixels();
  }

  _drawSimpleLines(cells){
    stroke(200, 200, 40);
    strokeWeight(2);
    for(let i=0; i<cells.length; i++){
      this.renderMarchingGridTile(cells[i], 
        (i % this.grid.numCols) * this.cellWidth,
        Math.floor(i / this.grid.numCols) * this.cellWidth
      );
    }
  }

  drawLine(v1, v2){
    line(v1.x, v1.y, v2.x, v2.y);
  }

  _drawInterpolatedLines(cells){
    stroke(200, 200, 40);
    strokeWeight(2);

    let cellValue;
    let valueToRight;
    let valueBelow;
    let valueDownToRight;

    let interpAmt;

    let cellX;
    let cellY;
    const numCols = this.grid.numCols;

    let debugged = false;

    for(let i=0; i< (cells.length - numCols); i++){
      if (cells[i].mgCase == undefined) { continue; }
      if (cells[i].mgCase == 0 || cells[i].mgCase == 15) { 
        continue;
      }

      if ((i + 1) % numCols == 0) { continue; }

      cellValue = cells[i].rawValue;
      valueToRight = cells[i + 1].rawValue;
      valueDownToRight = cells[i + numCols + 1].rawValue;
      valueBelow = cells[i + numCols].rawValue;

      // Need to add 'halfWdidth' because I treat the 'value' as existing
      // at the center point of the cell; might rethink that.
      // ... causes 2 additional floating point operatinos per cell, per iteration
      cellX = (i % numCols) * this.cellWidth + this.halfCellWidth;
      cellY = Math.floor(i / numCols) * this.cellWidth + this.halfCellHeight;

      // FROM https://editor.p5js.org/codingtrain/sketches/18cjVoAX1
      interpAmt = (1 - cellValue) / (valueToRight - cellValue);
      this.pt0.x = lerp(cellX, cellX + this.cellWidth, interpAmt);
      this.pt0.y = cellY;

      interpAmt = (1 - valueToRight) / (valueDownToRight - valueToRight);
      this.pt1.x = cellX + this.cellWidth;
      this.pt1.y = lerp(cellY, cellY + this.cellWidth, interpAmt);

      interpAmt = (1 - valueBelow) / (valueDownToRight - valueBelow);
      this.pt2.x = lerp(cellX, cellX + this.cellWidth, interpAmt);
      this.pt2.y = cellY + this.cellWidth;

      interpAmt = (1 - cellValue) / (valueBelow - cellValue);
      this.pt3.x = cellX;
      this.pt3.y = lerp(cellY, cellY + this.cellWidth, interpAmt);

      this._renderInterpolatedLines(cells[i]);
    }
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

  precomputePointsForCase(){
    this.pointsForCase = [];

    this.pointsForCase[0] = [];
    this.pointsForCase[15] = [];

    this.pointsForCase[1] = [this.pt0, this.pt3];
    this.pointsForCase[14] = [this.pt0, this.pt3];
    
    this.pointsForCase[2] = [this.pt0, this.pt1];
    this.pointsForCase[13] = [this.pt0, this.pt1];
    
    this.pointsForCase[3] = [this.pt3, this.pt1];
    this.pointsForCase[12] = [this.pt3, this.pt1];

    this.pointsForCase[4] = [this.pt1, this.pt2];
    this.pointsForCase[11] = [this.pt1, this.pt2];

    this.pointsForCase[5] = [[this.pt0, this.pt1], [this.pt2, this.pt3]];
    this.pointsForCase[10] = [[this.pt0, this.pt3], [this.pt1, this.pt2]];

    this.pointsForCase[6] = [this.pt0, this.pt2];
    this.pointsForCase[9] = [this.pt0, this.pt2];

    this.pointsForCase[7] = [this.pt3, this.pt2];
    this.pointsForCase[8] = [this.pt3, this.pt2];
  }

  
  renderMarchingGridTile(tmpCell, x, y){
    if (tmpCell.mgCase == undefined) { return; }
    if (tmpCell.mgCase == 0 || tmpCell.mgCase == 15) { 
      return;
    }

    if (tmpCell.mgCase == 5 || tmpCell.mgCase == 10) { 
      this._drawFromTo(x, y, this.verticesForCase[tmpCell.mgCase][0][0], this.verticesForCase[tmpCell.mgCase][0][1]);
      this._drawFromTo(x, y, this.verticesForCase[tmpCell.mgCase][1][0], this.verticesForCase[tmpCell.mgCase][1][1]);
      return;
    }
    this._drawFromTo(x, y, this.verticesForCase[tmpCell.mgCase][0], this.verticesForCase[tmpCell.mgCase][1]);
  }

  
  _renderInterpolatedLines(cell){
    if (cell.mgCase == undefined) { return; }
    if (cell.mgCase == 0 || cell.mgCase == 15) { 
      return;
    }

    if (cell.mgCase == 5 || cell.mgCase == 10) { 
      this.drawLine(this.pointsForCase[cell.mgCase][0][0], this.pointsForCase[cell.mgCase][0][1]);
      this.drawLine(this.pointsForCase[cell.mgCase][1][0], this.pointsForCase[cell.mgCase][1][1]);
      return;
    }
    this.drawLine(this.pointsForCase[cell.mgCase][0], this.pointsForCase[cell.mgCase][1]);
  }

  _drawFromTo(x, y, fromIdx, toIdx){
    line(x + this.mgXOffsets[fromIdx], y + this.mgYOffsets[fromIdx],
         x + this.mgXOffsets[toIdx], y + this.mgYOffsets[toIdx]);
  }
}
