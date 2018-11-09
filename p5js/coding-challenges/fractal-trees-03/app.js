var tree;
var groundLevel;
var seasonalTime;

function setup(){
  createCanvas(windowWidth, windowHeight);

  groundLevel = floor(height * 0.6);
  tree = new Tree( floor(width/2), groundLevel);
  seasonalTime = new SeasonalTime(0.01);
}  

function draw(){
  background(50);
  seasonalTime.tick();
  tree.tick();
  tree.draw();
  drawGround(groundLevel);
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0 + 100, y, width - 100, y);
}
