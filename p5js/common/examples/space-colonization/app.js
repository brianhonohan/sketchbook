var groundLevel;
var space;
var canvas;
let modes = ['cross-section', 'top-down-random', 'top-down-orderly-rows'];

var gui;
var params = {
  mode: 'cross-section',
  num_nutrients: 1500,
  draw_network_areas: false,
  draw_segment_areas: false,
  detection_range: 50,
  num_networks: 9,
  random_colors_per_network: true
};
var guiNumNutrients;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-40);
  P5JsSettings.init();
  // canvas = createCanvas(500, 500); // for consistent screenshots
  UtilFunctions.random = random;

  // Need to dynamically compute nutrient count, otherwise
  // on larger screens the roots won't consume them all
   // 1500 nutrients on an 800x800 are often completely consumed
  let minDensity = 1.2 * 1500 / (800*800);
  params.num_nutrients = Math.floor(minDensity * width * height);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(params, "mode", modes).onFinishChange(initSystem);
  guiNumNutrients = gui.add(params, "num_nutrients", 50, 10000, 50);
  gui.add(params, "draw_network_areas");
  gui.add(params, "draw_segment_areas");
  guiDetectionRange= gui.add(params, "detection_range",10, 505, 10);
  guiNumNetworks= gui.add(params, "num_networks", 1, 100, 1);
  gui.add(params, "random_colors_per_network");
  addGuiListeners();
  // gui.close();

  groundLevel = floor(height * 0.1);
  initSystem();
}

function draw(){
  background(50);
  if (params.mode == 'cross-section'){
    drawGround(groundLevel);
  }

  space.tick();
  space.draw();
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
  var groundArea = new Rect(0.1 * width, groundLevel, 
                            0.8 * width, 0.8 * height);
  space = new Space(groundArea, params);
}

function addGuiListeners(){
  guiNumNutrients.onFinishChange(function(value) {
    initSystem();
  });
  guiDetectionRange.onFinishChange(function(value) {
    initSystem();
  });
  guiNumNetworks.onFinishChange(function(value) {
    initSystem();
  });
}
