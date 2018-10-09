var maze;

function setup(){
  createCanvas(windowWidth, windowHeight);
  maze = new Maze(width, height);
  frameRate(0.5);
  strokeWeight(4);
}

function draw(){
  background(0);

  maze.draw();
}

class Maze {
  constructor(_width, _height) {
    this.cellWidth = 40;
    let mazeWidth = floor(width / this.cellWidth) * this.cellWidth;
    let mazeHeight = floor(height / this.cellWidth) * this.cellWidth;
    this.mazeSize = new Rect(0, 0, mazeWidth, mazeHeight);
    this.grid = new CellGrid(this.mazeSize, this, this.cellWidth);
    this.grid.initCells();
  }

  createCell(tmpRow, tmpCol, i){
    let cell = new MazeCell(tmpRow, tmpCol, i);

    if (this.grid.isEdgeRowCol(tmpRow, tmpCol)) {
      // effectively make walls around the overall grid
      cell.state = MazeCell.CELL_SOLID;
    }
    return cell;
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

    this.walls = [MazeCell.WALL_UNKNOWN, MazeCell.WALL_UNKNOWN];
    this.state = MazeCell.CELL_UNKNOWN;
  }

  static get WALL_UNKNOWN(){ return -1; }
  static get WALL_OPEN(){ return 0; }
  static get WALL_SOLID(){ return 1; }

  static get CELL_UNKNOWN(){ return -1; }
  static get CELL_OPEN(){ return 0; }
  static get CELL_SOLID(){ return 1; }

  get rightWall() {
    return this.walls[0];
  }

  get bottomWall() {
    return this.walls[1];
  }

  static get wall_states(){
    return [MazeCell.WALL_UNKNOWN, MazeCell.WALL_OPEN, MazeCell.WALL_SOLID];
  }

  static get cell_states(){
    return [MazeCell.CELL_UNKNOWN, MazeCell.CELL_OPEN, MazeCell.CELL_SOLID];
  }
}

// Class name is dictated by CellGrid
class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    fill(this.colorForCellState(tmpCell.state));
    noStroke();
    rect(tmpX, tmpY, cellWidth, cellHeight);

    stroke(this.colorForWallState(tmpCell.rightWall));
    line(tmpX + cellWidth, tmpY, tmpX + cellWidth, tmpY + cellHeight);

    stroke(this.colorForWallState(tmpCell.bottomWall));
    line(tmpX, tmpY + cellHeight, tmpX + cellWidth, tmpY + cellHeight);
  }

  get colors(){
    return {
      unknown: color(80),
      unknown_line: color(120),
      open: color(100, 180, 100),
      open_line: color(120, 200, 120),
      solid: color(0)
    };
  }

  colorForWallState(wallState){
    switch (wallState) {
      case MazeCell.WALL_UNKNOWN: return this.colors.unknown_line;
      case MazeCell.WALL_OPEN:    return this.colors.open_line;
      case MazeCell.WALL_SOLID: return this.colors.solid;
    }
  }

  colorForCellState(cellState){
    switch (cellState) {
      case MazeCell.CELL_UNKNOWN: return this.colors.unknown;
      case MazeCell.CELL_OPEN:    return this.colors.open;
      case MazeCell.CELL_SOLID:   return this.colors.solid;
    }
  }
}
