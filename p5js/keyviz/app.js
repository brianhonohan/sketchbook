var system;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
}

function draw(){
  background(50);
  system.tick();
  system.render();
}
