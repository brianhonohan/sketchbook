var maze;
var mazeGenerator;

function setup(){
  createCanvas(windowWidth, windowHeight);
  maze = new Maze(width, height);
  frameRate(10);
  strokeWeight(4);

  let startingCell = maze.startingCell();
  mazeGenerator = new MazeGenerator(maze, startingCell);
}

function draw(){
  background(0);

  maze.draw();
  mazeGenerator.draw();
}

function mousePressed(){
  mazeGenerator.tick();
}

class Maze {
  constructor(_width, _height) {
    this.cellWidth = 40;
    let mazeWidth = floor(width / this.cellWidth) * this.cellWidth;
    let mazeHeight = floor(height / this.cellWidth) * this.cellWidth;
    this.mazeSize = new Rect(0, 0, mazeWidth, mazeHeight);
    this.grid = new CellGrid(this.mazeSize, this, this.cellWidth);
    this.grid.initCells();

    // this.startingCell().state = MazeCell.CELL_OPEN;
    // this.targetCell().state = MazeCell.CELL_OPEN;
  }

  startingCell(){
    return this.grid.cells[this.grid.numCols + 1];
  }

  targetCell(){
    return this.grid.cells[this.numCells - this.grid.numCols - 1];
  }

  createCell(tmpRow, tmpCol, i){
    let cell = new MazeCell(tmpRow, tmpCol, i, this);

    if (this.grid.isEdgeRowCol(tmpRow, tmpCol)) {
      // effectively make walls around the overall grid
      cell.state = MazeCell.CELL_SOLID;
      cell.bottomWall = MazeCell.WALL_SOLID;
      cell.rightWall = MazeCell.WALL_SOLID;
    }
    if (tmpRow == this.grid.numRows-2){
      cell.bottomWall = MazeCell.WALL_SOLID;
    }
    if (tmpCol == this.grid.numCols-2){
      cell.rightWall = MazeCell.WALL_SOLID;
    }
    return cell;
  }

  draw(){
    this.grid.renderViews();
  }
}

class MazeGenerator {
  constructor(maze, cell, targetCell){
    this.maze = maze;
    this.visitedCells = [];
    this.moveToCell(cell);
    this.targetCell = targetCell;
    this.state = MazeGenerator.STATE_GENERATING;
  }

  static get STATE_GENERATING(){ return 0; }
  static get STATE_STUCK(){ return -1; }


  get x(){ 
    return this.maze.cellWidth/2 + this.cell._col * this.maze.cellWidth;
  }
  get y(){ 
    return this.maze.cellWidth/2 + this.cell._row * this.maze.cellWidth;
  }

  tick(){
    if (this.cell == this.maze.targetCell()){
      console.log("Got to the end!");
      return;
    }

    this.exploreCell();
  }

  moveToCell(cell){
    this.visitedCells.push(cell);
    this.cell = cell;
    this.cell.state = MazeCell.CELL_OPEN;
  }

  exploreCell(){
    let unknownWalls = this.cell.unknownWalls;

    if (unknownWalls == undefined || unknownWalls.length == 0){
      // don't know how to handle this yet.
      console.log("stuck in dead-end");
      this.state = MazeGenerator.STATE_STUCK;
      return;
    }

    let selectedWall;
    if (unknownWalls.length == 1){
      console.log("... only one choice");
      selectedWall = unknownWalls[0];
      if (!this.canWalkInDirection(selectedWall)){
        this.cell.closeWall(selectedWall);
        return;
      }
    }else{
      let randomSelection = floor(random(unknownWalls.length));
      selectedWall = unknownWalls[randomSelection];
      console.log("selected wall: " + selectedWall);

      if (!this.canWalkInDirection(selectedWall)){
        this.cell.closeWall(selectedWall);
        return;
      }

      let nextIdx = (randomSelection+1) % unknownWalls.length;
      let wallToClose = unknownWalls[nextIdx];
      console.log("Wall to close: " + wallToClose);
      this.cell.closeWall(wallToClose);
    }

    this.cell.openWall(selectedWall); 
    this.walkInDirection(selectedWall);
  }

