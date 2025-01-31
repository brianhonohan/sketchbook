var canvas;
var drawableArea;
var friezePen;
var optionsSet;
var settings;

let gui;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  optionsSet = new OptionsSet(optionsMetadata());
  settings = optionsSet.settings;

  gui = P5JsSettings.addDatGui({autoPlace: false});

  gui.add(settings, "tileWidth", 5, 0.5 * width, 5).onChange(createPen);
  gui.add(settings, "tileHeight", 5, 0.9 * height, 5).onChange(createPen);
  gui.add(settings, "transform").onChange(createPen);
  gui.add(settings, "horizReflect").onChange(createPen);
  gui.add(settings, "strokeWeight", 0.5,10,0.5).onChange(createPen);

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
    { name: "tileWidth", type: "integer", default: 0.2 * width},
    { name: "tileHeight", type: "integer", default: 0.2 * height},
    { name: "transform", type: "string", default: 'vht'},
    { name: "horizReflect", type: "bool", default: true},
    { name: "strokeWeight", type: "float", default: '2'},
  ];
}
