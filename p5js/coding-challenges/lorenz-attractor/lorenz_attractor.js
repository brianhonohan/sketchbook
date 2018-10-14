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
  createCanvas(windowWidth, windowHeight, WEBGL);

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
  // cameraController.tick();
  scale(6);
  currentPoint = lsViewer.computePoints(lorenzSystem, currentPoint, 1);
  lsViewer.render();
}

class LorenzSystem {
  constructor(config){
    this.config = config;
  }

  dx_dt (loc){
    return this.config.sigma * (loc.y - loc.x);
  }

  dy_dt (loc){
    return loc.x * (this.config.rho - loc.z) - loc.y;
  }

  dz_dt (loc){
    return loc.x * loc.y - this.config.beta * loc.z;
  }

  nextLocation(loc, timeStep){
    let newPoint = loc.copy();
    newPoint.x += this.dx_dt(loc) * timeStep;
    newPoint.y += this.dy_dt(loc) * timeStep;
    newPoint.z += this.dz_dt(loc) * timeStep;
    return newPoint;
  }
}

class LorenzSystemViewer {
  constructor(){
    this.timeStep = 0.01;
    this.computedPoints = [];
  }

  computePoints(system, loc, numIterations){
    let nextPoint;
    for (var i = 0; i < numIterations; i++){
      nextPoint = system.nextLocation(loc, this.timeStep);
      this.computedPoints.push(nextPoint);
      
      // console.log(`x: ${loc.x}, y: ${loc.y}, z: ${loc.z}`)
      loc = nextPoint;
    }

    return loc;
  }

  render(){
    this.renderAsShape();
  }

  renderAsLines(){
    let loc = this.computedPoints[0];

    for (var i = 0; i < (this.computedPoints.length-1); i++){
      stroke(85+ i%255, 170+ i%255, 255 + i%255);
      let nextPoint = this.computedPoints[i+1];
      line(loc.x, loc.y, loc.z, nextPoint.x, nextPoint.y, nextPoint.z);
      loc = nextPoint;
    }
  }

  renderAsShape(){
    let loc;
    stroke(50, 200, 50);

    noFill();
    beginShape()
    for (var i = 0; i < this.computedPoints.length; i++){
      loc = this.computedPoints[i];
      vertex(loc.x, loc.y, loc.z);
    }
    endShape();
  }
}