  canWalkInDirection(direction){
    // before walking/opening doors, should check that next Cell is not 
    // in the visitedCells (should not loop back)
    // ... if it is:
    // close the selected Wall, and choose another wall
    let potentialCell = this.cellForDirection(direction);
    let alreadyVisited = this.visitedCells.includes(potentialCell);
    return !alreadyVisited;
  }

  walkInDirection(direction){
    this.moveToCell(this.cellForDirection(direction));
  }

  cellForDirection(direction){
    switch(direction) {
      case 0:
        return this.cell.cellAbove;
      case 1:
        return this.cell.cellToRight;
      case 2:
        return this.cell.cellBelow;
      case 3:
        return this.cell.cellToLeft;
    }
  }

  draw(){
    fill(200, 200, 50);
    noStroke();
    let cellWidth = maze.cellWidth;
    ellipse(this.x, this.y, 0.5 * cellWidth, 0.5 * cellWidth);
  }
}

class MazeCell {
  constructor(row, col, index, maze){
    // variable names are dictated by CellGrid
    this._row = row;
    this._col = col;
    this._idx = index;

    this.maze = maze;
    this.grid = maze.grid;
    this.rightWall = MazeCell.WALL_UNKNOWN;
    this.bottomWall = MazeCell.WALL_UNKNOWN;
    this.state = MazeCell.CELL_UNKNOWN;
  }

  get cellAbove() { return this.grid.cellAbove(this._idx); }
  get cellToRight() { return this.grid.cellToRight(this._idx); }
  get cellBelow() { return this.grid.cellBelow(this._idx); }
  get cellToLeft() { return this.grid.cellToLeft(this._idx); }

  static get WALL_UNKNOWN(){ return -1; }
  static get WALL_OPEN(){ return 0; }
  static get WALL_SOLID(){ return 1; }

  static get CELL_UNKNOWN(){ return -1; }
  static get CELL_OPEN(){ return 0; }
  static get CELL_SOLID(){ return 1; }
  
  static get REJECTED(){ return -2; }

  get leftWall() {
    let idxToLeft = this.grid.cellIndexToLeft(this._idx);
    if (idxToLeft == undefined){
      return MazeCell.WALL_SOLID;
    }

    let cell =  this.grid.cells[idxToLeft];
    if (cell.state == MazeCell.CELL_SOLID){
      return MazeCell.WALL_SOLID;
    }else{
      return cell.rightWall;
    }
  }

  get topWall() {
    let idxToAbove = this.grid.cellIndexAbove(this._idx);
    if (idxToAbove == undefined){
      return MazeCell.WALL_SOLID;
    }

    let cell =  this.grid.cells[idxToAbove];
    if (cell.state == MazeCell.CELL_SOLID){
      return MazeCell.WALL_SOLID;
    }else{
      return cell.bottomWall;
    }
  }

  openWall(wallIdx){
    switch(wallIdx) {
      case 0:
        this.cellAbove.bottomWall = MazeCell.WALL_OPEN;
        break;
      case 1:
        this.rightWall = MazeCell.WALL_OPEN;
        break;
      case 2:
        this.bottomWall = MazeCell.WALL_OPEN;
        break;
      case 3:
        this.cellToLeft.rightWall = MazeCell.WALL_OPEN;
        break;
    }
  }

  closeWall(wallIdx){
    switch(wallIdx) {
      case 0:
        this.cellAbove.bottomWall = MazeCell.WALL_SOLID;
        break;
      case 1:
        this.rightWall = MazeCell.WALL_SOLID;
        break;
      case 2:
        this.bottomWall = MazeCell.WALL_SOLID;
        break;
      case 3:
        this.cellToLeft.rightWall = MazeCell.WALL_SOLID;
        break;
    }
  }

  get walls(){ return [this.topWall, this.rightWall, this.bottomWall, this.leftWall]; }

  get unknownWalls(){ 
    return this.walls.map( (wall, i) => { 
        return (wall == MazeCell.WALL_UNKNOWN) ? i : MazeCell.REJECTED;
      }).filter( (idx) => {return idx != MazeCell.REJECTED; });
  }

  get openWalls(){ 
    return this.walls.map( (wall, i) => { 
        return (wall == MazeCell.WALL_OPEN) ? i : MazeCell.REJECTED;
      }).filter( (idx) => {return idx != MazeCell.REJECTED; });
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
