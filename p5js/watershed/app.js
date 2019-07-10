var canvas;
var system;
var colorScheme;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  initColorScheme();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
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