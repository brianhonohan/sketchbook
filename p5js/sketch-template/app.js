let seed;
let system;

function setup() {
  createCanvas(800, 600);
  P5JsSettings.init();

  system = new System();
  frameRate(1);
  system.tick();
}

function draw(){
  system.tick();
}
