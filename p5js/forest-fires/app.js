var system;
var ui;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  ui = new UserInterface(system);

  background(50);
}

function draw(){
  system.tick();
  system.render();
}

function keyTyped(){
  ui.keyTyped(key);
}

function mousePressed(){
  ui.mousePressed(mouseX, mouseY);
}
