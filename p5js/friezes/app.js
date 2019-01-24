var canvas;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();
}

function draw(){
  background(50);
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
