let canvas;
let vertMargin = determineVerticalMargin();
let gui;
const shaderList = ['v1'];
const shaderLookup = {};

const guiOptions = {
  'clear': clearBackground,
  'shader': shaderList[0],
}

let sketchShader;
let cells;

function preload() {
  shaderLookup['v1']  = loadShader("shaders/generic_shader.vert", "shaders/heat-transfer.frag");
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(window.innerWidth, window.innerHeight - vertMargin);
  drawingContext.canvas.style.position = 'absolute';

  P5JsSettings.init();

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(guiOptions, 'clear').name("Clear Background (C)");
  gui.add(guiOptions, 'shader', shaderList).name("Shader").onChange(updateShader);


  // pixelDensity(1);
  // noSmooth();
  
  cells = createGraphics(width, height);
  // cells.pixelDensity(1);
  // cells.noSmooth();
  
  // clearBackground();
  // frameRate(1); // Slow down for screenshots
  cells.fill(0.2 * 255);
  cells.rect(0, 0, width, height);
  cells.stroke(230, 0, 0);
  cells.fill(230, 0, 0);
  cells.strokeWeight(1);
  cells.textSize(128);
  cells.textAlign(CENTER, CENTER);
  cells.text("Heat", width / 2, height / 2 - height / 4);
  cells.text("", width / 2, height / 2);
  cells.stroke(0, 0, 230);
  cells.fill(0, 0, 230);
  cells.text("Transfer", width / 2, height / 2 + height / 4); // Center text for initial state
  cells.image(get(), 0, 0);

  let toolGui = gui.addFolder('Tools');
  simpleUI = new SimpleUI(cells);
  // toolGui.add(simpleUI, 'setModeAddWall').name('ADD WALL (W)');
  // toolGui.add(simpleUI, 'setModeRemoveWall').name('REMOVE WALL (Q)');
  // toolGui.add(simpleUI, 'setModeAddHeatSource').name('ADD HEAT SOURCE (A)');
  // toolGui.add(simpleUI, 'setModeAddHeatSink').name('ADD HEAT SINK (S)');
  toolGui.add(simpleUI, 'setModeRemoveHeat').name('REMOVE HEAT (D)');
  toolGui.add(simpleUI, 'setModeAddHeat').name('ADD HEAT (E)');

  finalScreen = createGraphics(width, height, WEBGL);
  updateShader();
}

function updateShader() {
  sketchShader = shaderLookup[guiOptions.shader];
  finalScreen.shader(sketchShader);
  sketchShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function clearBackground(){
  background(0);
  cells.image(get(), 0, 0);
}

function draw() {
  sketchShader.setUniform("cells", cells);
  
  finalScreen.clear();
  finalScreen.rect(0, 0, width, height);
  
  image(finalScreen, 0, 0, width, height);

  cells.image(get(), 0, 0);

  if (frameCount > (60 * 5 * 60)) {
    noLoop(); // Stop the draw loop after 5 minutes
    console.log("Stopping draw loop after 5 minutes.");
  }
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 62;
}

function mousePressed(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  // ...
}

function mouseDragged(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  simpleUI.handleMouseDrag();
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'c':
      clearBackground()
      break;
    case 'd':
      simpleUI.setModeRemoveHeat();
      break;
    case 'e':
      simpleUI.setModeAddHeat();
      break;
  }
}
