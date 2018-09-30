let seed;
let system;
let optionsSet;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect, options);
  
  logSettings();
  frameRate(1);
}

function draw(){
  system.tick();
  system.render();
}
