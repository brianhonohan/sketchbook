var system;
var canvas;

var gui;
var params = {
  num_segments: 5,
  wave_amplitude: 50,
  wave_frequency: 3,
  source_heading: 0,
  smooth_curves: true,
};
var guiNumSegments, guiWaveAmplitude, guiWaveFrequency;

function setup() {
  canvas = createCanvas(500, 500);
  P5JsSettings.init();

  gui = new dat.gui.GUI();
  guiNumSegments = gui.add(params, "num_segments").min(1).max(100).step(1);
  guiWaveAmplitude = gui.add(params, "wave_amplitude").min(-200).max(200).step(10);
  guiWaveFrequency = gui.add(params, "wave_frequency").min(0.5).max(5).step(0.25);
  guiSourceHeading = gui.add(params, "source_heading").min(-0.75 * HALF_PI).max(0.75 * HALF_PI).step(0.01);
  guiSmoothCurves = gui.add(params, "smooth_curves");
  addGuiListeners();
  
  colorMode(HSB);
  initSystem();
  frameRate(1);
}

function draw(){
  background(0, 0, 20);
  system.tick();
  system.draw();
}
 
function initSystem(){
  var rect = new Rect(0.1 * width, 0.1 * height, 
                            0.8 * width, 0.8 * height);
  system = new System(rect, params);
  draw();
}

function addGuiListeners(){
  guiNumSegments.onFinishChange(function(value) {
    initSystem();
  });
  guiWaveAmplitude.onFinishChange(function(value) {
    initSystem();
  });
  guiWaveFrequency.onFinishChange(function(value) {
    initSystem();
  });
  guiSourceHeading.onFinishChange(_ =>  initSystem());
  guiSmoothCurves.onFinishChange(_ => initSystem());
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}



