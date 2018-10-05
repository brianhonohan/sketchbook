var spaceship;
var blockSize;
var bullets;
var missles;
var invasionWave;
var world;

// Difficulty Settings
var allowedBullets = 1;
var allowedMissles = 1;
var invaderSpeed = 2;
var bulletSpeed = 5;
var missleSpeed = 3;

function setup() {
  createCanvas(400, 400);
  blockSize = 5;

  spaceship = new Spaceship();
  bullets = [];
  missles = [];
  invasionWave = new InvasionWave(5,6);
  world = new World(4);
}

function draw() {
  background(0);
  spaceship.draw();

  let bulletHit;
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].tick();

    if (bullets[i].y < 0){
      bullets.splice(i, 1);
      continue;
    }

    bulletHit = world.collisionTest(bullets[i]);
    if (bulletHit) {
      bullets.splice(i, 1);
      continue;
    }

    bulletHit = invasionWave.collisionTest(bullets[i]);
    if (bulletHit) {
      bullets.splice(i, 1);
    }
  }

  let missleHit;
  for (var i = 0; i < missles.length; i++) {
    missles[i].draw();
    missles[i].tick();

    if (missles[i].y > height){
      missles.splice(i, 1);
      continue;
    }

    missleHit = spaceship.collisionTest(missles[i]);
    if (missleHit) {
      missles.splice(i, 1);
    }
  }

  world.draw();

  invasionWave.draw();
  invasionWave.tick();
}

function keyPressed() {
  if (invasionWave.state == InvasionWave.STATE_INVADING){
    if (keyCode === RIGHT_ARROW) {
      spaceship.move(RIGHT_ARROW);
    } else if (keyCode === LEFT_ARROW) {
      spaceship.move(LEFT_ARROW);
    } else if (keyCode === UP_ARROW) {
      spaceship.fireBullet();
    }
  }
}

function xyInRect(x, y, rectX, rectY, rectWidth, rectHeight){
  return (rectX <= x && x <= (rectX + rectWidth)) &&
         (rectY <= y && y <= (rectY + rectHeight));
}

class Spaceship { 
  constructor(){
    this.x = width/2;
    this.y = height - 40;
    this.width = 30;
    this.height = 10;
  }

  draw(){
    rectMode(CENTER);
    fill(30,200,230);
    rect(this.x, this.y, this.width, this.height);
  }

  move(direction){
    if (keyCode === RIGHT_ARROW) {
      this.x += 10;
    } else if (keyCode === LEFT_ARROW) {
      this.x -= 10;
    }  
  }

  fireBullet(){
    if (bullets.length >= allowedBullets){
      return;
    }
    bullets.push(new Bullet(this.x, this.y - 10));
  }

  collisionTest(missle){
    let hit = xyInRect(missle.x, missle.y, 
            this.x - this.width/2, this.y - this.height/2, 
            this.width, this.height);
    if (hit) {
      console.log("hit");
    }
    return hit;
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
    this.y -= bulletSpeed;
  }
}

class Missle {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    rectMode(CENTER);
    fill(30,200,30);
    rect(this.x, this.y, 5, 10);
  }

  tick(){
    this.y += missleSpeed;
  }
}

class World {
  constructor(numBases){
    this.bases = [];
    this.numBases = numBases;
    this.initBases();
  }

  initBases(){
    const y = spaceship.y - 50 - LandBase.height / 2;
    let margins = 40;
    let dynamicSpacing = (width - 2 * margins - 4 * LandBase.width) / (this.numBases - 1);
    let tmpX;

    for (var i = 0; i < this.numBases; i++) {
      tmpX = margins + i * (LandBase.width + dynamicSpacing);
      this.bases.push(new LandBase(tmpX, y));
    }
  }

  draw(){
    for (var i = 0; i < this.numBases; i++) {
      this.bases[i].draw();
    }
  }

  collisionTest(bullet){
    let tmpBase;
    for (var i = 0; i < this.numBases; i++) {
      tmpBase = this.bases[i];
      
      if (xyInRect(bullet.x, bullet.y, 
            tmpBase.x, tmpBase.y, LandBase.width, LandBase.height))
      {
        return true;
      }
    }
  }
}

