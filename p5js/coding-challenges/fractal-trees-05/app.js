var groundLevel;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  groundLevel = floor(height * 0.1);
}

function draw(){
  background(50);
  drawGround(groundLevel);
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0.1 * width, y, 0.9 * width, y);
}
