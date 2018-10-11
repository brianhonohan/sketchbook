let seed;
let ecosystem;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  ecosystem = new Ecosystem(rect);

  logSettings();
  frameRate(1);
}

function draw() {
  ecosystem.tick();
  ecosystem.draw();
}

function logSettings(){
  console.log("App options: ");
  console.log(ecosystem.settings);
}
