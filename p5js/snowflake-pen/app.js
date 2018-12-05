var pen;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  pen = new SnowflakePen();

  stroke(200, 200, 250);
  background(50);
}

function draw(){
  pen.draw();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}
