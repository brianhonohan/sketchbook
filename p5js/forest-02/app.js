var system;

var gui;
var systemParams = {
  foraging_rate: 0.8,
  seeds_per_tree: 2,
  seed_drop_dist: 70,
  initial_trees: 100,
  paused: false,
  tree: {
    max_age: 200,
    years_as_sapling: 4,
    years_as_mature: 140,
    age_to_make_seeds: 40,
  }
};

function setup() {
  // createCanvas(500, 500);
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();


  let rect = new Rect(0, 0, width, height);
  system = new System(rect, systemParams);
  system.init();

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(systemParams, "paused");
  gui.add(system, "init").name('Restart');

  let forestGui = gui.addFolder("Forest Attributes");
  forestGui.open();
  forestGui.add(systemParams, 'foraging_rate').min(0.1).max(0.9).step(0.05);
  forestGui.add(systemParams, 'initial_trees').min(1).max(50).step(1);

  forestGui.add(system.forest, 'treeLimit', 50, 5000, 50);
  addGuiForSpecies(system.forest.treeSpecies[0]);
  addGuiForSpecies(system.forest.treeSpecies[1]);
  addGuiForSpecies(system.forest.treeSpecies[2]);

  P5JsSettings.collapseGuiIfNarrow(gui);
}

function addGuiForSpecies(species){
  let treeCfg = gui.addFolder(`${species.name} Traits`);
  treeCfg.addColor(species, 'trunkColor');
  treeCfg.add(species, 'maxAge', 20, 1000, 1);
  treeCfg.add(species, 'yearsAsSapling', 4, 40, 1);
  treeCfg.add(species, 'yearsAsMature', 5, 1000, 1);
  treeCfg.add(species, 'maxShadowRadius', 5, 150, 1);
  treeCfg.add(species, 'ageToMakeSeeds', 5, 100, 1);
  treeCfg.add(species, 'maxHeight', 20, 500, 1); // in feet

  // TODO: Need to refactor how these behave, not easy to configure
  treeCfg.add(species, 'growRateWhileSapling', 0.01, 0.5, 0.01); 
  treeCfg.add(species, 'growRateWhileMature', 0.5, 1, 0.01);
  treeCfg.add(species, 'fullnessResilencyFactor',  0.01, 4, 0.01);
  treeCfg.add(species, 'fullnessVulnerabilityFactor', 0.01, 4, 0.01);

  treeCfg.add(species, 'seedsPerTree', 1, 30, 1);
  treeCfg.add(species, 'seedDropDist', 5, 300, 5);
  treeCfg.close();
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
