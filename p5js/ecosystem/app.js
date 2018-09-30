let seed;
let ecosystem;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  ecosystem = new Ecosystem(rect);

  logSettings();
  frameRate(1);
  ecosystem.tick();
}

function draw() {
  ecosystem.tick();
}

function logSettings(){
  console.log("App options: ");
  console.log(ecosystem.settings);
}
