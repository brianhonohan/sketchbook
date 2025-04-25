var canvas;
var gui;

let blendModesDetails;
let blendModeOptions;

var systemParams = {
  xStepSize: 0.01,
  yStepSize: 0.07,
  yWaveFactor: 0.7,
  useFrameCountInX: false,
  useFrameCountInY: true,
  hsbStart: 0,
  hsbEnd: 150,
  blendMode: 'BLEND',
  blendModeIdx: 0
};

function setup(){
  canvas = createCanvas(500, 500);
  // canvas = createCanvas(windowWidth, windowHeight-determineVerticalMargin());
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
  blendMode(BLEND);
  background(0, 0, 20);

  let yIncrement = systemParams.yStepSize * height;

  // setBlendModeByFrame();
  updateHSBStartEnd();

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

function initBlendModeOptions(){
  blendModesDetails = {
    'BLEND': {p5jsID: BLEND, description: 'color values from the source overwrite the canvas. This is the default mode.'},
    'ADD': {p5jsID: ADD, description: 'color values from the source are added to values from the canvas.'},
    // 'DARKEST': {p5jsID: DARKEST, description: 'keeps the darkest color value.'},
    'LIGHTEST': {p5jsID: LIGHTEST, description: 'keeps the lightest color value.'},
    'EXCLUSION': {p5jsID: EXCLUSION, description: 'similar to DIFFERENCE but with less contrast.'},
    'MULTIPLY': {p5jsID: MULTIPLY, description: 'color values from the source are multiplied with values from the canvas. The result is always darker.'},
    // 'SCREEN': {p5jsID: SCREEN, description: 'all color values are inverted, then multiplied, then inverted again. The result is always lighter. (Opposite of MULTIPLY)'},
    // 'REPLACE': {p5jsID: REPLACE, description: 'the last source drawn completely replaces the rest of the canvas.'},
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

function setBlendModeByFrame(){
  setBlendModeIdx(Math.floor(frameCount / 60) % blendModeOptions.length);
}

function incrementBlendMode(){
  let newIdx = (systemParams.blendModeIdx + 1) % blendModeOptions.length;
  setBlendModeIdx(newIdx);
}

function setBlendModeIdx(newIdx){
  let isNewIdxValue = (newIdx != systemParams.blendModeIdx);
  systemParams.blendModeIdx = newIdx;

  let newBlendMode = blendModeOptions[systemParams.blendModeIdx];
  systemParams.blendMode = newBlendMode;

  // if (isNewIdxValue){
    // console.log(`Switching to: ${systemParams.blendMode}`);
  // }
  
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

    // incrementBlendMode();

    let proportion = Math.abs(tmpY - y) / yWaveHeight;
    strokeWeightVal = lerp(0, 10,  proportion);
    fill( color( lerp(  systemParams.hsbStart, systemParams.hsbEnd, proportion), 100, 100, 0.25)  ); 
    
    // line(xStart, prevY, xStart + xIncrement, tmpY);
    
    let endAngle = Math.PI * 2 * proportion;
    let startAngle = 0 - endAngle;
    let radius = 10 + proportion * yWaveHeight;

    arc(xStart, y, radius, radius, startAngle, endAngle);
    // strokeWeightVal = lerp(10, 0, xStart / (0.8 * width));
    prevY = tmpY;
  }
}

