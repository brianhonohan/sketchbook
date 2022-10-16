var system;
var colorScheme;


var gui;
var guiInitialCells, guiNumRings;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();
  initColorScheme();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiInitialCells = gui.add(system.trunk.settings, 'initialCells').min(10).max(50).step(1);
  guiNumRings = gui.add(system.trunk.settings, 'initialRings').min(1).max(20).step(1);
  guiCellCenters = gui.add(system.trunk.settings, 'draw_cell_centers');
  addGuiListeners();
  draw();
  noLoop();
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
    draw();
  });

  guiNumRings.onFinishChange(function(val) { 
    system.init(); 
    draw();
  });

  guiCellCenters.onFinishChange(function(val){
    draw();
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
