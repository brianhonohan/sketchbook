var canvas;
var drawableArea;
var friezePen;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();

  drawableArea = new Rect(50, 150, 100, 100);
  friezePen = new FriezePen(drawableArea);
  friezePen.setTransform('vt');
  drawBackground();
}

function draw(){
  friezePen.draw();
}

function drawBackground(){
  background(50);
  fill(80);
  noStroke();
  P5JsUtils.drawRect(drawableArea);
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'c':
      drawBackground();
      break;
  }
}
