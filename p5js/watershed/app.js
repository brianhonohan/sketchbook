var canvas;
var system;
var colorScheme;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();

  initColorScheme();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  frameRate(1);
}

function draw(){
  background(colorScheme.background);
  system.tick();
  system.render();
}

function initColorScheme(){
  colorScheme = {
    background: color(50),
    line:       color(230),
  };
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}