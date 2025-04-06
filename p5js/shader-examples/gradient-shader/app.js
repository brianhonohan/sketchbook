let canvas;
let vertMargin = determineVerticalMargin();
let gui;

const guiOptions = {
}

let gradientShader;
let cells;

function preload() {
  gradientShader = loadShader("shaders/generic_shader.vert", "shaders/green-red-yellow-gradient.frag");
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  pixelDensity(1);
  noSmooth();
  
  cells = createGraphics(width, height);
  // cells.pixelDensity(1);
  cells.noSmooth();
  
  stroke(255);
  let finalScreen = createGraphics(width, height, WEBGL);
  finalScreen.shader(gradientShader);
  gradientShader.setUniform("normalRes", [1.0/width, 1.0/height]);
  
  gradientShader.setUniform("cells", cells);
  finalScreen.clear();
  finalScreen.rect(0, 0, width, height);
  image(finalScreen, 0, 0, width, height);

  noLoop();
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
