var cellWidth; 
var snake;
var rowCount;
var colCount;

function setup() {
  createCanvas(700, 310);

  cellWidth = 10;
  rowCount = Math.floor(height / cellWidth);
  colCount = Math.floor(width / cellWidth);

  snake = new Snake(Math.floor(rowCount / 2), Math.floor(colCount/2));
  frameRate(5);
}

function draw() {
  background(0);
  snake.tick();
  snake.draw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.go(Snake.UP);
  } else if (keyCode === RIGHT_ARROW) {
    snake.go(Snake.RIGHT);
  } else if (keyCode === DOWN_ARROW) {
    snake.go(Snake.DOWN);
  } else if (keyCode === LEFT_ARROW) {
    snake.go(Snake.LEFT);
  }
}



class Snake {
  constructor(row, col) {
    this.direction = 3; 

    this.bodyLocations = [];
    this.bodyLocations.push(new CellCoord(row + 0, col));
    this.bodyLocations.push(new CellCoord(row + 1, col));
    this.bodyLocations.push(new CellCoord(row + 2, col));
    this.bodyLocations.push(new CellCoord(row + 3, col));
  }

  static get UP()    { return 0; }
  static get RIGHT() { return 1; }
  static get DOWN()  { return 2; }
  static get LEFT()  { return 3; }

  draw(){
    fill(255);

    let tmpCell;
    for (var i = 0; i < this.bodyLocations.length; i++) {
      tmpCell = this.bodyLocations[i];
      rect(tmpCell.col * cellWidth, tmpCell.row * cellWidth, 
            cellWidth, cellWidth);
    }
  }

  tick(){
    let tail = this.bodyLocations.pop();

    let newHead = this.nextLocation();
    this.bodyLocations.unshift(newHead);
  }

  go(newDirection){
    this.direction = newDirection;
  }

  nextLocation(){
    let nextLoc;
    switch (this.direction) {
      case 0:
        nextLoc = new CellCoord(this.head.row - 1, this.head.col);
        break;
      case 1:
        nextLoc = new CellCoord(this.head.row, this.head.col + 1);
        break;
      case 2:
        nextLoc = new CellCoord(this.head.row + 1, this.head.col);
        break;
      case 3:
        nextLoc = new CellCoord(this.head.row, this.head.col - 1);
        break;
    }
    nextLoc.constrainTo(rowCount, colCount);
    return nextLoc;
  }

  get head(){
    return this.bodyLocations[0];
  }
}

class CellCoord {
  constructor(_row, _col){
    this.row = _row;
    this.col = _col;
  }

  constrainTo(_rowCount, _colCount) {
    this.row = (this.row < 0) ? _rowCount -1 : this.row;
    this.row = (this.row >= _rowCount) ? 0 : this.row;
    this.col = (this.col < 0) ? _colCount -1 : this.col;
    this.col = (this.col >= _colCount) ? 0 : this.col;
  }
}
