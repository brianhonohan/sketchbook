var system;
var canvas;
var vertMargin = determineVerticalMargin();

var gui;
var guiFolders = {};

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  let rect = new Rect(0.1 * width, 0.1 * height, 0.8 * width, 0.8 * height);
  system = new System(rect);

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(system.settings, "mode", LayoutUtilFunctions.getPointModes()).onFinishChange(handleModeChange);
  gui.add(system.settings, "num_points", 1, 3000, 1).onFinishChange(regenerate);

  system.regenerate();
}

function regenerate(){
  system.regenerate()
}

function draw(){
  background(50);
  system.tick();
  system.render();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
