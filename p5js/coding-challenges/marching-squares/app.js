var system;
var canvas;
var vertMargin = determineVerticalMargin();

let gui;
let guiScaleListener;
let guiXOffset;
let guiYOffset;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  gui = P5JsSettings.addDatGui({autoPlace: false, bindOptions: true, callback: regenerateSystem});
  guiScaleListener = gui.add(system.settings, "scale", 0.001, 0.1, 0.001);
  guiXOffset = gui.add(system.settings, "xOffset", -10000, 10000, 1);
  guiYOffset = gui.add(system.settings, "yOffset", -10000, 10000, 1);
  gui.add(system.settings, "drawGrid");
  addGuiListeners();
}

function regenerateSystem(){
  system.regenerate();
}

function addGuiListeners(){
  guiScaleListener.onChange(() => regenerateSystem() );
  guiXOffset.onChange(() => regenerateSystem() );
  guiYOffset.onChange(() => regenerateSystem() );
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
