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
  gui.add(settings, "transform").onChange(setPenTransform);
  gui.add(settings, "horizReflect").onChange(createPen);
  gui.add(settings, "strokeWeight", 0.5,10,0.5).onChange(createPen);

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
  strokeWeight(settings.strokeWeight);
  const numRows = (settings.horizReflect == 1) ? 2 : 1;
  const yMargin = height / 2 - settings.tileHeight / 2 * numRows;
  drawableArea = new Rect(50, yMargin, settings.tileWidth, settings.tileHeight);

  if (friezePen == undefined){
    friezePen = new FriezePen(drawableArea);
  } else {
    friezePen.clear();
    friezePen.setDrawableArea(drawableArea);
  }
  
  friezePen.setTransform(settings.transform);
  friezePen.shouldDrawHorizReflection = (settings.horizReflect == 1);
  drawBackground();
}

function setPenTransform(){
  drawBackground();
  friezePen.setTransform(settings.transform);
  friezePen.flagForRedraw();
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
    { name: "tileWidth", type: "integer", default: 0.1 * width},
    { name: "tileHeight", type: "integer", default: 0.4 * height},
    { name: "transform", type: "string", default: 'vzt'},
    { name: "horizReflect", type: "bool", default: true},
    { name: "strokeWeight", type: "float", default: '2'},
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