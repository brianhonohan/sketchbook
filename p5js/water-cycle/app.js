let seed;
let system;
let terrain;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  system = new System();
  frameRate(1);
  system.tick();

  let rect = new Rect(0, 0, width/2, height/2);
  terrain = new Terrain2D(rect);
}

function draw(){
  system.tick();
  terrain.draw();
}