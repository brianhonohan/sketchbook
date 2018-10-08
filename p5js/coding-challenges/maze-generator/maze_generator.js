var maze;

function setup(){
  createCanvas(windowWidth, windowHeight);
  maze = new Maze(width, height);
  frameRate(1);
}

function draw(){
  background(0);

  maze.draw();
}

class Maze {
  constructor(_width, _height) {
    this.cellWidth = 200;
    let mazeWidth = floor(width / this.cellWidth) * this.cellWidth;
    let mazeHeight = floor(height / this.cellWidth) * this.cellWidth;
    this.mazeSize = new Rect(0, 0, mazeWidth, mazeHeight);
    this.grid = new CellGrid(this.mazeSize, this, this.cellWidth);
  }

  createCell(tmpRow, tmpCol, i){
    return new MazeCell(tmpRow, tmpCol, i);
  }

  draw(){
    this.grid.renderViews();
  }
}

class MazeCell {
  constructor(row, col, index){
    // variable names are dictated by CellGrid
    this._row = row;
    this._col = col;
    this._idx = index;
  }
}

// Class name is dictated by CellGrid
class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    fill(50);
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }
}