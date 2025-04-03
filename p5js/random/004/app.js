var canvas;
var gui;

var systemParams = {
  xStepSize: 0.009,
  yStepSize: 0.03,
  yWaveFactor: 0.35,
  useFrameCountInX: true,
  useFrameCountInY: true,
};

function setup(){
  canvas = createCanvas(500, 500);
  // canvas = createCanvas(windowWidth, windowHeight-determineVerticalMargin());

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(systemParams, 'xStepSize').min(0.001).max(0.1).step(0.001);
  gui.add(systemParams, 'yStepSize').min(0.01).max(0.1).step(0.01);
  gui.add(systemParams, 'yWaveFactor').min(0.01).max(1).step(0.01);
  gui.add(systemParams, 'useFrameCountInX')
  gui.add(systemParams, 'useFrameCountInY')
}

function draw(){
  background(50);

  let yIncrement = systemParams.yStepSize * height;

  for(let y = 0.1 * height; y <= 0.9 * height; y += yIncrement){
    drawLine(y);
  }

  if (frameCount > 5400){ // pause after 3 mins, to save CPUs if someone leaves their tab open
    console.log("Paused. Reload to restart.")
    noLoop();
  }
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function drawSimpleLine(y){
  stroke(250);
  line(0.1 * width, y, 0.9 * width, y);
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
  for(let xStart = 0.1 * width; xStart < 0.9 * width; xStart += xIncrement){
    // tmpY = y + yWaveHeight * (noise(xStart / 100, y) - 0.5);
    tmpY = yVal(xStart, 0);

    strokeWeightVal = lerp(0, 10,  Math.abs(tmpY - y) / yWaveHeight);
    strokeWeight(strokeWeightVal);
    line(xStart, prevY, xStart + xIncrement, tmpY);
    // strokeWeightVal = lerp(10, 0, xStart / (0.8 * width));
    prevY = tmpY;
  }
}

