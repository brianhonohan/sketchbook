var canvas;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();
}

function draw(){
  background(50);
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}
