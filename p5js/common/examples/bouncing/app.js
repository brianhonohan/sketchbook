var vertMargin = determineVerticalMargin();
let ballX = 0;
let ballY = 0;
let ballSpeedX = 0;
let ballSpeedY = 0;
let mouseStartX = 0;
let mouseStartY = 0;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  stroke(230);
  fill(230);

  ballX = windowWidth / 2;
  ballY = windowHeight / 2;
  ellipse(ballX, ballY, 10, 10);

  ballSpeedX = random(1, 5);
  ballSpeedY = random(1, 5);
}

function draw(){
  background(50);

  if (mouseIsPressed) {
    line(mouseStartX, mouseStartY, mouseX, mouseY);
  } else {
    ball_tick();
    ball_draw();   
  }
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function ball_tick(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > width || ballX < 0){
    ballSpeedX *= -1;
    ballX += 2 * ballSpeedX;
  }
  if (ballY > height || ballY < 0){
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
