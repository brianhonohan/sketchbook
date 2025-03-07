var system;
var canvas;
let modes = ['along-top-edge', 
  'along-all-edges',
  'along-top-bottom-edges',
  'along-left-right-edges',
  'random',
  'orderly-rows'
];

var gui;
var params = {
  mode: 'along-all-edges',
  num_influencers: 1500,
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

  // Need to dynamically compute influencer count, otherwise
  // on larger screens the roots won't consume them all
   // 1500 influencers on an 800x800 are often completely consumed
  let minDensity = 1.2 * 1500 / (800*800);
  params.num_influencers = Math.floor(minDensity * width * height);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(params, "mode", modes).onFinishChange(initSystem);
  guiNumNutrients = gui.add(params, "num_influencers", 50, 10000, 50);
  gui.add(params, "draw_network_areas");
  gui.add(params, "draw_segment_areas");
  guiDetectionRange= gui.add(params, "detection_range",10, 505, 10);
  guiNumNetworks= gui.add(params, "num_networks", 1, 100, 1);
  gui.add(params, "random_colors_per_network");
  addGuiListeners();
  // gui.close();
  
  var area = new Rect(0.1 * width, height * 0.1, 0.8 * width, 0.8 * height);
  system = new System(area, params);
  initSystem();
}

function draw(){
  background(50);

  system.tick();
  system.draw();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

function initSystem(){
  system.init();
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
