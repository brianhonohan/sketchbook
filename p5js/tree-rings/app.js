var system;
var colorScheme;


var gui;
var guiInitialCells;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();
  initColorScheme();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  gui = new dat.gui.GUI();
  guiInitialCells = gui.add(system.settings, 'initialCells').min(10).max(50).step(1);
  addGuiListeners();
}

function draw(){
  background(colorScheme.background);
  system.tick();
  system.render();
}

function initColorScheme(){
  colorScheme = {
    background: color(50),
    line:       color(230)
  };
}

function addGuiListeners(){
  guiInitialCells.onFinishChange(function(value) {
    system.init();
  });
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case '0':
      P5JsUtils.toggleLoop();
      break;
  }
}
