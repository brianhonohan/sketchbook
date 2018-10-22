let seed;
let system;

function setup() {
  pixelDensity(1);
  // constrains on width are due to odd bug.
  createCanvas(max(340, min(790,window.innerWidth)), windowHeight-35);
  P5JsSettings.init();

  system = new System();
  frameRate(1);
  system.tick();

}

function draw(){
  system.tick();
  system.draw();
}
