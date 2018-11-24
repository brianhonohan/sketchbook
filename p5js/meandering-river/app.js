var system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
}

function draw(){
  background(50);
  system.tick();
  system.draw();
}
