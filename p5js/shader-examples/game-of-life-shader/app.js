// CREDIT: 
// BarneyCodes - https://editor.p5js.org/BarneyCodes/sketches/HLpsvCXus
// https://www.youtube.com/watch?v=XcII7comJ00

// This is a refactored version of BarneyCodes' Game of Life shader example
// Notable modifications
// 1. Uses p5.Graphics in WEBGL mode, rather than setting the full canvas to WEBGL
//   ... this avoids having to handle the fact that WEBGL puts x,y 0,0 at the center of the canvas
//   ... thought process is that it will allow for use of other code that expects a 2D canvas
// 2. Uses more verbose variable names and adds comments for clarity
//   ... Personally I find a lot of the GL shader code hard to read to be overly terse
//   ... so uses 'cells' as name of Uniform passed from p5j.js context into the shader
//   ... TBD if I'm breaking GL best practices by using more verbose variable names

// A similar version of my modified code here is available at: 
// https://editor.p5js.org/lecrte/sketches/w0Nx9Ooi8

let canvas;
let vertMargin = determineVerticalMargin();
let gui;

const guiOptions = {
  'clear': clearBackground
}

let golShader;
let cells;

function preload() {
  golShader = loadShader("shaders/generic_shader.vert", "shaders/game-of-life-shader.frag");
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(guiOptions, 'clear').name("Clear Background (C)");

  pixelDensity(1);
  noSmooth();
  
  cells = createGraphics(width, height);
  // cells.pixelDensity(1);
  cells.noSmooth();
  
  // clearBackground();
  stroke(255);
  finalScreen = createGraphics(width, height, WEBGL);
  finalScreen.shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
  // frameRate(1); // Slow down for screenshots

  cells.stroke(255);
  cells.strokeWeight(6);
  cells.textSize(128);
  cells.textAlign(CENTER, CENTER);
  cells.text("Game", width / 2, height / 2 - height / 4);
  cells.text("of", width / 2, height / 2);
  cells.text("Life", width / 2, height / 2 + height / 4); // Center text for initial state
  cells.image(get(), 0, 0);

  cells.strokeWeight(1);
}

function clearBackground(){
  background(0);
  cells.image(get(), 0, 0);
}

function draw() {
  golShader.setUniform("cells", cells);
  
  finalScreen.clear();
  finalScreen.rect(0, 0, width, height);
  
  image(finalScreen, 0, 0, width, height);
  
  // DEBUG
  // rect(10, 10, 20, 20);
  // image(cells, 0, 0, width, height);
  
  // Capture the new cells state for next iteration
  cells.image(get(), 0, 0);
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
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
  cells.stroke(255);
  cells.line(pmouseX, pmouseY, mouseX, mouseY);
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'c':
      clearBackground()
      break;
  }
}
