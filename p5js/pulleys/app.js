var canvas;

function setup() {
  canvas = createCanvas(500, 500);
}

function draw(){
  background(50);
  drawGround(height * 0.9);
  drawCeiling(height * 0.1 )
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
  P5JsUtils.drawSolidBoundary(width * 0.1, y, width * 0.9, y);
}

function drawCeiling(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(width * 0.1, y, width * 0.9, y, {dashes_above: true});
}
