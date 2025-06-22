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
  let debugging = false; 
  if (debugging == true) {
    canvas = createCanvas(500, 500); // for consistent screenshots
  } else {
    canvas = createCanvas(windowWidth, windowHeight-40);
  }
  P5JsSettings.init();
  UtilFunctions.random = random;

  // Need to dynamically compute influencer count, otherwise
  // on larger screens the roots won't consume them all
   // 1500 influencers on an 800x800 are often completely consumed
  let minDensity = 1.2 * 1500 / (800*800);
  params.num_influencers = Math.floor(minDensity * width * height);

  var area = new Rect(0.1 * width, height * 0.1, 0.8 * width, 0.8 * height);
  system = new System(area, params);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiFolders.init = gui.addFolder('Initialization Settings');
  guiFolders.init.add(params, "network_mode", network_modes).onFinishChange(randomizeSystem);
  guiFolders.init.add(params, "num_networks", 1, 100, 1).onFinishChange(randomizeSystem);
  guiFolders.init.add(params, "influencer_mode", influencer_modes).onFinishChange(randomizeSystem);
  guiFolders.init.add(params, "num_influencers", 50, 10000, 50).onFinishChange(randomizeSystem);
  
  guiFolders.system = gui.addFolder('System Controls');
  
  guiFolders.init = guiFolders.system.addFolder('New Networks/Influencers');
  guiFolders.init.add(system.newComponents, "network_mode", network_modes);
  guiFolders.init.add(system.newComponents, "num_networks", 1, 100, 1);
  guiFolders.init.add(system.newComponents, "influencer_mode", influencer_modes);
  guiFolders.init.add(system.newComponents, "num_influencers", 50, 10000, 50);
  guiFolders.init.add(system, "inactivateBeforeAddingMore").name('Inactivate Existing');
  guiFolders.init.add(system, "preventOverlappingLines").name('Prevent Line Overlap');
  guiFolders.init.add(system, "addNewComponents").name('Add New Components');

  guiFolders.other = gui.addFolder('Other Options (Display');
  guiFolders.other.add(params, "draw_network_areas");
  guiFolders.other.add(params, "draw_segment_areas");
  guiFolders.other.add(params, "color_per_network");
  guiFolders.other.add(params, "detection_range",10, 100, 2).onFinishChange(randomizeSystem);
  guiFolders.other.close()

  guiFolders.run = gui.addFolder('Run Controls');
  guiFolders.run.add(system, 'autoRun').name('Auto Run');
  guiFolders.run.add(system, 'requestTick').name('Step');
  guiFolders.run.add(system, 'resetSeedAndReinit').name('Run Again');
  guiFolders.run.add(system, 'randomizeAndReinit').name('Randomize');
  // gui.close();
  
  
  if (debugging == true) {
    params.network_mode = 'random';
    params.influencer_mode = 'random';
  }

  initSystem();

  if (debugging == true) {
    for (let i = 0; i < 100; i++){
      background(50);
      system.tick();
      system.draw();
    }
    system.autoRun = false;
    system.newComponents.num_networks = 6;
    system.newComponents.num_influencers = 200;
    // params.detection_range = 200;
    system.addNewComponents();

  }
  P5JsSettings.collapseGuiIfNarrow(gui);
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

function randomizeSystem(){
  system.randomizeAndReinit();
}

function initSystem(){
  system.init();
}
