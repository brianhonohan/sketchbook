var spaceship;
var blockSize;
var bullets;
var invasionWave;

function setup() {
  createCanvas(400, 400);
  blockSize = 5;

  spaceship = new Spaceship();
  bullets = [];
  invasionWave = new InvasionWave(5,6);

  // frameRate(10);
}

function draw() {
  background(0);
  spaceship.draw();

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].tick();
  }

  invasionWave.tick();
  invasionWave.draw();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    spaceship.move(RIGHT_ARROW);
  } else if (keyCode === LEFT_ARROW) {
    spaceship.move(LEFT_ARROW);
  } else if (keyCode === UP_ARROW) {
    spaceship.fireBullet();
  }
}

class Spaceship { 
  constructor(){
    this.x = width/2;
    this.y = height - 40;
  }

  draw(){
    rectMode(CENTER);
    fill(30,200,230);
    rect(this.x, this.y, 30, 10);
  }

  move(direction){
    if (keyCode === RIGHT_ARROW) {
      this.x += 10;
    } else if (keyCode === LEFT_ARROW) {
      this.x -= 10;
    }  
  }

  fireBullet(){
    bullets.push(new Bullet(this.x, this.y - 10));
  }
}

class Bullet {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    rectMode(CENTER);
    fill(200,200,30);
    rect(this.x, this.y, 5, 10);
  }

  tick(){
    this.y -= 10;
  }
}

class InvasionWave {
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;

    this.direction = 1;
    this.framesOfMovementPerRow = 10;
    this.calcBounds();
    this.initInvaders();
  }

  calcBounds(){
    const range = width - InvasionWave.colSpacing; 
    const numPotentialCols = floor(range / this.totalColumnWidth());
    this.minAllowedX = InvasionWave.colSpacing + this.framesOfMovementPerRow;
    this.maxAllowedX = this.minAllowedX + numPotentialCols * this.totalColumnWidth() - this.framesOfMovementPerRow;
  }

  totalColumnWidth(){
    return Invader.width + InvasionWave.colSpacing;
  }

  static get colSpacing()   { return 5; }
  static get rowSpacing()   { return 10; }

  initInvaders(){
    let baseX = this.minAllowedX + 3 * this.framesOfMovementPerRow;
    // let baseX = this.maxAllowedX - this.cols * this.totalColumnWidth() - 0.5 * Invader.width - 3 * this.framesOfMovementPerRow;
    // let baseX =  width - InvasionWave.colSpacing - 5 * (InvasionWave.colSpacing + Invader.width);
    let baseY = 40;
    let numPerRow = 6;

    let tmpX;
    let tmpY;
    this.invaders = []

    for (var i = 0; i < this.rows; i++) {
      this.invaders[i] = [];
      tmpY = baseY + i * (Invader.height + InvasionWave.rowSpacing);

      for (var j = 0; j < this.cols; j++) {
        tmpX = baseX + j * (Invader.width + InvasionWave.colSpacing);
        this.invaders[i][j] = new Invader(tmpX, tmpY);
      }
    }
  }

  draw(){  
    this.debugMaxMinX();

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.invaders[i][j].draw();
      }
    }
  }

  debugMaxMinX(){
    stroke(255, 255, 0);
    line(this.minAllowedX, 0, this.minAllowedX, height);
    line(this.maxAllowedX, 0, this.maxAllowedX, height);
    noStroke();
  }

  tick(){
    let bottomRow = this.bottomRowStillInvading();

    if (bottomRow == -1) {
      console.log("You won!!");
    }

    const rowMoving = this.rows - 1 - (floor(frameCount / this.framesOfMovementPerRow) % this.rows);

    if (bottomRow == rowMoving){
      const maxMinX = this.getMaxMinX();
      if (this.direction == 1 && maxMinX[1] > this.maxAllowedX){
        this.direction = -1;
      } else if (this.direction == -1 && maxMinX[0] <= this.minAllowedX){
        this.direction = 1;
      }
    }

    for (var j = 0; j < this.cols; j++) {
      this.invaders[rowMoving][j].move(this.direction);
    }
  }

  bottomRowStillInvading(){
    let tmpBottomRow = -1;
    let tmpInvader;
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        tmpInvader = this.invaders[i][j];
        if (this.invaders[i][j].state == Invader.STATE_INVADING) {
          tmpBottomRow = i;
          break;
        }
      }
    }
    return tmpBottomRow;
  }

  getMaxMinX(){
    let constraints = [width, 0]; // (min, max)
    let tmpInvader;
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        tmpInvader = this.invaders[i][j];
        if (tmpInvader.state == Invader.STATE_BLOWN_UP) {
          continue;
        }
        constraints[0] = min(constraints[0], tmpInvader.x);
        constraints[1] = max(constraints[1], tmpInvader.x + Invader.width);
      }
    }
    return constraints;
  }
}

class Invader {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.state = Invader.STATE_INVADING;
  }

  static get width()    { return 30; }
  static get height()   { return 30; }

  static get STATE_INVADING()   { return 0; }
  static get STATE_BLOWN_UP()   { return 1; }

  draw(){
    if (this.state == Invader.STATE_BLOWN_UP){
      return;
    }
    rectMode(CORNER);
    noStroke();
    fill(200,30,200);
    rect(this.x, this.y, Invader.width, Invader.height);
  }

  move(direction){
    this.x += 1 * direction;
  }
}
