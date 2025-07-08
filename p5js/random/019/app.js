var canvas;
var gui;

var systemParams = {
  xStepSize: 0.02,
  yStepSize: 0.07,
  yWaveFactor: 0.35,
  useFrameCountInX: false,
  useFrameCountInY: true,
  fillShapes: true,
  hsbStart: 0,
  hsbEnd: 150,
  hsbCycle: false,
  xStepFraction: 0.7
};

function setup(){
  // canvas = createCanvas(500, 500);
  canvas = createAutosizedCanvas();
  colorMode(HSB);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(systemParams, 'xStepSize', 0.001, 0.3, 0.001);
  gui.add(systemParams, 'xStepFraction', -3, 3, 0.1);
  gui.add(systemParams, 'yStepSize', 0.001, 0.4, 0.001);
  gui.add(systemParams, 'yWaveFactor', 0.01, 1, 0.01);
  gui.add(systemParams, 'useFrameCountInX');
  gui.add(systemParams, 'useFrameCountInY');
  gui.add(systemParams, 'fillShapes');
  gui.add(systemParams, 'hsbCycle');
  gui.hsbStart = gui.add(systemParams, 'hsbStart', 0, 360, 1);
  gui.hsbEnd = gui.add(systemParams, 'hsbEnd', 0, 360, 1);
}

function draw(){
  background(0, 0, 20);

  let yIncrement = systemParams.yStepSize * height;

  if (systemParams.hsbCycle) {
    updateHSBStartEnd();
  }

  for(let y = 0.1 * height; y <= 0.9 * height; y += yIncrement){
    drawLine(y);
  }

  if (frameCount > 5400){ // pause after 3 mins, to save CPUs if someone leaves their tab open
    console.log("Paused. Reload to restart.")
    noLoop();
  }
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

function updateHSBStartEnd(){
  systemParams.hsbStart = (systemParams.hsbStart + 3 * Math.abs(Math.sin( frameCount * 0.01 ))) % 360;
  systemParams.hsbEnd = (systemParams.hsbEnd +  3 * Math.abs(Math.sin( frameCount * 0.01 ))) % 360;

  gui.hsbStart.updateDisplay();
  gui.hsbEnd.updateDisplay();
}

function headingValue(xVal, yVal) {
    let yWaveHeight =  systemParams.yWaveFactor * height / 1.8;
    let frameCountFactorX = systemParams.useFrameCountInX ? frameCount/500.0 : 0;
    let frameCountFactorY = systemParams.useFrameCountInY ? frameCount/500.0 : 0;
    return  4 * Math.PI * (noise(frameCountFactorX + xVal / 500, frameCountFactorY + yVal / 2070.0) - 0.5);
}

function drawLine(y){
  let xStart = 0.1 * width;
  let xIncrement =  systemParams.xStepSize * width;
  let yWaveHeight =  systemParams.yWaveFactor * height / 6;

  noFill();

  strokeWeight(3);
  
  const initialX = 0.1 * width;
  const finalX = 0.9 * width;
  let tempVec = createVector(yWaveHeight, 0);
  let tempheading = 0;
  let proportion = 0;

  for(let currentX = initialX; currentX < finalX; currentX += xIncrement){
    tempheading = headingValue(currentX, y);
    // proportion = map(currentX, initialX, finalX, 0, 1);
    proportion = map(tempheading % PI, 0, PI, 0, 1);
    tempVec.x = yWaveHeight;
    tempVec.y = 0;
    tempVec.rotate(tempheading);

    let lerpedCol = color( lerp(systemParams.hsbStart, systemParams.hsbEnd, proportion), 100, 100, 1);
    stroke(lerpedCol);
    // strokeWeight(lerp(3, 50,  proportion));
    line(currentX, y, currentX + tempVec.x, y + tempVec.y) ;

  }
}

