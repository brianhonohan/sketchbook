var cellWidth;
var world;
var snake;
var rowCount;
var colCount;

function setup() {
  createCanvas(700, 310);

  cellWidth = 10;
  rowCount = Math.floor(height / cellWidth);
  colCount = Math.floor(width / cellWidth);
  
  world = new World(2);
  snake = new Snake(Math.floor(rowCount / 2), Math.floor(colCount/2));
  frameRate(5);
}

function draw() {
  background(0);
  world.draw();
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

class World {
  constructor(numApples) {
    this.appleLocations = [];

    for (var i = 0; i < numApples; i++) {
      this.addRandomApple();
    }
  }

  addRandomApple(){
    this.appleLocations.push(new CellCoord(
                Math.floor(random() * rowCount), 
                Math.floor(random() * colCount)
            ));
  }

  draw(){
    fill(255, 0, 0);

    let tmpCell;
    for (var i = 0; i < this.appleLocations.length; i++) {
      tmpCell = this.appleLocations[i];
      rect(tmpCell.col * cellWidth, tmpCell.row * cellWidth, 
            cellWidth, cellWidth);
    }
  }

  hasAppleAt(coord){
    let tmpCell;
    for (var i = 0; i < this.appleLocations.length; i++) {
      tmpCell = this.appleLocations[i];
      if (tmpCell.equals(coord)) {
        this.appleLocations.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  outOfApples(){
    return 0 == this.appleLocations.length;
  }
}

class Snake {
  constructor(row, col) {
    this.direction = Snake.UP; 
    this.state = Snake.STATE_ALIVE;

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

  static get STATE_GAME_OVER()  { return -1; }
  static get STATE_ALIVE()  { return 0; }
  static get STATE_WON()  { return 1; }

  draw(){
    fill(255);

    if (this.state == Snake.STATE_GAME_OVER) {
      if (frameCount % 2) {
        fill( 255, 255, 0 );
      }
    } else if (this.state == Snake.STATE_WON) {
      if (frameCount % 2) {
        fill( 0, 255, 0 );
      }
    }

    let tmpCell;
    for (var i = 0; i < this.bodyLocations.length; i++) {
      tmpCell = this.bodyLocations[i];
      rect(tmpCell.col * cellWidth, tmpCell.row * cellWidth, 
            cellWidth, cellWidth);
    }
  }

  tick(){
    if (this.state == Snake.STATE_GAME_OVER 
         || this.state == Snake.STATE_WON) {
      return;
    }

    let newHead = this.nextLocation();
    let tmpCell;
    for (var i = 0; i < this.bodyLocations.length; i++) {
      tmpCell = this.bodyLocations[i];
      if (tmpCell.equals(newHead)) {
        return this.runIntoSelf();
      }
    }

    let ateApple = world.hasAppleAt(newHead);
    if (!ateApple) {
      let tail = this.bodyLocations.pop();
    }
    
    if (world.outOfApples()){
      this.state = Snake.STATE_WON;
    }
    this.bodyLocations.unshift(newHead);
  }

  runIntoSelf(){
    this.state = Snake.STATE_GAME_OVER;
  }

  go(newDirection){
    this.direction = newDirection;
  }

  nextLocation(){
    let nextLoc;
    switch (this.direction) {
      case Snake.UP:
        nextLoc = new CellCoord(this.head.row - 1, this.head.col);
        break;
      case Snake.RIGHT:
        nextLoc = new CellCoord(this.head.row, this.head.col + 1);
        break;
      case Snake.DOWN:
        nextLoc = new CellCoord(this.head.row + 1, this.head.col);
        break;
      case Snake.LEFT:
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

  equals(otherCell){
    return (this.row == otherCell.row && this.col == otherCell.col);
  }
}
