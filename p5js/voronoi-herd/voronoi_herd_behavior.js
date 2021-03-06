var grassland;

var gui;
var systemParams = {
  herd_count: 30,
  memberSize: 5,
  drawVoronoi: true,
  wrapEdges: false,

  flocking: {
    maxSpeed: 0.5,
    desiredSeparation: 10
  }
};
var guiHerdCount;

function setup(){
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();


  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiHerdCount = gui.add(systemParams, "herd_count").min(5).max(50).step(1);
  gui.add(systemParams, "memberSize").min(1).max(30).step(1);
  gui.add(systemParams, "drawVoronoi");
  gui.add(systemParams, "wrapEdges");

  let flocking = gui.addFolder('Flocking');
  flocking.add(systemParams.flocking, 'maxSpeed').min(0.25).max(5).step(0.25);
  flocking.add(systemParams.flocking, 'desiredSeparation').min(10).max(120).step(5);

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

function mouseDragged(){
  grassland.herd.predator.loc = createVector(constrain(mouseX, 0, width),
                                             constrain(mouseY, 0, height));
}
