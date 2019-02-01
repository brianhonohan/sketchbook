var canvas;
var drawableArea;
var friezePen;
var optionsSet;
var settings;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();

  optionsSet = new OptionsSet(optionsMetadata());
  settings = optionsSet.settings;

  strokeWeight(settings.strokeWeight);
  drawableArea = new Rect(50, 150, settings.tileWidth, settings.tileHeight);
  friezePen = new FriezePen(drawableArea);
  friezePen.setTransform(settings.transform);
  friezePen.shouldDrawHorizReflection = (settings.horizReflect == 1);
  drawBackground();
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
