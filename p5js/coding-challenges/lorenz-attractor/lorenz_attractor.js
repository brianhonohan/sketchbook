var lorenzSystem;
var cam;
var cameraController;
var lsViewer;
var currentPoint;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  lorenzSystem = new LorenzSystem(28, 10, 8/3.0);
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

class LorenzSystem {
  constructor(rho, sigma, beta){
    this.rho = rho;
    this.sigma = sigma;
    this.beta = beta;
  }

  dx_dt (loc){
    return this.sigma * (loc.y - loc.x);
  }

  dy_dt (loc){
    return loc.x * (this.rho - loc.z) - loc.y;
  }

  dz_dt (loc){
    return loc.x * loc.y - this.beta * loc.z;
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
    let loc = this.computedPoints[0];

    for (var i = 0; i < (this.computedPoints.length-1); i++){
      stroke(85+ i%255, 170+ i%255, 255 + i%255);
      let nextPoint = this.computedPoints[i+1];
      line(loc.x, loc.y, loc.z, nextPoint.x, nextPoint.y, nextPoint.z);
      loc = nextPoint;
    }
  }
}
