let publicSpace;
let gui;

function setup(){
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();

  colorMode(HSB);

  let margin = Math.min(width, height) * 0.1;
  let rect = new Rect(margin, margin, width - 2 * margin, height - 2 * margin);
  publicSpace = new System(rect);

  gui = P5JsSettings.addDatGui({autoPlace: false});
}

function draw(){
  background(0, 0, 20);
  publicSpace.tick();
  publicSpace.render();
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
  
}
