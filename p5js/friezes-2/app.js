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
  const drawArea = gui.addFolder("Drawing area");
  drawArea.add(settings, "showDrawArea").onChange(toggleDrawingArea);
  drawArea.add(settings, "tileWidth", 5, 0.5 * width, 5).onChange(createPen);
  drawArea.add(settings, "tileHeight", 5, 0.9 * height, 5).onChange(createPen);

  const penGui = gui.addFolder("Pen Controls");
  penGui.add(settings, "transform").onChange(setPenTransform);
  penGui.add(settings, "horizReflect").onChange(createPen);
  penGui.add(settings, "strokeWeight", 0.5,10,0.5).onChange(setStrokeWeight);
  penGui.addColor(settings, "strokeColor").onChange(setStrokeColor);
  penGui.open();

  createPen();

  var penProxy = {
    "Undo (U)": () => {friezePen.undo() && drawBackground()},
    "Redo (R)": () => {friezePen.redo() && drawBackground()},
  };
  gui.add(penProxy,'Undo (U)');
  gui.add(penProxy,'Redo (R)');
  drawBackground();
}

function createPen(){
  const numRows = (settings.horizReflect == 1) ? 2 : 1;
  const yMargin = height / 2 - settings.tileHeight / 2 * numRows;
  drawableArea = new Rect(50, yMargin, settings.tileWidth, settings.tileHeight);

  if (friezePen == undefined){
    friezePen = new FriezePen(drawableArea);
  } else {
    friezePen.clear();
    friezePen.setDrawableArea(drawableArea);
  }
  friezePen.setStrokeColor(settings.strokeColor);
  friezePen.setStrokeWeight(settings.strokeWeight);
  friezePen.setTransform(settings.transform);
  friezePen.shouldDrawHorizReflection = (settings.horizReflect == 1);
  drawBackground();
}

function toggleDrawingArea(){
  drawBackground();
  friezePen.flagForRedraw();
}

function setPenTransform(){
  drawBackground();
  friezePen.setTransform(settings.transform);
  friezePen.flagForRedraw();
}

function setStrokeWeight(){
  friezePen.setStrokeWeight(settings.strokeWeight);
}

function setStrokeColor(){
  friezePen.setStrokeColor(settings.strokeColor);
}

function draw(){
  friezePen.draw();
}

function drawBackground(){
  background(50);
  fill(80);
  noStroke();
  if (settings.showDrawArea){
    P5JsUtils.drawRect(drawableArea);
  }
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'c':
      friezePen.clear()
      drawBackground();
      break;
    case 'u':
      if (friezePen.undo()){
        drawBackground();
      }
      break;    
    case 'r':
      if (friezePen.redo()){
        drawBackground();
      }
      break;
  }
}

function optionsMetadata(){
  return [
    { name: "showDrawArea", type: "bool", default: true},
    { name: "tileWidth", type: "integer", default: 0.1 * width},
    { name: "tileHeight", type: "integer", default: 0.4 * height},
    { name: "transform", type: "string", default: 'vzt'},
    { name: "horizReflect", type: "bool", default: true},
    { name: "strokeWeight", type: "float", default: 2},
    { name: "strokeColor", type: "color", default: '#FFFFFF'},
  ];
}

function mousePressed(){
  friezePen.startDrawing();
}

function mouseDragged(){
  friezePen.handleMouseDrag();
}

function mouseReleased(){
  friezePen.stopDrawing();
}