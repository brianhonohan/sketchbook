var tree;
var groundLevel;

function setup(){
  createCanvas(windowWidth, windowHeight);

  groundLevel = floor(height * 0.6);
  tree = new Tree( floor(width/2), groundLevel);
}  

function draw(){
  background(50);
  tree.tick();
  tree.draw();
  drawGround(groundLevel);
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0 + 100, y, width - 100, y);
}
