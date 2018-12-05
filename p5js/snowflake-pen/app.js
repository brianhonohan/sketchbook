var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-35);
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
