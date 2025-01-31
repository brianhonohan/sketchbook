var canvas;
var drawableArea;
var friezePen;
var optionsSet;
var settings;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  optionsSet = new OptionsSet(optionsMetadata());
  settings = optionsSet.settings;

  createPen();
  drawBackground();
}

function createPen(){
  strokeWeight(settings.strokeWeight);
  const numRows = (settings.horizReflect == 1) ? 2 : 1;
  const yMargin = height / 2 - settings.tileHeight / 2 * numRows;
  drawableArea = new Rect(50, yMargin, settings.tileWidth, settings.tileHeight);
  friezePen = new FriezePen(drawableArea);
  friezePen.setTransform(settings.transform);
  friezePen.shouldDrawHorizReflection = (settings.horizReflect == 1);
}

function draw(){
  friezePen.draw();
}

function drawBackground(){
  background(50);
  fill(80);
  noStroke();
  P5JsUtils.drawRect(drawableArea);
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'c':
      drawBackground();
      break;
  }
}

function optionsMetadata(){
  return [
    { name: "tileWidth", type: "integer", default: 50},
    { name: "tileHeight", type: "integer", default: 50},
    { name: "transform", type: "string", default: 'vht'},
    { name: "horizReflect", type: "integer", default: '1'},
    { name: "strokeWeight", type: "float", default: '2'},
  ];
}
