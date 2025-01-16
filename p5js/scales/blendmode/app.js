var minY;
var maxY;
var blendModes;
var margin;
var palette;
var gui;

var guiParams = {
  imgBrightness: 69
}

function setup(){
  createCanvas(windowWidth, windowHeight-35);
  colorMode(HSB, 100);
  blendModes = new P5jsBlendModes();
  noStroke();

  palette = [
    color(1, 80, 80),
    color(40, 80, 80),
    color(60, 80, 80),
  ];
  margin = 0.1;

  drawOnce();

  gui = P5JsSettings.addDatGui({autoPlace: false});
  // gui = new dat.gui.GUI();
  guiBrightness = gui.add(guiParams, "imgBrightness").min(0).max(100).step(1);
  addGuiListeners();

  noLoop();
}

function getContrastingBrightness(brightness){
  if (brightness < 60) {
    return 100;
  } else if (brightness < 70) {
    return 100 - 90 * (brightness - 60) / 10.0;
  } else {
    return 10;
  }
}

function drawOnce(){
  let numCols = 4;
  let numRows = 4;
  let cellWidth  = (width * (1 - margin * 2)) / numCols;
  let cellHeight = (height * (1 - margin * 2)) / numRows;
  let imgBrightness = guiParams.imgBrightness;
  let canvasBrightness = getContrastingBrightness(imgBrightness);
  let imgBgColor = color(0, 0, imgBrightness);
  let canvasBgColor = color(0, 0, canvasBrightness);

  background(canvasBgColor);

  for(let i = 0; i < blendModes.modes.length; i++){
    let col = i % numCols;
    let row = Math.floor(i / numRows);
    let modeObj = blendModes.modes[i];

    push();
    translate(margin * width + col * cellWidth, margin * height + row * cellHeight);

    let graphics = renderSample(cellWidth * 0.95, cellHeight * 0.95, imgBgColor, modeObj.mode);
    image(graphics, 0, 0);

    fill(canvasBgColor);
    if (modeObj.name == 'REPLACE') {
      fill(imgBgColor);
    }
    textAlign(CENTER);
    text(modeObj.name, cellWidth/2, 0.85 * cellHeight);
    pop();
  }
}

function renderSample(w, h, bgColor, mode){
  let g = createGraphics(w, h);
  g.noStroke();
  g.background(bgColor);
  g.blendMode(mode);

  g.fill(palette[0]);
  g.rect(w * 0.2, h * 0.1, w * 0.4, h * 0.4);

  g.fill(palette[1]);
  g.rect(w * 0.3, h * 0.3, w * 0.4, h * 0.4);

  g.fill(palette[2]);
  g.rect(w * 0.4, h * 0.2, w * 0.4, h * 0.4);
  return g;
}

function addGuiListeners(){
  guiBrightness.onChange(function(value) {
    drawOnce();
  });
  guiBrightness.onFinishChange(function(value) {
    drawOnce();
  });
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

class P5jsBlendModes {
  constructor(){
    this._init();
  }

  _init(){
    // From https://p5js.org/reference/#/p5/blendMode
    this.modes = [
      {mode: BLEND, name: 'BLEND', description: "linear interpolation of colours: C = A*factor + B. This is the default blending mode.", default: true},
      {mode: ADD, name: 'ADD', description: "sum of A and B"},
      {mode: DARKEST, name: 'DARKEST', description: "only the darkest colour succeeds: C = min(A*factor, B)."},
      {mode: LIGHTEST, name: 'LIGHTEST', description: "only the lightest colour succeeds: C = max(A*factor, B)."},
      {mode: DIFFERENCE, name: 'DIFFERENCE', description: "subtract colors from underlying image."},
      {mode: EXCLUSION, name: 'EXCLUSION', description: "similar to DIFFERENCE, but less extreme."},
      {mode: MULTIPLY, name: 'MULTIPLY', description: "multiply the colors, result will always be darker."},
      {mode: SCREEN, name: 'SCREEN', description: "opposite multiply, uses inverse values of the colors."},
      {mode: REPLACE, name: 'REPLACE', description: "the pixels entirely replace the others and don't utilize alpha (transparency) values."},
      {mode: REMOVE, name: 'REMOVE', description: "removes pixels from B with the alpha strength of A."},
      {mode: OVERLAY, name: 'OVERLAY', description: "mix of MULTIPLY and SCREEN . Multiplies dark values, and screens light values. (2D)", is_2d_only: true},
      {mode: HARD_LIGHT, name: 'HARD_LIGHT', description: "SCREEN when greater than 50% gray, MULTIPLY when lower. (2D)", is_2d_only: true},
      {mode: SOFT_LIGHT, name: 'SOFT_LIGHT', description: "mix of DARKEST and LIGHTEST. Works like OVERLAY, but not as harsh. (2D)", is_2d_only: true},
      {mode: DODGE, name: 'DODGE', description: "lightens light tones and increases contrast, ignores darks. (2D)", is_2d_only: true},
      {mode: BURN, name: 'BURN', description: "darker areas are applied, increasing contrast, ignores lights. (2D)", is_2d_only: true},
      // {mode: SUBTRACT, name: 'SUBTRACT', description: "remainder of A and B (3D)", is_3d_only: true}
    ];
  }

  modesFor2D(){
    // assume 2D mode
    return this.modes.filter(m => m.is_3d_only = undefined );
  }

  setMode(index){
    let modeData = this.modes[index];
    if (modeData){
      blendMode(modeData.mode);
      return modeData.mode;
    } else {
      return undefined;
    }
  }
}