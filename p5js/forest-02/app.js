var system;
var dataVisualizer;

var gui;
var systemParams = {
  foraging_rate: 0.6,
  seeds_per_tree: 2,
  seed_drop_dist: 70,
  initial_trees: 10,
  paused: false,
  tree: {
    max_age: 200,
    years_as_sapling: 4,
    years_as_mature: 140,
    age_to_make_seeds: 40,
  }
};

function setup() {
  P5JsSettings.init();
  var dataVizHeight = 135;
  createCanvas(windowWidth, windowHeight - P5JsSettings.getVertMargin() - dataVizHeight);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(systemParams, 'foraging_rate').min(0.1).max(0.9).step(0.05);
  gui.add(systemParams, 'seeds_per_tree').min(1).max(20).step(1);
  gui.add(systemParams, 'seed_drop_dist').min(1).max(150).step(10);
  gui.add(systemParams, 'initial_trees').min(1).max(50).step(1);
  gui.add(systemParams, "paused");
  P5JsSettings.toggleDatGuiHide();

  let treeCfg = gui.addFolder('Tree Attributes');
  treeCfg.add(systemParams.tree, 'max_age').min(20).max(500).step(5);
  treeCfg.add(systemParams.tree, 'years_as_sapling').min(3).max(30).step(1);
  treeCfg.add(systemParams.tree, 'years_as_mature').min(15).max(300).step(5);
  treeCfg.add(systemParams.tree, 'age_to_make_seeds').min(3).max(60).step(3);

  let rect = new Rect(0, 0, width, height);
  system = new System(rect, systemParams);
  system.init();

  dataVisualizer = new DataVisualizer(system);
  dataVisualizer.initialize();
}

function keyPressed() {
  if (key === 'c'){
    P5JsSettings.init();
    system.init();
  } else if (key === 't'){
    system.forest.sproutTree(mouseX, mouseY);
  }
}

function draw(){
  background(50);
  system.tick();
  system.render();
}
