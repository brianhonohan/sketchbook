var groundLevel;
var soil;
var canvas;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();

  groundLevel = floor(height * 0.1);
  var groundArea = new Rect(0.1 * width, groundLevel, 
                            0.8 * width, 0.8 * height);
  soil = new Soil(groundArea);
}

function draw(){
  background(50);
  drawGround(groundLevel);

  soil.tick();
  soil.draw();
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0.1 * width, y, 0.9 * width, y);
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}
