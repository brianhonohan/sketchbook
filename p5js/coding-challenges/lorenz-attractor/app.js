var lorenzSystem;
var cam;
var cameraController;
var lsViewer;
var currentPoint;

var gui;
var systemParams = {
  rho: 28,
  sigma: 10,
  beta: 8/3.0
};

function setup(){
  createCanvas(windowWidth, windowHeight-35, WEBGL);

  gui = new dat.gui.GUI();
  gui.add(systemParams, "rho").min(1).max(50).step(0.1);
  gui.add(systemParams, "sigma").min(1).max(30).step(0.1);
  gui.add(systemParams, "beta").min(1).max(30).step(0.1);

  lorenzSystem = new LorenzSystem(systemParams);
  lsViewer = new LorenzSystemViewer();

  cam = createCamera();
  cameraController = new CameraController(cam);
  currentPoint = createVector(1, 1, 1);
}

function draw(){
  background(45);
  cameraController.tick();
  scale(6);
  currentPoint = lsViewer.computePoints(lorenzSystem, currentPoint, 1);
  lsViewer.render();
}

function keyTyped(){
  if (key === 'c'){
    lsViewer.clearPoints();
  }
}
