let system;
let canvas;
let gui;
let systemRebuildTimeout;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();
  
  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(system.settings, 'numCells', 2, 20, 1).onChange(system.regenerate.bind(system));
  gui.add(system.settings, 'cropSpacing', 3, 120, 1).onChange(system.replantRows.bind(system));
  gui.add(system.settings, 'cropWidth', 1, 70, 1).onChange(system.adjustCropWidth.bind(system));
  gui.add(system.settings, 'cropLengthScale', 1, 100, 1).onChange(system.adjustCropLengthScale.bind(system));
  gui.add(system.settings, 'drawPlotBG');
  gui.add(system.settings, 'drawBoundaries');
  gui.add(system.settings, 'cropRowStrokeCap', strokeCapNames);
  gui.add(system.settings, 'cullShortRows');
  gui.add(system.settings, 'cullThreshold', 1, 100, 1);
  gui.add(system, 'regenerate').name('Regenerate').onChange(system.regenerate.bind(system));

  P5JsSettings.collapseGuiIfNarrow(gui);
  background(50);
}

function draw(){
  system.tick();
  system.render();
}

function createAutosizedCanvas(){
  canvas = createCanvas();
  windowResized(undefined, true);
  return canvas;
}

function windowResized(event, noRedraw = false) {
  resizeCanvas(innerWidth, 
              innerHeight - drawingContext.canvas.getBoundingClientRect().top,
              noRedraw);

  if (noRedraw) {
    return;
  }
  
  if (systemRebuildTimeout) {
    clearTimeout(systemRebuildTimeout);
  }
  systemRebuildTimeout = setTimeout(rebuildSystem, 100);
}

function rebuildSystem(){
  systemRebuildTimeout = undefined;
  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  background(50);
  system.regenerate();
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
  // ...

}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
