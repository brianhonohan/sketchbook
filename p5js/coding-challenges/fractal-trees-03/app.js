var groundLevel;

function setup(){
  createCanvas(windowWidth, windowHeight);

  groundLevel = height * 0.6;
}  

function draw(){
  background(50);
  drawGround(groundLevel);
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0 + 100, y, width - 100, y);
}
