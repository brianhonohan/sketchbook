var grassland;

var gui;
var systemParams = {
  herd_count: 30,
};
var guiHerdCount;

function setup(){
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  gui = new dat.gui.GUI();
  guiHerdCount = gui.add(systemParams, "herd_count").min(5).max(50).step(1);
  addGuiListeners();

  initSystem();
}

function draw(){
  background(70);
  grassland.tick();
  grassland.draw();
}

function initSystem(){
  grassland = new GrasslandSystem(systemParams);
}

function addGuiListeners(){
  guiHerdCount.onFinishChange(function(value) {
    initSystem();
  });
}
