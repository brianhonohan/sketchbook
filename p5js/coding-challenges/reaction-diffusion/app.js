var gui;
var system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  gui = new dat.gui.GUI();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
}

function draw(){
  background(50);
  system.tick();
  system.render();
}
