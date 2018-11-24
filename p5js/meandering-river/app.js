var system;

var gui;
var params = {
  num_segments: 5,
  wave_amplitude: 50,
  wave_frequency: 3
};
var guiNumSegments, guiWaveAmplitude, guiWaveFrequency;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  gui = new dat.gui.GUI();
  guiNumSegments = gui.add(params, "num_segments").min(1).max(200).step(1);
  guiWaveAmplitude = gui.add(params, "wave_amplitude").min(-200).max(200).step(10);
  guiWaveFrequency = gui.add(params, "wave_frequency").min(0.5).max(5).step(0.25);
  addGuiListeners();
  
  initSystem();
  frameRate(1);
  noLoop();
}

function draw(){
  background(50);
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
}



