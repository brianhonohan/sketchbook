var canvas;
var gui;

var systemParams = {
  xStepSize: 0.01,
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
  gui.add(systemParams, 'xStepSize', 0.001, 0.1, 0.001);
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

function drawLine(y){
  stroke(250);
  let xStart = 0.1 * width;
  let xIncrement =  systemParams.xStepSize * width;
  let yIncrement = systemParams.yStepSize * height;
  let yWaveHeight =  systemParams.yWaveFactor * height / 1.8;
  let frameCountFactorX = systemParams.useFrameCountInX ? frameCount/100.0 : 0;
  let frameCountFactorY = systemParams.useFrameCountInY ? frameCount/100.0 : 0;

  
  let yVal = function(xVal, yVal) {
      return  y + yWaveHeight * (noise(frameCountFactorX + xVal / 100, frameCountFactorY + y / 270.0) - 0.5);
  }
  let prevY = yVal(xStart, 0);
  let tmpY = 0;
  let altTmpY = 0;

  let strokeWeightVal = 10;
  noFill();

  strokeWeight(5);
  
  const initialX = 0.1 * width;
  const finalX = 0.9 * width;
  for(let currentX = initialX; currentX < finalX; currentX += xIncrement){
    tmpY = yVal(currentX, 0);
    altTmpY = yVal(currentX + 100000, 0);

    let proportion = Math.abs(tmpY - y) / yWaveHeight;
    strokeWeightVal = lerp(3, 50,  proportion);
    strokeWeight(strokeWeightVal);

    let lerpedCol = color( lerp(systemParams.hsbStart, systemParams.hsbEnd, proportion), 100, 100, 1);
    stroke(lerpedCol); 
    if (systemParams.fillShapes){
      fill(lerpedCol);
    } else {
      noFill();
    }

    vertex(currentX, tmpY);
    
    vertex(currentX, tmpY+ 0.05 * height);
    line(currentX, tmpY, currentX, altTmpY);

    prevY = tmpY;
  }
}

