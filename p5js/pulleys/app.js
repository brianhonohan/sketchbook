var canvas;
var margin = 0.1;
var system;
var colorScheme;

function setup() {
  canvas = createCanvas(500, 500);
  initColorScheme();
  initSystem();
}

function draw(){
  background(colorScheme.background);
  strokeWeight(1);
  drawGround(height * (1 - margin));
  drawCeiling(height * margin )
  system.tick();
  system.draw();
}

function initColorScheme(){
  colorScheme = {
    background: color(50),
    line:       color(230),
    hover:      color(200, 200, 50),
    object:     color(50, 50, 200),
    rope:       color(0, 255, 0)
  };
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

function mouseClicked(){
  system.handleMouseClicked();
}

function drawGround(y){
  stroke(colorScheme.line);
  P5JsUtils.drawSolidBoundary(width * margin, y, width * (1 - margin), y);
}

function drawCeiling(y){
  stroke(colorScheme.line);
  P5JsUtils.drawSolidBoundary(width * margin, y, width * (1 - margin), y, {dashes_above: true});
}
