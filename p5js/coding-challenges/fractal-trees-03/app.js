var tree;
var groundLevel;
var seasonalTime;
var visualScale;
var log10 = Math.log(10);

function setup(){
  createCanvas(windowWidth, windowHeight);

  visualScale = 1;
  groundLevel = floor(height * 0.6);
  tree = new Tree( floor(width/2), groundLevel);

  seasonalTime = new SeasonalTime(0.01);
}  

function draw(){
  background(50);
  seasonalTime.tick();
  drawGround(groundLevel);

  push();
  translate(tree.x, tree.y);
  scale(visualScale);
  tree.tick();
  tree.draw();
  pop();
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0 + 100, y, width - 100, y);
}

function keyPressed() {
  if (key === '-'){
    visualScale = Math.max(0.1, visualScale - 0.2);
  } else if (key === '='){
    visualScale += 0.2;
  }
}

function mouseWheel(event){
  let zoomDelta = 0.1 * Math.sign(event.delta + 0.001) 
                      * Math.log( abs(event.delta) )
                      / log10;
  visualScale = Math.max(0.1, visualScale + zoomDelta);
}
