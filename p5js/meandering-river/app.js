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

const guiObj = {
  clearFade: clearFade
}
var guiNumSegments, guiWaveAmplitude, guiWaveFrequency;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(guiObj, 'clearFade');
  guiNumSegments = gui.add(params, "num_segments", 1, 100, 1);
  guiWaveAmplitude = gui.add(params, "wave_amplitude", -height/2.1, height/2.1, 10);;
  guiWaveFrequency = gui.add(params, "wave_frequency", 0.5, 5, 0.005);
  guiSourceHeading = gui.add(params, "source_heading", -0.75 * HALF_PI, 0.75 * HALF_PI, 0.01);
  guiSmoothCurves = gui.add(params, "smooth_curves");
  addGuiListeners();
  
  colorMode(HSB);
  background(0, 0, 20);
  initSystem();
  frameRate(1);
}

function draw(){
  background(0, 0, 20, 0.04);
  system.tick();
  system.draw();
}

function clearFade(){
  background(0, 0, 20);
  system.draw();
}

function createAutosizedCanvas(){
  canvas = createCanvas();
  windowResized(undefined, true);
  return canvas;
}

function windowResized(event, noRedraw = false) {
  resizeCanvas(innerWidth, 
              innerHeight - drawingContext.canvas.getBoundingClientRect().top,
              noRedraw);
  background(0, 0, 20);
  initSystem();
}
 
function initSystem(){
  var rect = new Rect(0.1 * width, 0.1 * height, 
                            0.8 * width, 0.8 * height);
  system = new System(rect, params);
  draw();
}

function addGuiListeners(){
  guiNumSegments.onChange(function(value) {
    initSystem();
  });
  guiWaveAmplitude.onChange(function(value) {
    initSystem();
  });
  guiWaveFrequency.onChange(function(value) {
    initSystem();
  });
  guiSourceHeading.onChange(_ =>  initSystem());
  guiSmoothCurves.onChange(_ => initSystem());
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}