class LandBase {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  static get width()      { return 40; }
  static get height()     { return 25; }


  draw(){
    rectMode(CORNER);
    fill(200,30,30);
    rect(this.x, this.y, LandBase.width, LandBase.height);
  }
}

class InvasionWave {
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.state = InvasionWave.STATE_INVADING;
    this.maxInvasionY = height - 130;

    this.direction = 1;
    this.framesOfMovementPerRow = 10;
    this.calcBounds();
    this.initInvaders();
  }

  static get STATE_INVADING()   { return 0; }
  static get STATE_DESTROYED()   { return 1; }
  static get STATE_INVADED()   { return 2; }

  calcBounds(){
    const range = width - InvasionWave.colSpacing; 
    const numPotentialCols = floor(range / this.totalColumnWidth());
    this.minAllowedX = InvasionWave.colSpacing + this.framesOfMovementPerRow * invaderSpeed;
    this.maxAllowedX = this.minAllowedX + numPotentialCols * this.totalColumnWidth() - this.framesOfMovementPerRow * invaderSpeed;
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
    // this.debugMaxMinX();

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
      this.state = InvasionWave.STATE_DESTROYED;
      console.log("You won!");
    }

    if (this.invaders[bottomRow][0].y >= this.maxInvasionY){
      this.state = InvasionWave.STATE_INVADED;
      console.log("You lose!");
    }

    if (this.state != InvasionWave.STATE_INVADING){
      return;
    }

    const rowMoving = this.rows - 1 - (floor((frameCount -1) / this.framesOfMovementPerRow) % this.rows);
    const maxMinX = this.getMaxMinX(rowMoving);
    if (this.direction == 1 && maxMinX[1] >= this.maxAllowedX){
      this.moveAllDown();
      this.direction = -1;
    } else if (this.direction == -1 && maxMinX[0] <= this.minAllowedX){
      this.moveAllDown();
      this.direction = 1;
    }

    for (var j = 0; j < this.cols; j++) {
      this.invaders[rowMoving][j].move(this.direction);

      if (frameCount % 7 == 0 && missles.length < allowedMissles) {
        missles.push(new Missle(this.invaders[rowMoving][j].x, this.invaders[rowMoving][j].y));
      }
    }
  }

  moveAllDown(){
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.invaders[i][j].moveDown(Invader.height + InvasionWave.rowSpacing);
      }
    }
  }

  collisionTest(bullet){
    let tmpInvader;
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        tmpInvader = this.invaders[i][j];
        if (tmpInvader.state == Invader.STATE_BLOWN_UP) {
          continue;
        }
        if (xyInRect(bullet.x, bullet.y, 
              tmpInvader.x, tmpInvader.y, Invader.width, Invader.height))
        {
          tmpInvader.state = Invader.STATE_BLOWN_UP;
          return true;
        }
      }
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

  getMaxMinX(aboveRow){
    let constraints = [width, 0]; // (min, max)
    let tmpInvader;
    for (var i = 0; i < this.rows; i++) {
      if (i >= aboveRow){
        break;
      }
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
    this.updateColor();
    this.state = Invader.STATE_INVADING;
  }

  static get width()    { return 25; }
  static get height()   { return 20; }

  static get STATE_INVADING()   { return 0; }
  static get STATE_BLOWN_UP()   { return 1; }

  static get colors() {
    return [
      color(200,30,200),
      color(200, 200, 30)
    ];
  }

  draw(){
    if (this.state == Invader.STATE_BLOWN_UP){
      return;
    }
    rectMode(CORNER);
    noStroke();
    fill(this.color);
    rect(this.x, this.y, Invader.width, Invader.height);
  }

  move(direction){
    this.x += 1 * direction * invaderSpeed;
  }

  updateColor(){
    this.color = lerpColor(Invader.colors[0], Invader.colors[1], this.y / (height - 120));
  }

  moveDown(deltaY){
    this.y += deltaY;
    this.updateColor();
  }
}
