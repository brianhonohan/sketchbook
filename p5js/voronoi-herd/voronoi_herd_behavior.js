var grassland;

var gui;
var systemParams = {
  herd_count: 30,
  memberSize: 5,
  drawVoronoi: true,
  wrapEdges: false,

  flocking: {
    maxSpeed: 0.5,
    desiredSeparation: 10,
    grazing:
       {
        separationFactor: 2,
        alignFactor: 1.0,
        cohesionFactor: 1.0,
      },
    avoiding: {
        separationFactor: 1.0,
        alignFactor: 0.0,
        cohesionFactor: 2.0,
    }
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

  let grazingGui = flocking.addFolder('Grazing');
  grazingGui.add(systemParams.flocking.grazing, 'separationFactor').min(0).max(5).step(0.25);
  grazingGui.add(systemParams.flocking.grazing, 'alignFactor').min(0).max(5).step(0.25);  
  grazingGui.add(systemParams.flocking.grazing, 'cohesionFactor').min(0).max(5).step(0.25);

  let avoidingGui = flocking.addFolder('Avoiding');
  avoidingGui.add(systemParams.flocking.avoiding, 'separationFactor').min(0).max(5).step(0.25);
  avoidingGui.add(systemParams.flocking.avoiding, 'alignFactor').min(0).max(5).step(0.25);  
  avoidingGui.add(systemParams.flocking.avoiding, 'cohesionFactor').min(0.25).max(5).step(0.25);

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
  const locX = constrain(mouseX, 1, width - 1) ;
  const locY = constrain(mouseY, 1, height - 1);

  grassland.herd.predator.loc = createVector(constrain(locX, 0, width),
                                             constrain(locY, 0, height));
}
