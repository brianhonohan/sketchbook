let grid;
var canvas;
let gui;
let simpleUI;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight-35);
  // var canvas = createCanvas(500, 500);
  grid = new GridViewController(0, 0, width, height);
  frameRate(30);

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(grid, 'cellWidth', 5, 100, 1).onChange(reinit);
  gui.add(grid, 'cellHeight', 5, 100, 1).onChange(reinit);

  simpleUI = new SimpleUI(grid);

  let toolGui = gui.addFolder('Tools');
  toolGui.add(simpleUI, 'setModeAddWall').name('ADD WALL (W)');
  toolGui.add(simpleUI, 'setModeRemoveWall').name('REMOVE WALL (Q)');
  toolGui.add(simpleUI, 'setModeAddHeatSource').name('ADD HEAT SOURCE (A)');
  toolGui.add(simpleUI, 'setModeAddHeatSink').name('ADD HEAT SINK (S)');
  toolGui.add(simpleUI, 'setModeRemoveHeat').name('REMOVE HEAT (D)');
  toolGui.add(simpleUI, 'setModeAddHeat').name('ADD HEAT (E)');
}

function draw() {
  grid.step();
  grid.renderViews();
}

function reinit(){
  grid.initCells();
}

function mouseDragged(){
  simpleUI.handleMouseDrag();
}

function keyTyped(){
  switch(key) {
    case 'w':
      simpleUI.setModeAddWall();
      break;
    case 'q':
      simpleUI.setModeRemoveWall();
      break;
    case 'a':
      simpleUI.setModeAddHeatSource();
      break;
    case 's':
      simpleUI.setModeAddHeatSink();
      break;
    case 'd':
      simpleUI.setModeRemoveHeat();
      break;
    case 'e':
      simpleUI.setModeAddHeat();
      break;
    
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
