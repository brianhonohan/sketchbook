var system;
var canvas;

let bgOptions = ['redraw', 'fade', 'layer'];

var gui;
var params = {
  num_segments: 14,
  wave_amplitude: 50, // overridden in setup
  wave_frequency: 4,
  source_heading: 0.9,
  smooth_curves: true,
  hobby_curves: true,
  reset_after_secs: 16,
  animation_speed: 0.75,
  bgEffect: 'layer',
  cycleColors: true
};

const guiObj = {
  redrawBackground: redrawBackground
}
var guiNumSegments, guiWaveAmplitude, guiWaveFrequency;

function setup() {
  canvas = createCanvas(500, 500); // for screenshots
  // canvas = createAutosizedCanvas();
  P5JsSettings.init();

  params.wave_amplitude = 0.3 * height;

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(params, 'bgEffect', bgOptions);
  gui.add(params, 'cycleColors');
  gui.add(guiObj, 'redrawBackground');
  guiNumSegments = gui.add(params, "num_segments", 1, 100, 1);
  guiWaveAmplitude = gui.add(params, "wave_amplitude", -height/2.1, height/2.1, 10);;
  guiWaveFrequency = gui.add(params, "wave_frequency", 0.5, 5, 0.005);
  guiSourceHeading = gui.add(params, "source_heading", -0.75 * HALF_PI, 0.75 * HALF_PI, 0.01);
  guiSmoothCurves = gui.add(params, "smooth_curves");
  gui.add(params, "hobby_curves").onChange(initSystem)
  gui.add(params, "reset_after_secs", 0, 20, 1);
  gui.add(params, "animation_speed", 0, 10, 0.25);
  addGuiListeners();
  gui.close();
  
  colorMode(HSB);
  background(0, 0, 20);
  initSystem();
}

function draw(){
  switch(params.bgEffect){
    case bgOptions[0]: // redraw  
      redrawBackground();
      break;
    case bgOptions[1]: // fade
      background(0, 0, 20, 0.04);
      break;
    case bgOptions[2]: // layer
      // no background, just draw the system
      break;
  }
  system.tick();
  system.draw();
}

function redrawBackground(){
  background(0, 0, 20);
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



