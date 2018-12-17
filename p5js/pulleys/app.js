var canvas;
var margin = 0.1;
var system;

function setup() {
  canvas = createCanvas(500, 500);
  initSystem();
}

function draw(){
  background(50);
  strokeWeight(1);
  drawGround(height * (1 - margin));
  drawCeiling(height * margin )
  system.tick();
  system.draw();
}

function initSystem(){
  var rect = new Rect(margin * width, margin * height, 
                      (1 - 2 * margin) * width, (1 - 2 * margin) * height);
  system = new System(rect);
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(width * margin, y, width * (1 - margin), y);
}

function drawCeiling(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(width * margin, y, width * (1 - margin), y, {dashes_above: true});
}
