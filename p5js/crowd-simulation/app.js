let publicSpace;
let gui;

function setup(){
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  publicSpace = new System(rect);

  gui = P5JsSettings.addDatGui({autoPlace: false});
}

function draw(){
  background(50);
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
