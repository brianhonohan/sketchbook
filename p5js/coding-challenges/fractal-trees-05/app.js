var groundLevel;
var soil;
var canvas;

var gui;
var params = {
  num_nutrients: 200,
  draw_plant_areas: true,
  draw_segment_areas: false,
  detection_range: 50,
  num_plants: 1
};
var guiNumNutrients;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();

  gui = new dat.gui.GUI();
  guiNumNutrients = gui.add(params, "num_nutrients").min(50).max(2000).step(50);
  gui.add(params, "draw_plant_areas");
  gui.add(params, "draw_segment_areas");
  guiDetectionRange= gui.add(params, "detection_range").min(10).max(505).step(10);
  guiNumPlants= gui.add(params, "num_plants").min(1).max(20).step(1);
  addGuiListeners();

  groundLevel = floor(height * 0.1);
  initSystem();
}

function draw(){
  background(50);
  drawGround(groundLevel);

  soil.tick();
  soil.draw();
}

function drawGround(y){
  stroke(230);
  P5JsUtils.drawSolidBoundary(0.1 * width, y, 0.9 * width, y);
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

function initSystem(){
  P5JsSettings.init();
  var groundArea = new Rect(0.1 * width, groundLevel, 
                            0.8 * width, 0.8 * height);
  soil = new Soil(groundArea, params);
}

function addGuiListeners(){
  guiNumNutrients.onFinishChange(function(value) {
    initSystem();
  });
  guiDetectionRange.onFinishChange(function(value) {
    initSystem();
  });
  guiNumPlants.onFinishChange(function(value) {
    initSystem();
  });
}
