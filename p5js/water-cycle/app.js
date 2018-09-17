let seed;
let system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  system = new System();
  frameRate(1);
  system.tick();

}

function draw(){
  system.tick();
  system.draw();
}
