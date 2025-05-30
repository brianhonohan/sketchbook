var canvas;
var gui;

let blendModesDetails;
let blendModeOptions;

var systemParams = {
  xStepSize: 0.01,
  yStepSize: 0.03,
  yWaveFactor: 0.35,
  useFrameCountInX: true,
  useFrameCountInY: true,
  hsbStart: 0,
  hsbEnd: 150,
  blendMode: 'BLEND'
};

function setup(){
  // canvas = createCanvas(500, 500);
  canvas = createAutosizedCanvas();
  colorMode(HSB);

  initBlendModeOptions();

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(systemParams, 'xStepSize').min(0.01).max(0.1).step(0.001);
  gui.add(systemParams, 'yStepSize').min(0.01).max(0.1).step(0.01);
  gui.add(systemParams, 'yWaveFactor').min(0.01).max(1).step(0.01);
  gui.add(systemParams, 'useFrameCountInX');
  gui.add(systemParams, 'useFrameCountInY');
  gui.add(systemParams, 'hsbStart', 0, 360, 1);
  gui.add(systemParams, 'hsbEnd', 0, 360, 1);
}

function draw(){
  background(0, 0, 20);

  let yIncrement = systemParams.yStepSize * height;

  // setBlendMode();
  // blendMode(BURN);

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

function initBlendModeOptions(){
  blendModesDetails = {
    'BLEND': {p5jsID: BLEND, description: 'color values from the source overwrite the canvas. This is the default mode.'},
    'ADD': {p5jsID: ADD, description: 'color values from the source are added to values from the canvas.'},
    'DARKEST': {p5jsID: DARKEST, description: 'keeps the darkest color value.'},
    'LIGHTEST': {p5jsID: LIGHTEST, description: 'keeps the lightest color value.'},
    'EXCLUSION': {p5jsID: EXCLUSION, description: 'similar to DIFFERENCE but with less contrast.'},
    'MULTIPLY': {p5jsID: MULTIPLY, description: 'color values from the source are multiplied with values from the canvas. The result is always darker.'},
    'SCREEN': {p5jsID: SCREEN, description: 'all color values are inverted, then multiplied, then inverted again. The result is always lighter. (Opposite of MULTIPLY)'},
    'REPLACE': {p5jsID: REPLACE, description: 'the last source drawn completely replaces the rest of the canvas.'},
    'REMOVE': {p5jsID: REMOVE, description: 'overlapping pixels are removed by making them completely transparent.'},
    'DIFFERENCE': {p5jsID: DIFFERENCE, description: 'color values from the source are subtracted from the values from the canvas. If the difference is a negative number, it is made positive.'},
    'OVERLAY': {p5jsID: OVERLAY, description: 'combines MULTIPLY and SCREEN. Dark values in the canvas get darker and light values get lighter.'},
    'HARD_LIGHT': {p5jsID: HARD_LIGHT, description: 'combines MULTIPLY and SCREEN. Dark values in the source get darker and light values get lighter.'},
    'SOFT_LIGHT': {p5jsID: SOFT_LIGHT, description: 'a softer version of HARD_LIGHT.'},
    'DODGE': {p5jsID: DODGE, description: 'lightens light tones and increases contrast. Divides the canvas color values by the inverted color values from the source.'},
    'BURN': {p5jsID: BURN, description: 'darkens dark tones and increases contrast. Divides the source color values by the inverted color values from the canvas, then inverts the result.'}
  }
  blendModeOptions = Object.keys(blendModesDetails);  
}

function setBlendMode(){
  let newBlendMode = blendModeOptions[Math.floor(frameCount / 60) % blendModeOptions.length];

  if (newBlendMode != systemParams.blendMode){
    console.log(`Switching to: ${systemParams.blendMode}`);
    systemParams.blendMode = newBlendMode;
  }
  let blendModeRecord = blendModesDetails[systemParams.blendMode];

  blendMode( blendModeRecord.p5jsID );
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
  stroke(0, 0, 20);
  for(let xStart = 0.1 * width; xStart < 0.9 * width; xStart += xIncrement){
    // tmpY = y + yWaveHeight * (noise(xStart / 100, y) - 0.5);
    tmpY = yVal(xStart, 0);

    let proportion = Math.abs(tmpY - y) / yWaveHeight;
    strokeWeightVal = lerp(0, 10,  proportion);
    fill( color( lerp(  systemParams.hsbStart, systemParams.hsbEnd, proportion), 100, 100, 0.25)  ); 
    
    // line(xStart, prevY, xStart + xIncrement, tmpY);
    ellipse(xStart, y, 10 + proportion * yWaveHeight,  10 + proportion * yWaveHeight);
    // strokeWeightVal = lerp(10, 0, xStart / (0.8 * width));
    prevY = tmpY;
  }
}

