var gui;
var system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  gui = P5JsSettings.addGui({autoPlace: false});

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  background(255);
}

function draw(){
  system.tick();
  system.render();
}

function mouseDragged(){
  system.addBAt(mouseX, mouseY);
}
