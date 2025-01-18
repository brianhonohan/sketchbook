var pen;
var canvas;

const penSettings = {
  slice_count: 6,
  clear_toggle: true,
  pen_color: "#90A2BF",
  bg_color: "#333333",
  stroke_weight: 1,
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiPenColor = gui.addColor(penSettings, "pen_color");
  guiBgColor = gui.addColor(penSettings, "bg_color");
  guiSliceCount = gui.add(penSettings, "slice_count", 1, 100, 1);
  guiClearToggle = gui.add(penSettings, "clear_toggle");
  guiStrokeWeight = gui.add(penSettings, "stroke_weight", 1,40,1);
  addGuiListeners();

  pen = new SnowflakePen(width/2, height/2);

  stroke(penSettings.pen_color);
  strokeWeight(penSettings.stroke_weight);
  background(penSettings.bg_color);
}

function addGuiListeners(){
  guiPenColor.onFinishChange((_) => stroke(penSettings.pen_color) )
  guiBgColor.onFinishChange((_) => background(penSettings.bg_color) )
  guiSliceCount.onFinishChange((value) => pen.setNumberofSlices(value) )
  guiClearToggle.onFinishChange((_) => background(penSettings.bg_color) )
  guiStrokeWeight.onFinishChange((_) => strokeWeight(penSettings.stroke_weight) )
}

function draw(){
  pen.draw();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  } else if (key == 'c'){
    background(penSettings.bg_color);
  }
}
