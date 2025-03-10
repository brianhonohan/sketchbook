var system;
var canvas;
let network_modes = ['along-top-edge', 
  'along-all-edges',
  'along-top-bottom-edges',
  'along-left-right-edges',
  'random',
  'orderly-rows',
  'around-circle'
];
let influencer_modes = [
  'random',
  'orderly-rows',
  'within-circle',
  'within-circle-gaussian'
];


var gui;
var params = {
  network_mode: 'around-circle',
  influencer_mode: 'within-circle-gaussian',
  num_influencers: 1500,
  draw_network_areas: false,
  draw_segment_areas: false,
  detection_range: 50,
  num_networks: 40,
  color_per_network: true
};
var guiFolders = {};

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

  var area = new Rect(0.1 * width, height * 0.1, 0.8 * width, 0.8 * height);
  system = new System(area, params);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiFolders.network = gui.addFolder('Network Settings');
  guiFolders.network.add(params, "network_mode", network_modes).onFinishChange(initSystem);
  guiFolders.network.add(params, "draw_network_areas");
  guiFolders.network.add(params, "draw_segment_areas");
  guiFolders.network.add(params, "num_networks", 1, 100, 1).onFinishChange(initSystem);
  guiFolders.network.add(params, "color_per_network");
  
  guiFolders.influencer = gui.addFolder('Influencer Settings');
  guiFolders.influencer.add(params, "influencer_mode", influencer_modes).onFinishChange(initSystem);
  guiFolders.influencer.add(params, "num_influencers", 50, 10000, 50).onFinishChange(initSystem);
  guiFolders.influencer.add(params, "detection_range",10, 100, 2).onFinishChange(initSystem);

  gui.add(system, 'init').name('Reset');
  // gui.close();
  
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
