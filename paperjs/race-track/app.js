var system;
var lastCar;
var lastDriver;

// Drawn tracks are ending up with length ~1500-3000
// F1 Track lengths range from 4000m - 6000m
var PX_PER_M = 0.5;

// PaperJS standard FPS
var FPS = 60;

// Converting g (9.80665 m/s^2 ==> px / frame^2)
// 9.80665 m/s^2 * 0.5 px/m * 1 sec / 60 frame * 1 sec / 60 frame
var GRAV_ACCEL = 0.00136203472;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  system = new System();
}

function tick(event){
  system.tick();
}
