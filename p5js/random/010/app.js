var canvas;
var gui;

var systemParams = {
  xStepSize: 0.01,
  yStepSize: 0.07,
  yWaveFactor: 0.7,
  useFrameCountInX: false,
  useFrameCountInY: true,
  hsbStart: 0,
  hsbEnd: 150
};

function setup(){
  // canvas = createCanvas(500, 500);
  canvas = createAutosizedCanvas();
  colorMode(HSB);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(systemParams, 'xStepSize').min(0.001).max(0.1).step(0.001);
  gui.add(systemParams, 'yStepSize').min(0.001).max(0.1).step(0.001);
  gui.add(systemParams, 'yWaveFactor').min(0.01).max(1).step(0.01);
  gui.add(systemParams, 'useFrameCountInX');
  gui.add(systemParams, 'useFrameCountInY');
  gui.add(systemParams, 'hsbStart', 0, 360, 1);
  gui.add(systemParams, 'hsbEnd', 0, 360, 1);
}

function draw(){
  background(0, 0, 20);

  let yIncrement = systemParams.yStepSize * height;

  updateHSBStartEnd();

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
  
  systemParams.hsbStart = (180 +  180 * Math.sin( frameCount * 0.01 )) % 360;
  systemParams.hsbEnd = (150 + 180 +  180 * Math.sin( frameCount * 0.01 )) % 360;
  
}

function drawLine(y){
  stroke(250);
  let xStart = 0.1 * width;
  let xIncrement =  systemParams.xStepSize * width;
  let yWaveHeight =  systemParams.yWaveFactor * height / 2;
  let frameCountFactorX = systemParams.useFrameCountInX ? frameCount/100.0 : 0;
  let frameCountFactorY = systemParams.useFrameCountInY ? frameCount/100.0 : 0;

  let yVal = function(xVal, yVal) {
      return  y + yWaveHeight * (noise(frameCountFactorX + xVal / 100, frameCountFactorY + y / 100) - 0.5);
  }
  let prevY = yVal(xStart, 0);
  let tmpY = 0;

  // noiseDetail(8, 0.35 )
  let strokeWeightVal = 10;
  // noStroke();
  // stroke(0, 0, 20);
  noFill();

  beginShape(TRIANGLE_STRIP);
  
  for(let xStart = 0.1 * width; xStart < 0.9 * width; xStart += xIncrement){
    tmpY = yVal(xStart, 0);

    let proportion = Math.abs(tmpY - y) / yWaveHeight;
    strokeWeightVal = lerp(0, 10,  proportion);
    let lerpedCol = color( lerp(systemParams.hsbStart, systemParams.hsbEnd, proportion), 100, 100, 1);
    stroke(lerpedCol); 
    // fill(lerpedCol);

    // strokeWeight(proportion*8);
    
    let endAngle = Math.PI * 2 * (proportion - 0.000001);
    let startAngle = endAngle - (Math.PI * proportion);
    let radius = 10 + proportion * yWaveHeight;

    vertex(xStart, y);
    vertex(xStart, tmpY);
    prevY = tmpY;
  }
  endShape();
}

