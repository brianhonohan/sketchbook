var spaceship;
var blockSize;
var bullets;

function setup() {
  createCanvas(400, 400);
  blockSize = 5;

  spaceship = new Spaceship();
  bullets = [];
}

function draw() {
  background(0);
  spaceship.draw();

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].tick();
  }
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