let ballX = 0;
let ballY = 0;
let ballSpeedX = 0;
let ballSpeedY = 0;
let mouseStartX = 0;
let mouseStartY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  fill(100,100,100);
  ballX = windowWidth / 2;
  ballY = windowHeight / 2;
  ellipse(ballX, ballY, 10, 10);

  ballSpeedX = random(1, 5);
  ballSpeedY = random(1, 5);
}

function draw(){
  clear();

  if (mouseIsPressed) {
    line(mouseStartX, mouseStartY, mouseX, mouseY);
  } else {
    ball_tick();
    ball_draw();   
  }
}

function ball_tick(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > windowWidth || ballX < 0){
    ballSpeedX *= -1;
    ballX += 2 * ballSpeedX;
  }
  if (ballY > windowHeight || ballY < 0){
    ballSpeedY *= -1;
    ballY += 2 * ballSpeedY;
  }
}

function ball_draw(){
  ellipse(ballX, ballY, 10, 10);
}

function mousePressed() {
  mouseStartY = mouseY;
  mouseStartX = mouseX;
}

function mouseReleased() {
  ballX = mouseStartX;
  ballY = mouseStartY;

  speedFactor = 0.05;
  ballSpeedX = (mouseStartX - mouseX) * speedFactor ;
  ballSpeedY = (mouseStartY - mouseY) * speedFactor ;
}
