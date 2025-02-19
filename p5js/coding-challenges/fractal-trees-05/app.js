var groundLevel;
var soil;
var canvas;

var gui;
var params = {
  num_nutrients: 1500,
  draw_plant_areas: false,
  draw_segment_areas: false,
  grow_root_tips: false,
  detection_range: 50,
  num_plants: 9,
  random_colors_per_plant: true
};
var guiNumNutrients;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-40);
  // canvas = createCanvas(800, 800);

  // Need to dynamically compute nutrient count, otherwise
  // on larger screens the roots won't consume them all
   // 1500 nutrients on an 800x800 are often completely consumed
  let minDensity = 1.2 * 1500 / (800*800);
  params.num_nutrients = minDensity * width * height;

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiNumNutrients = gui.add(params, "num_nutrients").min(50).max(4000).step(50);
  gui.add(params, "draw_plant_areas");
  gui.add(params, "draw_segment_areas");
  gui.add(params, "grow_root_tips");
  guiDetectionRange= gui.add(params, "detection_range").min(10).max(505).step(10);
  guiNumPlants= gui.add(params, "num_plants").min(1).max(20).step(1);
  gui.add(params, "random_colors_per_plant");
  addGuiListeners();
  gui.close();

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
